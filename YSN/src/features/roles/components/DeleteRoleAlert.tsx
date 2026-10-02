import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteRoleMutation } from "../api/Roles.api";
import type { RoleListDto } from "../types/Roles.types";

interface DeleteRoleAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  role: RoleListDto | null;
}

const DeleteRoleAlert = ({ open, onClose, onSuccess, role }: DeleteRoleAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteRoleMutation();

  const handleConfirm = async () => {
    if (!role) return;
    try {
      await mutate(role.id).unwrap();
      showSuccess(t("roles.successDelete"));
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
      message={t("roles.deleteMessage", { name: role?.name ?? "" })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRoleAlert;
