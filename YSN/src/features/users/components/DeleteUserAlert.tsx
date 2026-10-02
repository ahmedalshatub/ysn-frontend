import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteUserMutation } from "../api/Users.api";
import { fullName, type UserListDto } from "../types/Users.types";

interface DeleteUserAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserListDto | null;
}

const DeleteUserAlert = ({ open, onClose, onSuccess, user }: DeleteUserAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteUserMutation();

  const handleConfirm = async () => {
    if (!user) return;
    try {
      await mutate(user.id).unwrap();
      showSuccess(t("users.successDelete"));
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
      message={t("users.deleteMessage", { name: user ? fullName(user) : "" })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteUserAlert;
