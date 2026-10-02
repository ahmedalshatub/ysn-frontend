import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCountryMutation } from "../api/Countries.api";

interface DeleteCountryAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  countryId: number | null;
}

const DeleteCountryAlert = ({ open, onClose, onSuccess, countryId }: DeleteCountryAlertProps) => {
  const { t } = useTranslation();
  const [deleteCountry, { isLoading }] = useDeleteCountryMutation();

  const handleConfirm = async () => {
    if (!countryId) return;
    try {
      await deleteCountry(countryId).unwrap();
      showSuccess(t("countries.successDelete"));
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
      message={t("countries.deleteMessage")}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteCountryAlert;
