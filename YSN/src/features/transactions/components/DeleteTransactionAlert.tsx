import { useState } from "react";
import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import TextArea from "../../../shared/components/inputs/TextArea";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useDeleteTransactionMutation } from "../api/Transactions.api";
import type { TransactionListDto } from "../types/Transactions.types";

interface DeleteTransactionAlertProps {
  open: boolean;
  transaction: TransactionListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteTransactionAlert = ({ open, transaction, onClose, onSuccess }: DeleteTransactionAlertProps) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [mutate, { isLoading }] = useDeleteTransactionMutation();

  const handleConfirm = async () => {
    try {
      await mutate({ id: transaction.id, reason: reason.trim() }).unwrap();
      showSuccess(t("transactions.successDelete"));
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
      title={t("transactions.confirmDelete")}
      message={t("transactions.deleteMessage", { id: transaction.id, amount: formatCurrency(transaction.amount) })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    >
      <TextArea
        name="reason"
        label={t("transactions.deleteReason")}
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        rows={3}
        maxLength={500}
      />
    </AlertModal>
  );
};

export default DeleteTransactionAlert;
