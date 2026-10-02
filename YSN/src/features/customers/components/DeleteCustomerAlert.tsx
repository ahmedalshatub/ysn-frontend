import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCustomerMutation } from "../api/Customers.api";
import { customerFullName, type CustomerListDto } from "../types/Customers.types";

interface DeleteCustomerAlertProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteCustomerAlert = ({ open, customer, onClose, onSuccess }: DeleteCustomerAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteCustomerMutation();

  const handleConfirm = async () => {
    try {
      await mutate(customer.id).unwrap();
      showSuccess(t("customers.successDelete"));
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
      message={t("customers.deleteMessage", { name: customerFullName(customer) })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteCustomerAlert;
