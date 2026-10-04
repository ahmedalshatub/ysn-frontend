import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormSection from "../../../shared/components/forms/FormSection";
import FormInput from "../../../shared/components/inputs/FormInput";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import { TvSmsDefaultFields } from "../types/Cities.types";
import type { CityFormValues } from "../validation/Cities.validation";

interface CityTvSmsDefaultsFieldsProps {
  control: Control<CityFormValues>;
  errors: FieldErrors<CityFormValues>;
}

const CityTvSmsDefaultsFields = ({ control, errors }: CityTvSmsDefaultsFieldsProps) => {
  const { t } = useTranslation();
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormSection icon={<SettingsIcon />} title={t("cities.tvSmsDefaults")} columns={2}>
      {TvSmsDefaultFields.map((field) => (
        <FormInput<CityFormValues>
          key={field}
          name={field}
          control={control}
          type="number"
          min={1}
          label={`${t(`cities.${field}`)} *`}
          error={!!errors[field]}
          errorMessage={fieldError(errors[field]?.message)}
        />
      ))}
    </FormSection>
  );
};

export default CityTvSmsDefaultsFields;
