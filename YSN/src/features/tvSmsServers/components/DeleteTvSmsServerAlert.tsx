import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteTvSmsServerMutation } from "../api/TvSmsServers.api";
import type { TvSmsServerListDto } from "../types/TvSmsServers.types";

interface DeleteTvSmsServerAlertProps {
  open: boolean;
  server: TvSmsServerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteTvSmsServerAlert = ({ open, server, onClose, onSuccess }: DeleteTvSmsServerAlertProps) => {
  const { t } = useTranslation();
  const [deleteServer, { isLoading }] = useDeleteTvSmsServerMutation();

  const handleConfirm = async () => {
    try {
      await deleteServer(server.id).unwrap();
      showSuccess(t("tvSmsServers.successDelete"));
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
      message={t("tvSmsServers.deleteMessage", { name: server.name })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteTvSmsServerAlert;
