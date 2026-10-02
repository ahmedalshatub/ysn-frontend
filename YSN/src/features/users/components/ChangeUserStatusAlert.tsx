import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeUserStatusMutation } from "../api/Users.api";
import { fullName, type UserListDto } from "../types/Users.types";

interface ChangeUserStatusAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserListDto | null;
}

const ChangeUserStatusAlert = ({ open, onClose, onSuccess, user }: ChangeUserStatusAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useChangeUserStatusMutation();

  const handleConfirm = async () => {
    if (!user) return;
    try {
      await mutate({ id: user.id, isActive: !user.isActive }).unwrap();
      showSuccess(t(user.isActive ? "users.successDeactivate" : "users.successActivate"));
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
      type={user?.isActive ? "warning" : "confirm"}
      title={t(user?.isActive ? "users.deactivate" : "users.activate")}
      message={t(user?.isActive ? "users.deactivateMessage" : "users.activateMessage", { name: user ? fullName(user) : "" })}
      confirmText={t(user?.isActive ? "users.deactivate" : "users.activate")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default ChangeUserStatusAlert;
