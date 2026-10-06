import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../../shared/components/modals/FormModal";
import FormRadioButton from "../../../../shared/components/inputs/FormRadioButton";
import FormTextArea from "../../../../shared/components/inputs/FormTextArea";
import Message from "../../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import { useResolveTvActivationMutation } from "../../api/TvActivations.api";
import { resolveTvActivationSchema, type ResolveTvActivationFormValues } from "../../validation/Tvs.validation";
import {
  resolveTvActivationStatuses,
  tvActivationStatusKeys,
  type TvActivationListDto,
  type TvActivationStatusValue,
} from "../../types/TvActivations.types";

interface ResolveTvActivationModalProps {
  open: boolean;
  activation: TvActivationListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const ResolveTvActivationModal = ({ open, activation, onClose, onSuccess }: ResolveTvActivationModalProps) => {
  const { t } = useTranslation();
  const [resolve, { isLoading }] = useResolveTvActivationMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResolveTvActivationFormValues>({
    resolver: yupResolver(resolveTvActivationSchema) as never,
    mode: "onBlur",
    defaultValues: { status: "", note: "" },
  });

  const onSubmit = async (values: ResolveTvActivationFormValues) => {
    try {
      await resolve({
        id: activation.id,
        data: { status: Number(values.status) as TvActivationStatusValue, note: values.note?.trim() || undefined },
      }).unwrap();
      showSuccess(t("tvActivations.successResolve"));
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
      title={t("tvActivations.resolveTitle", { id: activation.id })}
      subtitle={`${activation.tvNumber} - ${activation.customerName}`}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<CheckCircleIcon className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <Message variant="info">{t("tvActivations.resolveHint")}</Message>
        <FormRadioButton<ResolveTvActivationFormValues>
          name="status"
          control={control}
          direction="vertical"
          options={resolveTvActivationStatuses.map((status) => ({
            value: String(status),
            label: t(tvActivationStatusKeys[status]),
            description: t(`tvActivations.resolveHint${status}`),
          }))}
          error={!!errors.status}
          errorMessage={fieldError(errors.status?.message)}
        />
        <FormTextArea<ResolveTvActivationFormValues>
          name="note"
          control={control}
          label={t("tvActivations.resolveNote")}
          rows={3}
          error={!!errors.note}
          errorMessage={fieldError(errors.note?.message)}
        />
      </div>
    </FormModal>
  );
};

export default ResolveTvActivationModal;
