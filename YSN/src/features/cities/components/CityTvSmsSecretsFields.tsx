import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormSection from "../../../shared/components/forms/FormSection";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import Message from "../../../shared/components/feedback/Message";
import KeyIcon from "../../../assets/icons/KeyIcon";
import type { CityFormValues, CityStoredSecrets } from "../validation/Cities.validation";

interface CityTvSmsSecretsFieldsProps {
  control: Control<CityFormValues>;
  errors: FieldErrors<CityFormValues>;
  isEdit: boolean;
  storedSecrets: CityStoredSecrets;
}

const CityTvSmsSecretsFields = ({ control, errors, isEdit, storedSecrets }: CityTvSmsSecretsFieldsProps) => {
  const { t } = useTranslation();
  const label = (key: string, isStored: boolean) => (isStored ? t(key) : `${t(key)} *`);
  const placeholder = (isStored: boolean, fallback?: string) => (isStored ? t("cities.tvSmsSecretStored") : fallback);
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormSection icon={<KeyIcon />} title={t("cities.tvSmsSecrets")}>
      {isEdit && <Message variant="info">{t("cities.tvSmsSecretsHint")}</Message>}
      <FormPasswordInput<CityFormValues>
        name="tvSmsPassword"
        control={control}
        label={label("cities.tvSmsPassword", storedSecrets.hasTvSmsPassword)}
        placeholder={placeholder(storedSecrets.hasTvSmsPassword)}
        error={!!errors.tvSmsPassword}
        errorMessage={fieldError(errors.tvSmsPassword?.message)}
      />
      <FormTextArea<CityFormValues>
        name="tvSmsAuthKey"
        control={control}
        label={label("cities.tvSmsAuthKey", storedSecrets.hasTvSmsAuthKey)}
        placeholder={placeholder(storedSecrets.hasTvSmsAuthKey)}
        rows={2}
        resize="vertical"
        error={!!errors.tvSmsAuthKey}
        errorMessage={fieldError(errors.tvSmsAuthKey?.message)}
      />
      <FormTextArea<CityFormValues>
        name="tvSmsPublicKey"
        control={control}
        label={label("cities.tvSmsPublicKey", storedSecrets.hasTvSmsPublicKey)}
        placeholder={placeholder(storedSecrets.hasTvSmsPublicKey, t("cities.tvSmsPublicKeyHint"))}
        rows={5}
        resize="vertical"
        error={!!errors.tvSmsPublicKey}
        errorMessage={fieldError(errors.tvSmsPublicKey?.message)}
      />
    </FormSection>
  );
};

export default CityTvSmsSecretsFields;
