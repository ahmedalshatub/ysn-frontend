import { useState } from "react";
import Button from "../../../../shared/components/buttons/Button";
import TransactionDetailsModal from "../../../transactions/components/TransactionDetailsModal";

interface ReportTransactionLinkProps {
  transactionId?: number | null;
}

const ReportTransactionLink = ({ transactionId }: ReportTransactionLinkProps) => {
  const [open, setOpen] = useState(false);
  if (!transactionId) return <span>-</span>;

  return (
    <>
      <Button variant="link" size="sm" label={`#${transactionId}`} onClick={() => setOpen(true)} />
      {open && <TransactionDetailsModal open transactionId={transactionId} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ReportTransactionLink;
