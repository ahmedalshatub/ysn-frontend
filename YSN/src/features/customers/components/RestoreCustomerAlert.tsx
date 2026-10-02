import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCustomerMutation } from "../api/Customers.api";
import { customerFullName, type CustomerListDto } from "../types/Customers.types";

interface RestoreCustomerAlertProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreCustomerAlert = ({ open, customer, onClose, onSuccess }: RestoreCustomerAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreCustomerMutation();

  const handleConfirm = async () => {
    try {
      await mutate(customer.id).unwrap();
      showSuccess(t("customers.successRestore"));
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
      message={t("customers.restoreMessage", { name: customerFullName(customer) })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCustomerAlert;
