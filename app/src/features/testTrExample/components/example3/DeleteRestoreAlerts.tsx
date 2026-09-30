import { useTranslation } from "react-i18next";
import AlertModal from "../../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import {
  useDeleteTestTrMutation,
  useRestoreTestTrMutation,
} from "../../api/TestTr.api";

interface DeleteRestoreAlertsProps {
  open: boolean;
  onClose: () => void;
  isDelete: boolean;
  testTrId: number | null;
  onSuccess: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  onClose,
  isDelete,
  testTrId,
  onSuccess,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();
  const [deleteTestTr, { isLoading: isDeleting }] = useDeleteTestTrMutation();
  const [restoreTestTr, { isLoading: isRestoring }] = useRestoreTestTrMutation();

  const isLoading = isDeleting || isRestoring;

  const handleConfirm = async () => {
    if (!testTrId) return;
    try {
      if (isDelete) {
        await deleteTestTr(testTrId.toString()).unwrap();
        showSuccess(t("testTrExample3.successDelete"));
      } else {
        await restoreTestTr(testTrId.toString()).unwrap();
        showSuccess(t("testTrExample3.successRestore"));
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
      message={
        isDelete
          ? t("testTrExample3.deleteMessage")
          : t("testTrExample3.restoreMessage")
      }
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRestoreAlerts;
