import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import {
  useDeleteTestSubTrMutation,
  useRestoreTestSubTrMutation,
} from "../api/TestSubTr.api";

interface DeleteRestoreAlertsProps {
  open: boolean;
  onClose: () => void;
  isDelete: boolean;
  testSubTrId: number | null;
  onSuccess: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  onClose,
  isDelete,
  testSubTrId,
  onSuccess,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();
  const [deleteTestSubTr, { isLoading: isDeleting }] = useDeleteTestSubTrMutation();
  const [restoreTestSubTr, { isLoading: isRestoring }] = useRestoreTestSubTrMutation();

  const isLoading = isDeleting || isRestoring;

  const handleConfirm = async () => {
    if (!testSubTrId) return;
    try {
      if (isDelete) {
        await deleteTestSubTr(testSubTrId.toString()).unwrap();
        showSuccess(t("testSubTrs.successDelete"));
      } else {
        await restoreTestSubTr(testSubTrId.toString()).unwrap();
        showSuccess(t("testSubTrs.successRestore"));
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
          ? t("testSubTrs.deleteMessage")
          : t("testSubTrs.restoreMessage")
      }
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRestoreAlerts;
