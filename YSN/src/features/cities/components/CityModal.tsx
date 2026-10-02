import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import { useAddCityMutation, useGetCityQuery, useUpdateCityMutation } from "../api/Cities.api";
import { addCitySchema, type CityFormValues } from "../validation/Cities.validation";
import type { AddCityDto } from "../types/Cities.types";

interface CityModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cityId?: number | null;
}

const emptyValues: CityFormValues = {
  sortOrder: 0,
  isActive: true,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "" },
    { languageCode: DataLanguage.English, name: "" },
  ],
};

const CityModal = ({ open, onClose, onSuccess, cityId }: CityModalProps) => {
  const { t } = useTranslation();
  const isEdit = !!cityId;

  const { data: city, isLoading: isLoadingCity } = useGetCityQuery(cityId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: yupResolver(addCitySchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && city) {
      const arabic = city.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
      const english = city.translations.find((translation) => translation.languageCode === DataLanguage.English);
      reset({
        sortOrder: city.sortOrder,
        isActive: city.isActive,
        translations: [
          { languageCode: DataLanguage.Arabic, name: arabic?.name || "" },
          { languageCode: DataLanguage.English, name: english?.name || "" },
        ],
      });
    } else if (!isEdit) {
      reset(emptyValues);
    }
  }, [open, isEdit, city, reset]);

  const handleFormSubmit = async (values: CityFormValues) => {
    const data: AddCityDto = {
      sortOrder: values.sortOrder,
      isActive: values.isActive,
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
        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("cities.names")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="translations.0.name"
              control={control}
              label={`${t("cities.nameArabic")} *`}
              error={!!errors.translations?.[0]?.name}
              errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
            />
            <FormInput
              name="translations.1.name"
              control={control}
              label={`${t("cities.nameEnglish")} *`}
              error={!!errors.translations?.[1]?.name}
              errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("cities.details")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="sortOrder"
              control={control}
              type="number"
              label={`${t("cities.sortOrder")} *`}
              error={!!errors.sortOrder}
              errorMessage={fieldError(errors.sortOrder?.message)}
            />
            <FormCheckbox
              name="isActive"
              control={control}
              label={t("cities.isActive")}
              description={t("cities.isActiveHint")}
            />
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default CityModal;
