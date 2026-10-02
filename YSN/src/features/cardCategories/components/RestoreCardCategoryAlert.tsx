import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCardCategoryMutation } from "../api/CardCategories.api";
import type { CardCategoryListDto } from "../types/CardCategories.types";

interface RestoreCardCategoryAlertProps {
  open: boolean;
  category: CardCategoryListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreCardCategoryAlert = ({ open, category, onClose, onSuccess }: RestoreCardCategoryAlertProps) => {
  const { t } = useTranslation();
  const [restoreCategory, { isLoading }] = useRestoreCardCategoryMutation();

  const handleConfirm = async () => {
    try {
      await restoreCategory(category.id).unwrap();
      showSuccess(t("cardCategories.successRestore"));
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
      message={t("cardCategories.restoreMessage", { name: category.name })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCardCategoryAlert;
