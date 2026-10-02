import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useResetUserPasswordMutation } from "../api/Users.api";
import { fullName, type UserListDto } from "../types/Users.types";

interface ResetUserPasswordAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserListDto | null;
}

const ResetUserPasswordAlert = ({ open, onClose, onSuccess, user }: ResetUserPasswordAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useResetUserPasswordMutation();

  const handleConfirm = async () => {
    if (!user) return;
    try {
      await mutate(user.id).unwrap();
      showSuccess(t("users.successResetPassword"));
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
      type="warning"
      title={t("users.resetPassword")}
      message={t("users.resetPasswordMessage", { name: user ? fullName(user) : "" })}
      confirmText={t("users.resetPassword")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default ResetUserPasswordAlert;
