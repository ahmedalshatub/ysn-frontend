import TransactionDetailsModal from "../../transactions/components/TransactionDetailsModal";
import InvoiceDetailsModal from "../../invoices/components/InvoiceDetailsModal";
import TvDetailsModal from "../../tvs/components/tvs/TvDetailsModal";
import TvActivationDetailsModal from "../../tvs/components/tvActivations/TvActivationDetailsModal";
import type { NotificationTarget } from "../types/Notifications.types";

interface NotificationTargetModalProps {
  target: NotificationTarget | null;
  onClose: () => void;
}

const NotificationTargetModal = ({ target, onClose }: NotificationTargetModalProps) => {
  if (target?.kind === "transaction") return <TransactionDetailsModal open transactionId={target.id} onClose={onClose} />;
  if (target?.kind === "invoice") return <InvoiceDetailsModal open invoiceId={target.id} onClose={onClose} />;
  if (target?.kind === "tv") return <TvDetailsModal open customerTvId={target.id} onClose={onClose} />;
  if (target?.kind === "tvActivation") return <TvActivationDetailsModal open activationId={target.id} onClose={onClose} />;
  return null;
};

export default NotificationTargetModal;
