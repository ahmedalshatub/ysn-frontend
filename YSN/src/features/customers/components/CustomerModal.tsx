import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import UserIcon from "../../../assets/icons/UserIcon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import MonitorIcon from "../../../assets/icons/MonitorIcon";
import { useGetCountriesQuery } from "../../countries/api/Countries.api";
import { useAddCustomerMutation, useGetCustomerQuery, useUpdateCustomerMutation } from "../api/Customers.api";
import { customerSchema, type CustomerFormValues } from "../validation/Customers.validation";
import AgentFormSelect from "./AgentFormSelect";
import DiscountValueFields from "../../cardTypeDiscounts/components/DiscountValueFields";
import { DiscountType, type DiscountTypeValue } from "../../cardTypeDiscounts/types/CardTypeDiscounts.types";
import useCustomerPermission from "../hooks/useCustomerPermission";
import {
  CustomerType,
  customerTypeConfigs,
  customerTypeList,
  type CustomerTypeValue,
  type UpdateCustomerDto,
} from "../types/Customers.types";

interface CustomerModalProps {
  open: boolean;
  customerType: CustomerTypeValue;
  customerId: number | null;
  onClose: () => void;
  onSuccess: () => void;
  onTypeChanged?: (newType: CustomerTypeValue) => void;
}

const emptyValues: CustomerFormValues = {
  userType: CustomerType.Agent,
  firstName: "",
  lastName: "",
  countryId: 0,
  phoneNumber: "",
  email: "",
  cityId: 0,
  parentAgentId: null,
  password: "",
  confirmPassword: "",
  isUnlimitedTvs: false,
  maxTvCount: null,
  isActive: true,
};

const CustomerModal = ({ open, customerType, customerId, onClose, onSuccess, onTypeChanged }: CustomerModalProps) => {
  const { t } = useTranslation();
  const canCustomer = useCustomerPermission();
  const isEdit = customerId !== null;
  const config = customerTypeConfigs[customerType];
  const canChangeType = isEdit && canCustomer(customerType, "ChangeType");

  const { data: customer, isLoading: isLoadingCustomer } = useGetCustomerQuery(
    customerId as number,
    { skip: !isEdit || !open, refetchOnMountOrArgChange: true }
  );
  const { data: countryList } = useGetCountriesQuery(
    { isActive: true, isDeleted: false, sortBy: "Name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const countries = countryList?.items;
  const { cities, singleCityId } = useMyCities();

  const [addCustomer, { isLoading: isAdding }] = useAddCustomerMutation();
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  const schema = useMemo(() => customerSchema(isEdit), [isEdit]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: yupResolver(schema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  const isUnlimitedTvs = useWatch({ control, name: "isUnlimitedTvs" });
  const selectedType = Number(useWatch({ control, name: "userType" })) as CustomerTypeValue;
  const typeChanged = isEdit && selectedType !== customerType;
  const canChangeTvs = !isEdit || canCustomer(selectedType, "ChangeMaxTvs");
  const canChangeDiscount = isEdit && canCustomer(selectedType, "ChangeDiscount");
  const [discountType, setDiscountType] = useState<DiscountTypeValue>(DiscountType.None);
  const [discountValue, setDiscountValue] = useState<number | undefined>(undefined);
  const [discountError, setDiscountError] = useState("");
  const showAgent =
    selectedType === CustomerType.SubAgent && (!isEdit || typeChanged || canCustomer(CustomerType.SubAgent, "ChangeType"));

  const typeOptions = useMemo(
    () =>
      customerTypeList
        .filter((type) => type === customerType || canCustomer(type, "Create"))
        .map((type) => ({ value: type, name: t(customerTypeConfigs[type].labelKey) })),
    [customerType, canCustomer, t]
  );
  const defaultCountryId = countries?.find((country) => country.isDefault)?.id ?? 0;

  useEffect(() => {
    if (!open) return;
    if (isEdit && customer) {
      setDiscountType(customer.discountType as DiscountTypeValue);
      setDiscountValue(customer.discountValue || undefined);
      reset({
        ...emptyValues,
        userType: customer.userType,
        parentAgentId: customer.parentAgentId,
        isUnlimitedTvs: customer.isUnlimitedTvs,
        maxTvCount: customer.maxTvCount,
        firstName: customer.firstName,
        lastName: customer.lastName,
        countryId: customer.countryId ?? defaultCountryId,
        phoneNumber: customer.phoneNumber ?? "",
        email: customer.email ?? "",
        cityId: customer.cityId,
      });
    } else if (!isEdit) {
      reset({
        ...emptyValues,
        userType: customerType,
        countryId: defaultCountryId,
        cityId: singleCityId ?? 0,
        isUnlimitedTvs: customerType !== CustomerType.Client,
        maxTvCount: customerType === CustomerType.Client ? 1 : null,
      });
    }
  }, [open, isEdit, customer, defaultCountryId, singleCityId, customerType, reset]);

  const countryOptions = useMemo(
    () => (countries ?? []).map((country) => ({ value: country.id, name: `${country.phoneCode} ${country.name}` })),
    [countries]
  );
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  const onSubmit = async (values: CustomerFormValues) => {
    if (canChangeDiscount && discountType !== DiscountType.None) {
      if (!discountValue || discountValue <= 0) return setDiscountError(t("errors.Discount.ValueRequired"));
      if (discountType === DiscountType.Percent && discountValue > 100) return setDiscountError(t("errors.Discount.PercentTooHigh"));
    }

    const base = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      countryId: Number(values.countryId),
      phoneNumber: values.phoneNumber.trim(),
      email: values.email?.trim() || null,
      cityId: Number(values.cityId),
    };

    try {
      if (isEdit && customerId !== null) {
        const data: UpdateCustomerDto = {
          ...base,
          userType: typeChanged ? selectedType : undefined,
          parentAgentId: showAgent ? Number(values.parentAgentId) : undefined,
          isUnlimitedTvs: canChangeTvs ? values.isUnlimitedTvs : undefined,
          maxTvCount: canChangeTvs && !values.isUnlimitedTvs ? values.maxTvCount ?? null : undefined,
          discountType: canChangeDiscount ? discountType : undefined,
          discountValue: canChangeDiscount ? discountValue ?? 0 : undefined,
        };
        await updateCustomer({ id: customerId, data }).unwrap();
        showSuccess(t("customers.successUpdate"));
        if (typeChanged) onTypeChanged?.(selectedType);
      } else {
        await addCustomer({
          userType: config.type,
          data: {
            ...base,
            parentAgentId: showAgent ? Number(values.parentAgentId) : null,
            password: values.password ?? "",
            confirmPassword: values.confirmPassword ?? "",
            isUnlimitedTvs: values.isUnlimitedTvs,
            maxTvCount: values.isUnlimitedTvs ? null : values.maxTvCount ?? null,
            isActive: values.isActive,
          },
        }).unwrap();
        showSuccess(t("customers.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");
  const title = `${isEdit ? t("common.edit") : t("common.add")} - ${t(config.labelKey)}`;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingCustomer}
      size="xl"
      icon={<UserIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <div>
          <div className="form-section-title mb-4">
            <UserIcon className="h-4 w-4 text-primary" />
            <h3>{t("customers.personalInfo")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput<CustomerFormValues>
              name="firstName"
              control={control}
              label={`${t("customers.firstName")} *`}
              error={!!errors.firstName}
              errorMessage={fieldError(errors.firstName?.message)}
            />
            <FormInput<CustomerFormValues>
              name="lastName"
              control={control}
              label={`${t("customers.lastName")} *`}
              error={!!errors.lastName}
              errorMessage={fieldError(errors.lastName?.message)}
            />
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2">
                <FormSelect<CustomerFormValues>
                  name="countryId"
                  control={control}
                  label={`${t("customers.phoneCode")} *`}
                  options={countryOptions}
                  valueKey="value"
                  labelKey="name"
                  searchable
                  error={!!errors.countryId}
                  errorMessage={fieldError(errors.countryId?.message)}
                />
              </div>
              <div className="col-span-3">
                <FormInput<CustomerFormValues>
                  name="phoneNumber"
                  control={control}
                  label={`${t("customers.phoneNumber")} *`}
                  placeholder="7701234567"
                  error={!!errors.phoneNumber}
                  errorMessage={fieldError(errors.phoneNumber?.message)}
                />
              </div>
            </div>
            <FormInput<CustomerFormValues>
              name="email"
              type="email"
              control={control}
              label={t("customers.email")}
              error={!!errors.email}
              errorMessage={fieldError(errors.email?.message)}
            />
            <FormSelect<CustomerFormValues>
              name="cityId"
              control={control}
              label={`${t("customers.city")} *`}
              options={cityOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("customers.selectCity")}
              searchable
              error={!!errors.cityId}
              errorMessage={fieldError(errors.cityId?.message)}
            />
            {canChangeType && (
              <FormSelect<CustomerFormValues>
                name="userType"
                control={control}
                label={t("customers.customerType")}
                options={typeOptions}
                valueKey="value"
                labelKey="name"
              />
            )}
            {showAgent && (
              <AgentFormSelect<CustomerFormValues>
                name="parentAgentId"
                control={control}
                excludeId={customerId ?? undefined}
                error={!!errors.parentAgentId}
                errorMessage={fieldError(errors.parentAgentId?.message)}
              />
            )}
            {typeChanged && (
              <div className="md:col-span-2">
                <Message variant="info">{t("customers.changeTypeNotice")}</Message>
              </div>
            )}
          </div>
        </div>

        {!isEdit && (
          <div>
            <div className="form-section-title mb-4">
              <KeyIcon className="h-4 w-4 text-primary" />
              <h3>{t("customers.password")}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormPasswordInput<CustomerFormValues>
                name="password"
                control={control}
                label={`${t("customers.password")} *`}
                error={!!errors.password}
                errorMessage={fieldError(errors.password?.message)}
              />
              <FormPasswordInput<CustomerFormValues>
                name="confirmPassword"
                control={control}
                label={`${t("customers.confirmPassword")} *`}
                error={!!errors.confirmPassword}
                errorMessage={fieldError(errors.confirmPassword?.message)}
              />
            </div>
            <p className="form-hint mt-2">{t("customers.passwordHandedOver")}</p>
          </div>
        )}

        {canChangeDiscount && (
          <div>
            <div className="form-section-title mb-4">
              <MonitorIcon className="h-4 w-4 text-primary" />
              <h3>{t("discounts.customerDiscount")}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DiscountValueFields
                type={discountType}
                value={discountValue}
                allowNone
                error={discountError}
                onChange={(type, value) => {
                  setDiscountType(type);
                  setDiscountValue(value);
                  setDiscountError("");
                }}
              />
            </div>
            <p className="form-hint mt-2">{t("discounts.customerDiscountHint")}</p>
          </div>
        )}

        {canChangeTvs && (
          <div>
            <div className="form-section-title mb-4">
              <MonitorIcon className="h-4 w-4 text-primary" />
              <h3>{t("customers.accountSettings")}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormCheckbox<CustomerFormValues>
                name="isUnlimitedTvs"
                control={control}
                label={t("customers.unlimitedTvs")}
                description={t("customers.unlimitedTvsHint")}
              />
              {!isUnlimitedTvs && (
                <FormInput<CustomerFormValues>
                  name="maxTvCount"
                  type="number"
                  control={control}
                  label={`${t("customers.maxTvCount")} *`}
                  error={!!errors.maxTvCount}
                  errorMessage={fieldError(errors.maxTvCount?.message)}
                />
              )}
              {!isEdit && (
                <FormCheckbox<CustomerFormValues>
                  name="isActive"
                  control={control}
                  label={t("customers.isActive")}
                  description={t("customers.isActiveHint")}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </FormModal>
  );
};

export default CustomerModal;
