import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormSection from "../../../shared/components/forms/FormSection";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import CityTvSmsApiFields from "./CityTvSmsApiFields";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import { useAddCityMutation, useGetCityQuery, useUpdateCityMutation, useGetCitiesQuery } from "../api/Cities.api";
import { citySchema, noStoredSecrets, type CityFormValues, type CityStoredSecrets } from "../validation/Cities.validation";
import { TvSmsDefaultValues, type AddCityDto } from "../types/Cities.types";

interface CityModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cityId?: number | null;
}

const emptyValues: CityFormValues = {
  sortOrder: 1,
  isActive: true,
  hasTvSmsApi: false,
  tvSmsBaseUrl: "",
  tvSmsUserId: "",
  tvSmsPassword: "",
  tvSmsAuthKey: "",
  tvSmsPublicKey: "",
  tvSmsCertificateThumbprint: "",
  tvSmsDefaultLanguage: TvSmsDefaultValues.language,
  tvSmsDefaultDepartmentId: TvSmsDefaultValues.departmentId,
  tvSmsDefaultRegionId: TvSmsDefaultValues.regionId,
  tvSmsDefaultCustomerTypeId: TvSmsDefaultValues.customerTypeId,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "" },
    { languageCode: DataLanguage.English, name: "" },
  ],
};

const CityModal = ({ open, onClose, onSuccess, cityId }: CityModalProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const isEdit = !!cityId;
  const canSetTvSmsApi = can(isEdit ? Permission.CitiesUpdate : Permission.CitiesCreate);

  const { data: city, isLoading: isLoadingCity } = useGetCityQuery(cityId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();

  const storedSecrets: CityStoredSecrets = useMemo(
    () =>
      isEdit && city
        ? { hasTvSmsPassword: city.hasTvSmsPassword, hasTvSmsAuthKey: city.hasTvSmsAuthKey, hasTvSmsPublicKey: city.hasTvSmsPublicKey }
        : noStoredSecrets,
    [isEdit, city]
  );
  const schema = useMemo(() => citySchema(storedSecrets), [storedSecrets]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: yupResolver(schema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && city) {
      const arabic = city.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
      const english = city.translations.find((translation) => translation.languageCode === DataLanguage.English);
      reset({
        ...emptyValues,
        sortOrder: city.sortOrder,
        isActive: city.isActive,
        hasTvSmsApi: city.hasTvSmsApi,
        tvSmsBaseUrl: city.tvSmsBaseUrl ?? "",
        tvSmsUserId: city.tvSmsUserId ?? "",
        tvSmsCertificateThumbprint: city.tvSmsCertificateThumbprint ?? "",
        tvSmsDefaultLanguage: city.tvSmsDefaultLanguage ?? TvSmsDefaultValues.language,
        tvSmsDefaultDepartmentId: city.tvSmsDefaultDepartmentId ?? TvSmsDefaultValues.departmentId,
        tvSmsDefaultRegionId: city.tvSmsDefaultRegionId ?? TvSmsDefaultValues.regionId,
        tvSmsDefaultCustomerTypeId: city.tvSmsDefaultCustomerTypeId ?? TvSmsDefaultValues.customerTypeId,
        translations: [
          { languageCode: DataLanguage.Arabic, name: arabic?.name || "" },
          { languageCode: DataLanguage.English, name: english?.name || "" },
        ],
      });
    } else if (!isEdit) {
      reset(emptyValues);
    }
  }, [open, isEdit, city, reset]);

  const { data: activeCities } = useGetCitiesQuery({ isDeleted: false, pageNumber: 1, pageSize: 1 }, { skip: !open, refetchOnMountOrArgChange: true });
  const activeCount = activeCities?.totalCount ?? 0;
  const maxSortOrder = isEdit ? activeCount : activeCount + 1;

  useEffect(() => {
    if (open && !isEdit && activeCities) setValue("sortOrder", activeCount + 1);
  }, [open, isEdit, activeCities, activeCount, setValue]);

  const handleFormSubmit = async (values: CityFormValues) => {
    if (values.sortOrder < 1 || values.sortOrder > maxSortOrder) {
      setError("sortOrder", { message: "errors.City.SortOrderOutOfRange" });
      return;
    }
    const hasTvSmsApi = values.hasTvSmsApi;
    const data: AddCityDto = {
      sortOrder: values.sortOrder,
      isActive: values.isActive,
      hasTvSmsApi,
      tvSmsBaseUrl: hasTvSmsApi ? values.tvSmsBaseUrl || undefined : undefined,
      tvSmsUserId: hasTvSmsApi ? values.tvSmsUserId || undefined : undefined,
      tvSmsPassword: hasTvSmsApi ? values.tvSmsPassword || undefined : undefined,
      tvSmsAuthKey: hasTvSmsApi ? values.tvSmsAuthKey || undefined : undefined,
      tvSmsPublicKey: hasTvSmsApi ? values.tvSmsPublicKey || undefined : undefined,
      tvSmsCertificateThumbprint: hasTvSmsApi ? values.tvSmsCertificateThumbprint?.trim() || undefined : undefined,
      tvSmsDefaultLanguage: values.tvSmsDefaultLanguage ?? TvSmsDefaultValues.language,
      tvSmsDefaultDepartmentId: values.tvSmsDefaultDepartmentId ?? TvSmsDefaultValues.departmentId,
      tvSmsDefaultRegionId: values.tvSmsDefaultRegionId ?? TvSmsDefaultValues.regionId,
      tvSmsDefaultCustomerTypeId: values.tvSmsDefaultCustomerTypeId ?? TvSmsDefaultValues.customerTypeId,
      translations: (values.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode as AddCityDto["translations"][number]["languageCode"],
        name: translation.name,
      })),
    };

    try {
      if (isEdit && cityId) {
        await updateCity({ id: cityId, data }).unwrap();
        showSuccess(t("cities.successUpdate"));
      } else {
        await addCity(data).unwrap();
        showSuccess(t("cities.successCreate"));
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
      onSubmit={handleSubmit(handleFormSubmit)}
      title={isEdit ? t("cities.editCity") : t("cities.addCity")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingCity}
      size="xl"
      icon={<MapPinIcon className="w-6 h-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<GlobeIcon />} title={t("common.arabicTranslation")}>
          <FormInput
            name="translations.0.name"
            control={control}
            label={`${t("cities.nameArabic")} *`}
            error={!!errors.translations?.[0]?.name}
            errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
          />
        </FormSection>

        <FormSection icon={<GlobeIcon />} title={t("common.englishTranslation")}>
          <FormInput
            name="translations.1.name"
            control={control}
            label={`${t("cities.nameEnglish")} *`}
            error={!!errors.translations?.[1]?.name}
            errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
          />
        </FormSection>

        <FormSection icon={<InfoIcon />} title={t("cities.details")} columns={2}>
          <FormInput
            name="sortOrder"
            control={control}
            type="number"
            label={`${t("cities.sortOrder")} * (1 - ${maxSortOrder})`}
            error={!!errors.sortOrder}
            errorMessage={fieldError(errors.sortOrder?.message)}
          />
          <FormCheckbox
            name="isActive"
            control={control}
            label={t("cities.isActive")}
            description={t("cities.isActiveHint")}
          />
        </FormSection>

        {canSetTvSmsApi && (
          <CityTvSmsApiFields control={control} errors={errors} isEdit={isEdit} storedSecrets={storedSecrets} />
        )}
      </div>
    </FormModal>
  );
};

export default CityModal;
