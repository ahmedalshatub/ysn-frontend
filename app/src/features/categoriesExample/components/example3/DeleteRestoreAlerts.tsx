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
  categoryId: number | null;
  type: "delete" | "restore";
  onSuccess: () => void;
}

const DeleteRestoreAlerts = ({
  open,
  onClose,
  categoryId,
  type,
  onSuccess,
}: DeleteRestoreAlertsProps) => {
  const { t } = useTranslation();

  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [restoreCategory, { isLoading: isRestoring }] = useRestoreCategoryMutation();

  const handleConfirm = async () => {
    if (!categoryId) return;

    try {
      if (type === "delete") {
        await deleteCategory(categoryId).unwrap();
        showSuccess(t("categoriesExample3.successDelete"));
      } else {
        await restoreCategory(categoryId).unwrap();
        showSuccess(t("categoriesExample3.successRestore"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const isLoading = isDeleting || isRestoring;

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      type={type === "delete" ? "delete" : "info"}
      title={type === "delete" ? t("common.delete") : t("common.restore")}
      message={
        type === "delete"
          ? t("categoriesExample3.deleteMessage")
          : t("categoriesExample3.restoreMessage")
      }
      confirmText={type === "delete" ? t("common.delete") : t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="sm"
    />
  );
};

export default DeleteRestoreAlerts;
