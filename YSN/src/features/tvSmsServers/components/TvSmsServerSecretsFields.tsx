import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import type { TvSmsServerFormValues } from "../validation/TvSmsServers.validation";
import type { TvSmsServerDto } from "../types/TvSmsServers.types";

interface TvSmsServerSecretsFieldsProps {
  control: Control<TvSmsServerFormValues>;
  errors: FieldErrors<TvSmsServerFormValues>;
  server?: TvSmsServerDto;
}

const TvSmsServerSecretsFields = ({ control, errors, server }: TvSmsServerSecretsFieldsProps) => {
  const { t } = useTranslation();
  const isEdit = !!server;
  const label = (key: string) => (isEdit ? t(key) : `${t(key)} *`);
  const placeholder = (isSet?: boolean) => (isSet ? t("tvSmsServers.secretKept") : undefined);
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <div className="grid grid-cols-1 gap-4">
      <FormPasswordInput<TvSmsServerFormValues>
        name="password"
        control={control}
        label={label("tvSmsServers.password")}
        placeholder={placeholder(server?.hasPassword)}
        error={!!errors.password}
        errorMessage={fieldError(errors.password?.message)}
      />
      <FormTextArea<TvSmsServerFormValues>
        name="authKey"
        control={control}
        label={label("tvSmsServers.authKey")}
        placeholder={placeholder(server?.hasAuthKey)}
        rows={2}
        resize="vertical"
        error={!!errors.authKey}
        errorMessage={fieldError(errors.authKey?.message)}
      />
      <FormTextArea<TvSmsServerFormValues>
        name="publicKey"
        control={control}
        label={label("tvSmsServers.publicKey")}
        placeholder={placeholder(server?.hasPublicKey) ?? t("tvSmsServers.publicKeyHint")}
        rows={5}
        resize="vertical"
        error={!!errors.publicKey}
        errorMessage={fieldError(errors.publicKey?.message)}
      />
    </div>
  );
};

export default TvSmsServerSecretsFields;
