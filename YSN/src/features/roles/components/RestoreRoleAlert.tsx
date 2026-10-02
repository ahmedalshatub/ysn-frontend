import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreRoleMutation } from "../api/Roles.api";
import type { RoleListDto } from "../types/Roles.types";

interface RestoreRoleAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  role: RoleListDto | null;
}

const RestoreRoleAlert = ({ open, onClose, onSuccess, role }: RestoreRoleAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreRoleMutation();

  const handleConfirm = async () => {
    if (!role) return;
    try {
      await mutate(role.id).unwrap();
      showSuccess(t("roles.successRestore"));
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
      message={t("roles.restoreMessage", { name: role?.name ?? "" })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreRoleAlert;
