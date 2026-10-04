import { useState } from "react";
import Button from "../../../../shared/components/buttons/Button";
import InvoiceDetailsModal from "../../../invoices/components/InvoiceDetailsModal";

interface ReportInvoiceLinkProps {
  invoiceId?: number | null;
}

const ReportInvoiceLink = ({ invoiceId }: ReportInvoiceLinkProps) => {
  const [open, setOpen] = useState(false);
  if (!invoiceId) return <span>-</span>;

  return (
    <>
      <Button variant="link" size="sm" label={`#${invoiceId}`} onClick={() => setOpen(true)} />
      {open && <InvoiceDetailsModal open invoiceId={invoiceId} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ReportInvoiceLink;
