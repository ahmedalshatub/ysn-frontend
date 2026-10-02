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
import { useAddCountryMutation, useGetCountryQuery, useUpdateCountryMutation } from "../api/Countries.api";
import { addCountrySchema, type CountryFormValues } from "../validation/Countries.validation";
import type { AddCountryDto } from "../types/Countries.types";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  countryId?: number | null;
}

const emptyValues: CountryFormValues = {
  isoCode: "",
  phoneCode: "+",
  phoneNumberLength: null,
  isActive: true,
  isDefault: false,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "" },
    { languageCode: DataLanguage.English, name: "" },
  ],
};

const CountryModal = ({ open, onClose, onSuccess, countryId }: CountryModalProps) => {
  const { t } = useTranslation();
  const isEdit = !!countryId;

  const { data: country, isLoading: isLoadingCountry } = useGetCountryQuery(countryId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });

  const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();
  const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CountryFormValues>({
    resolver: yupResolver(addCountrySchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && country) {
      const arabic = country.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
      const english = country.translations.find((translation) => translation.languageCode === DataLanguage.English);
      reset({
        isoCode: country.isoCode,
        phoneCode: country.phoneCode,
        phoneNumberLength: country.phoneNumberLength,
        isActive: country.isActive,
        isDefault: country.isDefault,
        translations: [
          { languageCode: DataLanguage.Arabic, name: arabic?.name || "" },
          { languageCode: DataLanguage.English, name: english?.name || "" },
        ],
      });
    } else if (!isEdit) {
      reset(emptyValues);
    }
  }, [open, isEdit, country, reset]);

  const handleFormSubmit = async (values: CountryFormValues) => {
    const data: AddCountryDto = {
      isoCode: values.isoCode.toUpperCase(),
      phoneCode: values.phoneCode,
      phoneNumberLength: values.phoneNumberLength ?? null,
      isActive: values.isActive,
      isDefault: values.isDefault,
      translations: (values.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode as AddCountryDto["translations"][number]["languageCode"],
        name: translation.name,
      })),
    };

    try {
      if (isEdit && countryId) {
        await updateCountry({ id: countryId, data }).unwrap();
        showSuccess(t("countries.successUpdate"));
      } else {
        await addCountry(data).unwrap();
        showSuccess(t("countries.successCreate"));
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
      title={isEdit ? t("countries.editCountry") : t("countries.addCountry")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingCountry}
      size="xl"
      icon={<GlobeIcon className="w-6 h-6" />}
    >
      <div className="space-y-8">
        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("countries.names")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="translations.0.name"
              control={control}
              label={`${t("countries.nameArabic")} *`}
              error={!!errors.translations?.[0]?.name}
              errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
            />
            <FormInput
              name="translations.1.name"
              control={control}
              label={`${t("countries.nameEnglish")} *`}
              error={!!errors.translations?.[1]?.name}
              errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("countries.details")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              name="isoCode"
              control={control}
              label={`${t("countries.isoCode")} *`}
              placeholder="IQ"
              error={!!errors.isoCode}
              errorMessage={fieldError(errors.isoCode?.message)}
            />
            <FormInput
              name="phoneCode"
              control={control}
              label={`${t("countries.phoneCode")} *`}
              placeholder="+964"
              error={!!errors.phoneCode}
              errorMessage={fieldError(errors.phoneCode?.message)}
            />
            <FormInput
              name="phoneNumberLength"
              control={control}
              type="number"
              label={t("countries.phoneNumberLength")}
              placeholder="10"
              error={!!errors.phoneNumberLength}
              errorMessage={fieldError(errors.phoneNumberLength?.message)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormCheckbox
              name="isActive"
              control={control}
              label={t("countries.isActive")}
              description={t("countries.isActiveHint")}
            />
            <FormCheckbox
              name="isDefault"
              control={control}
              label={t("countries.isDefault")}
              description={t("countries.isDefaultHint")}
            />
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default CountryModal;
