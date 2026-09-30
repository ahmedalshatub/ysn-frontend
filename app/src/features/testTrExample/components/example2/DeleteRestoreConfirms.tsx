import { useTranslation } from "react-i18next";
import AlertModal from "../../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import {
  useDeleteTestTrMutation,
  useRestoreTestTrMutation,
} from "../../api/TestTr.api";

interface DeleteRestoreConfirmsProps {
  open: boolean;
  onClose: () => void;
  type: "delete" | "restore";
  testTrId: number | null;
  onSuccess: () => void;
}

const DeleteRestoreConfirms = ({
  open,
  onClose,
  type,
  testTrId,
  onSuccess,
}: DeleteRestoreConfirmsProps) => {
  const { t } = useTranslation();
  const [deleteTestTr, { isLoading: isDeleting }] = useDeleteTestTrMutation();
  const [restoreTestTr, { isLoading: isRestoring }] = useRestoreTestTrMutation();

  const isLoading = isDeleting || isRestoring;
  const isDelete = type === "delete";

  const handleConfirm = async () => {
    if (!testTrId) return;
    try {
      if (isDelete) {
        await deleteTestTr(testTrId.toString()).unwrap();
        showSuccess(t("testTrExample2.successDelete"));
      } else {
        await restoreTestTr(testTrId.toString()).unwrap();
        showSuccess(t("testTrExample2.successRestore"));
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
          ? t("testTrExample2.deleteMessage")
          : t("testTrExample2.restoreMessage")
      }
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRestoreConfirms;
