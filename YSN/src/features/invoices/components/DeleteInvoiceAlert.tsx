import { useState } from "react";
import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import TextArea from "../../../shared/components/inputs/TextArea";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useDeleteInvoiceMutation } from "../api/Invoices.api";
import type { InvoiceListDto } from "../types/Invoices.types";

interface DeleteInvoiceAlertProps {
  open: boolean;
  invoice: InvoiceListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteInvoiceAlert = ({ open, invoice, onClose, onSuccess }: DeleteInvoiceAlertProps) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [mutate, { isLoading }] = useDeleteInvoiceMutation();

  const handleConfirm = async () => {
    const trimmed = reason.trim();
    if (trimmed.length < 2) {
      setError(t("errors.Invoice.DeleteReasonRequired"));
      return;
    }

    try {
      await mutate({ id: invoice.id, reason: trimmed }).unwrap();
      showSuccess(t("invoices.successDelete"));
      onSuccess();
      onClose();
    } catch (requestError) {
      showError(getErrorMessage(requestError));
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      type="delete"
      title={t("invoices.confirmDelete")}
      message={t("invoices.deleteMessage", { id: invoice.id, amount: formatCurrency(invoice.totalPrice), count: invoice.quantity })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    >
      <TextArea
        name="reason"
        label={`${t("invoices.deleteReason")} *`}
        value={reason}
        onChange={(event) => {
          setReason(event.target.value);
          setError("");
        }}
        rows={3}
        maxLength={500}
        error={!!error}
        errorMessage={error}
      />
    </AlertModal>
  );
};

export default DeleteInvoiceAlert;
