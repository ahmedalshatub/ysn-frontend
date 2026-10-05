import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeAllCitiesEPaymentMutation } from "../api/Cities.api";

interface AllCitiesEPaymentAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  enabled: boolean;
}

const AllCitiesEPaymentAlert = ({ open, onClose, onSuccess, enabled }: AllCitiesEPaymentAlertProps) => {
  const { t } = useTranslation();
  const [changeAll, { isLoading }] = useChangeAllCitiesEPaymentMutation();

  const handleConfirm = async () => {
    try {
      const count = await changeAll({ enabled }).unwrap();
      showSuccess(t(enabled ? "cities.successEPaymentOnAll" : "cities.successEPaymentOffAll", { count }));
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
      type={enabled ? "info" : "warning"}
      title={t(enabled ? "cities.ePaymentOnForAll" : "cities.ePaymentOffForAll")}
      message={t(enabled ? "cities.ePaymentOnAllMessage" : "cities.ePaymentOffAllMessage")}
      confirmText={t(enabled ? "cities.ePaymentOnForAll" : "cities.ePaymentOffForAll")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default AllCitiesEPaymentAlert;
