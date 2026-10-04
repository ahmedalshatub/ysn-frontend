import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import Select from "../../../shared/components/inputs/Select";
import Tabs from "../../../shared/components/navigation/Tabs";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import WalletIcon from "../../../assets/icons/WalletIcon";
import CustomerSearchSelect from "../../customers/components/CustomerSearchSelect";
import { useGetCustomersQuery } from "../../customers/api/Customers.api";
import { customerRoleConfigs, customerRoleList, type CustomerListDto } from "../../customers/types/Customers.types";
import { useSaveCardTypeDiscountsMutation } from "../api/CardTypeDiscounts.api";
import CardTypesPicker from "./CardTypesPicker";
import DiscountValueFields from "./DiscountValueFields";
import { DiscountType, type DiscountTypeValue } from "../types/CardTypeDiscounts.types";
import FormSection from "../../../shared/components/forms/FormSection";
import LayersIcon from "../../../assets/icons/LayersIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";

interface AddCardTypeDiscountsModalProps {
  open: boolean;
  customer?: CustomerListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

type CustomerMode = "one" | "filter";

const fromNumberValue = (value: string | number) => (value === "" ? undefined : Number(value));

const AddCardTypeDiscountsModal = ({ open, customer, onClose, onSuccess }: AddCardTypeDiscountsModalProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const [cardTypeIds, setCardTypeIds] = useState<number[]>([]);
  const [mode, setMode] = useState<CustomerMode>("one");
  const [roleId, setRoleId] = useState<number | undefined>(undefined);
  const [cityId, setCityId] = useState<number | undefined>(undefined);
  const [discountType, setDiscountType] = useState<DiscountTypeValue>(DiscountType.Percent);
  const [discountValue, setDiscountValue] = useState<number | undefined>(undefined);
  const [valueError, setValueError] = useState("");
  const [save, { isLoading }] = useSaveCardTypeDiscountsMutation();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: customer?.id ?? null } });
  const customerId = useWatch({ control, name: "customerId" });

  const customerFilter = useMemo(() => ({ roleId, cityId, isDeleted: false }), [roleId, cityId]);
  const { data: matching } = useGetCustomersQuery({ ...customerFilter, pageSize: 1 }, { skip: !!customer || mode !== "filter" });
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const typeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));

  const onSubmit = async () => {
    if (cardTypeIds.length === 0) {
      showError(t("errors.Discount.CardTypeRequired"));
      return;
    }
    if (!discountValue || discountValue <= 0 || (discountType === DiscountType.Percent && discountValue > 100)) {
      setValueError(t(discountType === DiscountType.Percent && (discountValue ?? 0) > 100 ? "errors.Discount.PercentTooHigh" : "errors.Discount.ValueRequired"));
      return;
    }
    const userIds = customer ? [customer.id] : mode === "one" && customerId ? [Number(customerId)] : undefined;
    if (!userIds && mode === "one") {
      showError(t("errors.Discount.CustomersRequired"));
      return;
    }

    try {
      const result = await save({
        cardTypeIds,
        userIds,
        customerFilter: userIds ? undefined : { ...customerFilter, customersOnly: true },
        discountType,
        discountValue,
      }).unwrap();
      showSuccess(t("discounts.successSave", { added: result.addedCount, replaced: result.replacedCount }));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      title={t("discounts.addCardTypeDiscounts")}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<WalletIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<LayersIcon />} title={t("discounts.cardTypes")}>
          <CardTypesPicker selected={cardTypeIds} onChange={setCardTypeIds} />
        </FormSection>
        {!customer && (
          <FormSection icon={<UsersIcon />} title={t("discounts.customers")}>
            <Tabs
              tabs={[
                { id: "one", label: t("discounts.oneCustomer") },
                { id: "filter", label: t("discounts.allMatching") },
              ]}
              activeTab={mode}
              onChange={(id) => setMode(id as CustomerMode)}
            />
            {mode === "one" ? (
              <CustomerSearchSelect<{ customerId: number | null }> name="customerId" control={control} label={t("invoices.customer")} />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  name="roleId"
                  label={t("customers.customerType")}
                  value={roleId ?? ""}
                  onChange={(value) => setRoleId(fromNumberValue(value))}
                  options={typeOptions}
                  valueKey="value"
                  labelKey="name"
                  placeholder={t("common.all")}
                  size="md"
                />
                <Select
                  name="cityId"
                  label={t("customers.city")}
                  value={cityId ?? ""}
                  onChange={(value) => setCityId(fromNumberValue(value))}
                  options={cityOptions}
                  valueKey="value"
                  labelKey="name"
                  placeholder={t("common.all")}
                  searchable
                  size="md"
                />
                <div className="md:col-span-2">
                  <Message variant="info">{t("discounts.matchingCustomers", { count: matching?.totalCount ?? 0 })}</Message>
                </div>
              </div>
            )}
          </FormSection>
        )}
        <FormSection icon={<WalletIcon />} title={t("discounts.discount")} columns={2}>
          <DiscountValueFields
            type={discountType}
            value={discountValue}
            allowNone={false}
            error={valueError}
            onChange={(type, value) => {
              setDiscountType(type);
              setDiscountValue(value);
              setValueError("");
            }}
          />
        </FormSection>
        <Message variant="info">{t("discounts.replaceHint")}</Message>
      </div>
    </FormModal>
  );
};

export default AddCardTypeDiscountsModal;
