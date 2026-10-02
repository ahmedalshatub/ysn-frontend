import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCountryMutation } from "../api/Countries.api";

interface RestoreCountryAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  countryId: number | null;
}

const RestoreCountryAlert = ({ open, onClose, onSuccess, countryId }: RestoreCountryAlertProps) => {
  const { t } = useTranslation();
  const [restoreCountry, { isLoading }] = useRestoreCountryMutation();

  const handleConfirm = async () => {
    if (!countryId) return;
    try {
      await restoreCountry(countryId).unwrap();
      showSuccess(t("countries.successRestore"));
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
      message={t("countries.restoreMessage")}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCountryAlert;
