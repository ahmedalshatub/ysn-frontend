import { useTranslation } from "react-i18next";
import AlertModal from "../../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import {
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} from "../../api/Categories.api";

interface DeleteRestoreAlertsProps {
  open: boolean;
  onClose: () => void;
  isDelete: boolean;
  categoryId: number | null;
  onSuccess: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  onClose,
  isDelete,
  categoryId,
  onSuccess,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [restoreCategory, { isLoading: isRestoring }] = useRestoreCategoryMutation();

  const isLoading = isDeleting || isRestoring;

  const handleConfirm = async () => {
    if (!categoryId) return;
    try {
      if (isDelete) {
        await deleteCategory(categoryId).unwrap();
        showSuccess(t("categoriesExample1.successDelete"));
      } else {
        await restoreCategory(categoryId).unwrap();
        showSuccess(t("categoriesExample1.successRestore"));
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
          ? t("categoriesExample1.deleteMessage")
          : t("categoriesExample1.restoreMessage")
      }
      confirmText={isDelete ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteRestoreAlerts;
