import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeAllSubAgentsEPaymentMutation } from "../api/Customers.api";

interface AllSubAgentsEPaymentAlertProps {
  open: boolean;
  enabled: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AllSubAgentsEPaymentAlert = ({ open, enabled, onClose, onSuccess }: AllSubAgentsEPaymentAlertProps) => {
  const { t } = useTranslation();
  const [changeAll, { isLoading }] = useChangeAllSubAgentsEPaymentMutation();

  const handleConfirm = async () => {
    try {
      const count = await changeAll({ enabled }).unwrap();
      showSuccess(t(enabled ? "customers.successEPaymentOnAll" : "customers.successEPaymentOffAll", { count }));
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
      title={t(enabled ? "customers.ePaymentOnForAll" : "customers.ePaymentOffForAll")}
      message={t(enabled ? "customers.ePaymentOnAllMessage" : "customers.ePaymentOffAllMessage")}
      confirmText={t(enabled ? "customers.ePaymentOnForAll" : "customers.ePaymentOffForAll")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default AllSubAgentsEPaymentAlert;
