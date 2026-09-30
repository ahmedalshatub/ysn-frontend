import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteUserMutation, useRestoreUserMutation } from "../api/Users.api";

interface DeleteRestoreAlertsProps {
  open: boolean;
  onClose: () => void;
  isDelete: boolean;
  userId: number | null;
  onSuccess: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  onClose,
  isDelete,
  userId,
  onSuccess,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [restoreUser, { isLoading: isRestoring }] = useRestoreUserMutation();

  const isLoading = isDeleting || isRestoring;

  const handleConfirm = async () => {
    if (!userId) return;
    try {
      if (isDelete) {
        await deleteUser(String(userId)).unwrap();
        showSuccess(t("usersPage.successDelete"));
      } else {
        await restoreUser(String(userId)).unwrap();
        showSuccess(t("usersPage.successRestore"));
      }
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
      type={isDelete ? "delete" : "info"}
      title={isDelete ? t("messages.confirmDelete") : t("messages.confirmRestore")}
      message={isDelete ? t("usersPage.deleteMessage") : t("usersPage.restoreMessage")}
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRestoreAlerts;
