import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeSubAgentEPaymentMutation } from "../api/Customers.api";
import { customerFullName, type CustomerListDto } from "../types/Customers.types";

interface SubAgentEPaymentAlertProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const SubAgentEPaymentAlert = ({ open, customer, onClose, onSuccess }: SubAgentEPaymentAlertProps) => {
  const { t } = useTranslation();
  const [changeEPayment, { isLoading }] = useChangeSubAgentEPaymentMutation();
  const enabled = !customer.subAgentEPaymentEnabled;
  const name = customerFullName(customer);

  const handleConfirm = async () => {
    try {
      await changeEPayment({ id: customer.id, enabled }).unwrap();
      showSuccess(t(enabled ? "customers.successEPaymentOn" : "customers.successEPaymentOff", { name }));
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
      title={t(enabled ? "customers.turnEPaymentOn" : "customers.turnEPaymentOff")}
      message={t(enabled ? "customers.ePaymentOnMessage" : "customers.ePaymentOffMessage", { name })}
      confirmText={t(enabled ? "customers.turnEPaymentOn" : "customers.turnEPaymentOff")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default SubAgentEPaymentAlert;
