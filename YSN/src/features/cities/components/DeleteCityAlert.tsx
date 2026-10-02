import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCityMutation } from "../api/Cities.api";

interface DeleteCityAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cityId: number | null;
}

const DeleteCityAlert = ({ open, onClose, onSuccess, cityId }: DeleteCityAlertProps) => {
  const { t } = useTranslation();
  const [deleteCity, { isLoading }] = useDeleteCityMutation();

  const handleConfirm = async () => {
    if (!cityId) return;
    try {
      await deleteCity(cityId).unwrap();
      showSuccess(t("cities.successDelete"));
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
      message={t("cities.deleteMessage")}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteCityAlert;
