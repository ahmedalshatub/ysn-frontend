import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import FormMultiSelect from "../../../shared/components/inputs/FormMultiSelect";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import UsersIcon from "../../../assets/icons/UsersIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import { useGetCountriesQuery } from "../../countries/api/Countries.api";
import { useGetRolesQuery } from "../../roles/api/Roles.api";
import { useCreateUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from "../api/Users.api";
import { userSchema, type UserFormValues } from "../validation/Users.validation";

const MAX_IMAGE_MB = 5;

interface UserModalProps {
  open: boolean;
  userId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const emptyValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  countryId: null,
  roleId: 0,
  hasAllCities: true,
  cityIds: [],
  isActive: true,
};

const UserModal = ({ open, userId, onClose, onSuccess }: UserModalProps) => {
  const { t } = useTranslation();
  const isEdit = userId !== null;

  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });
  const { data: countryList } = useGetCountriesQuery(
    { isActive: true, isDeleted: false, sortBy: "Name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const countries = countryList?.items;
  const { data: roleList } = useGetRolesQuery(
    { isActive: true, isDeleted: false, isCustomerRole: false, sortBy: "Name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const roles = roleList?.items;
  const { cities } = useMyCities();

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const currentSrc = useFileSrc(user?.profileImage);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  const hasAllCities = useWatch({ control, name: "hasAllCities" });
  const defaultCountryId = countries?.find((country) => country.isDefault)?.id ?? null;

  useEffect(() => {
    if (!open) return;
    setImage(null);
    setPreview("");
    if (isEdit && user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        countryId: user.countryId ?? defaultCountryId,
        roleId: user.roleId ?? 0,
        hasAllCities: user.hasAllCities,
        cityIds: user.cities.map((city) => city.cityId),
        isActive: user.isActive,
      });
    } else if (!isEdit) {
      reset({ ...emptyValues, countryId: defaultCountryId });
    }
  }, [open, isEdit, user, defaultCountryId, reset]);

  const countryOptions = useMemo(
    () => (countries ?? []).map((country) => ({ value: country.id, name: `${country.phoneCode} ${country.name}` })),
    [countries]
  );
  const roleOptions = useMemo(() => {
    const options = (roles ?? []).map((role) => ({ value: role.id, name: role.name }));
    if (user?.roleId && user.roleName && !options.some((option) => option.value === user.roleId)) {
      options.push({ value: user.roleId, name: user.roleName });
    }
    return options;
  }, [roles, user]);
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, label: city.name })), [cities]);

  const onSubmit = async (values: UserFormValues) => {
    const data = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber?.trim() ?? "",
      countryId: values.countryId ?? null,
      roleId: Number(values.roleId),
      hasAllCities: values.hasAllCities,
      cityIds: values.hasAllCities ? [] : values.cityIds ?? [],
      isActive: values.isActive,
      profileImage: image,
    };

    try {
      if (isEdit && userId !== null) {
        await updateUser({ id: userId, data }).unwrap();
        showSuccess(t("users.successUpdate"));
      } else {
        await createUser(data).unwrap();
        showSuccess(t("users.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={isEdit ? t("users.editUser") : t("users.addUser")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isCreating || isUpdating || isLoadingUser}
      size="xl"
      icon={<UsersIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <AvatarUpload
            size={96}
            shape="circle"
            accept="image/*"
            maxSizeMB={MAX_IMAGE_MB}
            value={preview || currentSrc}
            onChange={(file, next) => {
              setImage(file);
              setPreview(next);
            }}
            onError={(message) => showError(message)}
          />
        </div>

        <div>
          <div className="form-section-title mb-4">
            <UserIcon className="h-4 w-4 text-primary" />
            <h3>{t("users.personalInfo")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput<UserFormValues>
              name="firstName"
              control={control}
              label={`${t("users.firstName")} *`}
              error={!!errors.firstName}
              errorMessage={fieldError(errors.firstName?.message)}
            />
            <FormInput<UserFormValues>
              name="lastName"
              control={control}
              label={`${t("users.lastName")} *`}
              error={!!errors.lastName}
              errorMessage={fieldError(errors.lastName?.message)}
            />
            <FormInput<UserFormValues>
              name="email"
              type="email"
              control={control}
              label={`${t("users.email")} *`}
              error={!!errors.email}
              errorMessage={fieldError(errors.email?.message)}
            />
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2">
                <FormSelect<UserFormValues>
                  name="countryId"
                  control={control}
                  label={t("users.phoneCode")}
                  options={countryOptions}
                  valueKey="value"
                  labelKey="name"
                  searchable
                  error={!!errors.countryId}
                  errorMessage={fieldError(errors.countryId?.message)}
                />
              </div>
              <div className="col-span-3">
                <FormInput<UserFormValues>
                  name="phoneNumber"
                  control={control}
                  label={t("users.phoneNumber")}
                  placeholder="7701234567"
                  error={!!errors.phoneNumber}
                  errorMessage={fieldError(errors.phoneNumber?.message)}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <ShieldIcon className="h-4 w-4 text-primary" />
            <h3>{t("users.access")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSelect<UserFormValues>
              name="roleId"
              control={control}
              label={`${t("users.role")} *`}
              options={roleOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("users.selectRole")}
              error={!!errors.roleId}
              errorMessage={fieldError(errors.roleId?.message)}
            />
            <FormCheckbox<UserFormValues>
              name="isActive"
              control={control}
              label={t("users.isActive")}
              description={t("users.isActiveHint")}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <MapPinIcon className="h-4 w-4 text-primary" />
            <h3>{t("users.cities")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormCheckbox<UserFormValues>
              name="hasAllCities"
              control={control}
              label={t("users.hasAllCities")}
              description={t("users.hasAllCitiesHint")}
            />
            {!hasAllCities && (
              <FormMultiSelect<UserFormValues>
                name="cityIds"
                control={control}
                label={`${t("users.cities")} *`}
                placeholder={t("users.selectCities")}
                options={cityOptions}
                error={!!errors.cityIds}
                errorMessage={fieldError(errors.cityIds?.message)}
              />
            )}
          </div>
        </div>

        {!isEdit && <Message variant="info">{t("users.passwordWillBeEmailed")}</Message>}
      </div>
    </FormModal>
  );
};

export default UserModal;
