import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";

interface DeleteRestoreAlertsProps {
  open: boolean;
  isDelete: boolean;
  childCount: number;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  isDelete,
  childCount,
  onClose,
  onConfirm,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();

  const message = !isDelete
    ? t("accountsExample.restoreMessage")
    : childCount > 0
      ? t("accountsExample.deleteBranchMessage", { count: childCount })
      : t("accountsExample.deleteMessage");

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      type={isDelete ? "delete" : "info"}
      title={isDelete ? t("messages.confirmDelete") : t("messages.confirmRestore")}
      message={message}
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
    />
  );
};

export default DeleteRestoreAlerts;
