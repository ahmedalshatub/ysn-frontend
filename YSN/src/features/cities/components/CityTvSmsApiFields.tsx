import { useWatch, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormSection from "../../../shared/components/forms/FormSection";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import FormInput from "../../../shared/components/inputs/FormInput";
import ServerIcon from "../../../assets/icons/ServerIcon";
import CityTvSmsSecretsFields from "./CityTvSmsSecretsFields";
import CityTvSmsDefaultsFields from "./CityTvSmsDefaultsFields";
import type { CityFormValues, CityStoredSecrets } from "../validation/Cities.validation";

interface CityTvSmsApiFieldsProps {
  control: Control<CityFormValues>;
  errors: FieldErrors<CityFormValues>;
  isEdit: boolean;
  storedSecrets: CityStoredSecrets;
}

const CityTvSmsApiFields = ({ control, errors, isEdit, storedSecrets }: CityTvSmsApiFieldsProps) => {
  const { t } = useTranslation();
  const hasTvSmsApi = useWatch({ control, name: "hasTvSmsApi" });
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <>
      <FormSection icon={<ServerIcon />} title={t("cities.tvSmsApi")} columns={2}>
        <FormCheckbox<CityFormValues>
          name="hasTvSmsApi"
          control={control}
          label={t("cities.hasTvSmsApi")}
          description={t("cities.hasTvSmsApiHint")}
          containerClass="md:col-span-2"
        />
        {hasTvSmsApi && (
          <>
            <FormInput<CityFormValues>
              name="tvSmsBaseUrl"
              control={control}
              label={`${t("cities.tvSmsBaseUrl")} *`}
              placeholder="https://"
              containerClass="md:col-span-2"
              error={!!errors.tvSmsBaseUrl}
              errorMessage={fieldError(errors.tvSmsBaseUrl?.message)}
            />
            <FormInput<CityFormValues>
              name="tvSmsUserId"
              control={control}
              label={`${t("cities.tvSmsUserId")} *`}
              error={!!errors.tvSmsUserId}
              errorMessage={fieldError(errors.tvSmsUserId?.message)}
            />
          </>
        )}
      </FormSection>
      {hasTvSmsApi && (
        <>
          <CityTvSmsSecretsFields control={control} errors={errors} isEdit={isEdit} storedSecrets={storedSecrets} />
          <CityTvSmsDefaultsFields control={control} errors={errors} />
        </>
      )}
    </>
  );
};

export default CityTvSmsApiFields;
