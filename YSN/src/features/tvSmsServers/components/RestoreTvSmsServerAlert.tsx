import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreTvSmsServerMutation } from "../api/TvSmsServers.api";
import type { TvSmsServerListDto } from "../types/TvSmsServers.types";

interface RestoreTvSmsServerAlertProps {
  open: boolean;
  server: TvSmsServerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreTvSmsServerAlert = ({ open, server, onClose, onSuccess }: RestoreTvSmsServerAlertProps) => {
  const { t } = useTranslation();
  const [restoreServer, { isLoading }] = useRestoreTvSmsServerMutation();

  const handleConfirm = async () => {
    try {
      await restoreServer(server.id).unwrap();
      showSuccess(t("tvSmsServers.successRestore"));
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
      message={t("tvSmsServers.restoreMessage", { name: server.name })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreTvSmsServerAlert;
