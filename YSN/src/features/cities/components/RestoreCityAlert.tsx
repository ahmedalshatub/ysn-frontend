import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCityMutation } from "../api/Cities.api";

interface RestoreCityAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cityId: number | null;
}

const RestoreCityAlert = ({ open, onClose, onSuccess, cityId }: RestoreCityAlertProps) => {
  const { t } = useTranslation();
  const [restoreCity, { isLoading }] = useRestoreCityMutation();

  const handleConfirm = async () => {
    if (!cityId) return;
    try {
      await restoreCity(cityId).unwrap();
      showSuccess(t("cities.successRestore"));
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
      message={t("cities.restoreMessage")}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCityAlert;
