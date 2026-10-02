import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useRestoreTransactionMutation } from "../api/Transactions.api";
import type { TransactionListDto } from "../types/Transactions.types";

interface RestoreTransactionAlertProps {
  open: boolean;
  transaction: TransactionListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreTransactionAlert = ({ open, transaction, onClose, onSuccess }: RestoreTransactionAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreTransactionMutation();

  const handleConfirm = async () => {
    try {
      await mutate(transaction.id).unwrap();
      showSuccess(t("transactions.successRestore"));
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
      title={t("transactions.confirmRestore")}
      message={t("transactions.restoreMessage", { id: transaction.id, amount: formatCurrency(transaction.amount) })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreTransactionAlert;
