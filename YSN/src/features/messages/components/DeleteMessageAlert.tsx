import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteMessageMutation } from "../api/Messages.api";
import type { MessageListDto } from "../types/Messages.types";

interface DeleteMessageAlertProps {
  open: boolean;
  message: MessageListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteMessageAlert = ({ open, message, onClose, onSuccess }: DeleteMessageAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteMessageMutation();

  const handleConfirm = async () => {
    try {
      await mutate(message.id).unwrap();
      showSuccess(t("messages.successDelete"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      type="delete"
      title={t("messages.confirmDelete")}
      message={t("messages.deleteMessage", { subject: message.subject })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteMessageAlert;
