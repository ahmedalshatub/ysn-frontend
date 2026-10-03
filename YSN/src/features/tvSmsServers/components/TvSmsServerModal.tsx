import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import ServerIcon from "../../../assets/icons/ServerIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import { useAddTvSmsServerMutation, useGetTvSmsServerQuery, useUpdateTvSmsServerMutation } from "../api/TvSmsServers.api";
import { tvSmsServerSchema, type TvSmsServerFormValues } from "../validation/TvSmsServers.validation";
import TvSmsServerSecretsFields from "./TvSmsServerSecretsFields";
import type { AddTvSmsServerDto } from "../types/TvSmsServers.types";

interface TvSmsServerModalProps {
  open: boolean;
  serverId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const emptyValues: TvSmsServerFormValues = {
  name: "",
  baseUrl: "",
  smsUserId: "",
  password: "",
  authKey: "",
  publicKey: "",
  defaultLanguage: 4,
  defaultDepartmentId: 1,
  defaultRegionId: 1,
  defaultCustomerTypeId: 1,
  isActive: true,
};

const defaultFields = ["defaultLanguage", "defaultDepartmentId", "defaultRegionId", "defaultCustomerTypeId"] as const;

const TvSmsServerModal = ({ open, serverId, onClose, onSuccess }: TvSmsServerModalProps) => {
  const { t } = useTranslation();
  const isEdit = !!serverId;

  const { data: server, isLoading: isLoadingServer } = useGetTvSmsServerQuery(serverId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });
  const [addServer, { isLoading: isAdding }] = useAddTvSmsServerMutation();
  const [updateServer, { isLoading: isUpdating }] = useUpdateTvSmsServerMutation();

  const schema = useMemo(() => tvSmsServerSchema(isEdit), [isEdit]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TvSmsServerFormValues>({
    resolver: yupResolver(schema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && server) {
      reset({
        ...emptyValues,
        name: server.name,
        baseUrl: server.baseUrl,
        smsUserId: server.smsUserId,
        defaultLanguage: server.defaultLanguage,
        defaultDepartmentId: server.defaultDepartmentId,
        defaultRegionId: server.defaultRegionId,
        defaultCustomerTypeId: server.defaultCustomerTypeId,
        isActive: server.isActive,
      });
    } else if (!isEdit) {
      reset(emptyValues);
    }
  }, [open, isEdit, server, reset]);

  const handleFormSubmit = async (values: TvSmsServerFormValues) => {
    const data: AddTvSmsServerDto = {
      ...values,
      password: values.password || undefined,
      authKey: values.authKey || undefined,
      publicKey: values.publicKey || undefined,
    };

    try {
      if (isEdit && serverId) {
        await updateServer({ id: serverId, data }).unwrap();
        showSuccess(t("tvSmsServers.successUpdate"));
      } else {
        await addServer(data).unwrap();
        showSuccess(t("tvSmsServers.successCreate"));
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
      title={isEdit ? t("tvSmsServers.editServer") : t("tvSmsServers.addServer")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingServer}
      size="xl"
      icon={<ServerIcon className="w-6 h-6" />}
    >
      <div className="space-y-8">
        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("tvSmsServers.details")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput<TvSmsServerFormValues>
              name="name"
              control={control}
              label={`${t("tvSmsServers.name")} *`}
              error={!!errors.name}
              errorMessage={fieldError(errors.name?.message)}
            />
            <FormInput<TvSmsServerFormValues>
              name="smsUserId"
              control={control}
              label={`${t("tvSmsServers.smsUserId")} *`}
              error={!!errors.smsUserId}
              errorMessage={fieldError(errors.smsUserId?.message)}
            />
            <FormInput<TvSmsServerFormValues>
              name="baseUrl"
              control={control}
              label={`${t("tvSmsServers.baseUrl")} *`}
              placeholder="https://"
              containerClass="md:col-span-2"
              error={!!errors.baseUrl}
              errorMessage={fieldError(errors.baseUrl?.message)}
            />
            <FormCheckbox<TvSmsServerFormValues>
              name="isActive"
              control={control}
              label={t("tvSmsServers.isActive")}
              description={t("tvSmsServers.isActiveHint")}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <KeyIcon className="w-4 h-4 text-primary" />
            <h3>{t("tvSmsServers.secrets")}</h3>
          </div>
          {isEdit && <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{t("tvSmsServers.secretsHint")}</p>}
          <TvSmsServerSecretsFields control={control} errors={errors} server={isEdit ? server : undefined} />
        </div>

        <div>
          <div className="form-section-title mb-4">
            <SettingsIcon className="w-4 h-4 text-primary" />
            <h3>{t("tvSmsServers.defaults")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultFields.map((field) => (
              <FormInput<TvSmsServerFormValues>
                key={field}
                name={field}
                control={control}
                type="number"
                label={`${t(`tvSmsServers.${field}`)} *`}
                error={!!errors[field]}
                errorMessage={fieldError(errors[field]?.message)}
              />
            ))}
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default TvSmsServerModal;
