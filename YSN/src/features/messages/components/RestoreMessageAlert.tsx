import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreMessageMutation } from "../api/Messages.api";
import type { MessageListDto } from "../types/Messages.types";

interface RestoreMessageAlertProps {
  open: boolean;
  message: MessageListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreMessageAlert = ({ open, message, onClose, onSuccess }: RestoreMessageAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreMessageMutation();

  const handleConfirm = async () => {
    try {
      await mutate(message.id).unwrap();
      showSuccess(t("messages.successRestore"));
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
      type="info"
      title={t("messages.confirmRestore")}
      message={t("messages.restoreMessage", { subject: message.subject })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreMessageAlert;
