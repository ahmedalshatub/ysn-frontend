import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreUserMutation } from "../api/Users.api";
import { fullName, type UserListDto } from "../types/Users.types";

interface RestoreUserAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserListDto | null;
}

const RestoreUserAlert = ({ open, onClose, onSuccess, user }: RestoreUserAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreUserMutation();

  const handleConfirm = async () => {
    if (!user) return;
    try {
      await mutate(user.id).unwrap();
      showSuccess(t("users.successRestore"));
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
      message={t("users.restoreMessage", { name: user ? fullName(user) : "" })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreUserAlert;
