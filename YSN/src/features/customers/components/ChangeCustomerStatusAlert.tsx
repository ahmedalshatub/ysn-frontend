import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeCustomerStatusMutation } from "../api/Customers.api";
import { customerFullName, type CustomerListDto } from "../types/Customers.types";

interface ChangeCustomerStatusAlertProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangeCustomerStatusAlert = ({ open, customer, onClose, onSuccess }: ChangeCustomerStatusAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useChangeCustomerStatusMutation();

  const handleConfirm = async () => {
    try {
      await mutate({ id: customer.id, isActive: !customer.isActive }).unwrap();
      showSuccess(t(customer.isActive ? "customers.successDisable" : "customers.successEnable"));
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
      type={customer.isActive ? "warning" : "confirm"}
      title={t(customer.isActive ? "customers.disable" : "customers.enable")}
      message={t(customer.isActive ? "customers.disableMessage" : "customers.enableMessage", { name: customerFullName(customer) })}
      confirmText={t(customer.isActive ? "customers.disable" : "customers.enable")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default ChangeCustomerStatusAlert;
