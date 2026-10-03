import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import InfoItem from "../../../shared/components/cards/InfoItem";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useGetInvoiceQuery } from "../api/Invoices.api";

interface InvoiceDetailsModalProps {
  open: boolean;
  invoiceId: number;
  onClose: () => void;
}

const InvoiceDetailsModal = ({ open, invoiceId, onClose }: InvoiceDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: invoice, isLoading } = useGetInvoiceQuery(invoiceId, { refetchOnMountOrArgChange: true });
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("invoices.invoice")} #{invoiceId}</h3>
        {isLoading || !invoice ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            {invoice.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem title={t("invoices.date")} value={date(invoice.createdAt)} />
              <InfoItem title={t("invoices.customer")} value={invoice.customerName ?? "-"} />
              <InfoItem title={t("cards.cardType")} value={`${invoice.cardTypeName ?? "-"} - ${invoice.cardCategoryName ?? ""}`} />
              <InfoItem title={t("invoices.quantity")} value={invoice.quantity} />
              <InfoItem title={t("invoices.basePrice")} value={formatCurrency(invoice.basePrice)} />
              <InfoItem title={t("invoices.discount")} value={formatCurrency(invoice.discountAmount)} />
              <InfoItem title={t("invoices.unitPrice")} value={formatCurrency(invoice.unitPrice)} />
              <InfoItem title={t("invoices.total")} value={formatCurrency(invoice.totalPrice)} />
              <InfoItem title={t("invoices.balance")} value={`${formatCurrency(invoice.balanceBefore)} → ${formatCurrency(invoice.balanceAfter)}`} />
              {invoice.isDeleted && (
                <>
                  <InfoItem title={t("invoices.deletedBy")} value={`${invoice.deletedByName ?? "-"} - ${date(invoice.deletedAt)}`} />
                  <InfoItem title={t("invoices.deleteReason")} value={invoice.deleteReason ?? "-"} />
                </>
              )}
            </div>
            <div>
              <h4 className="list-header-title mb-3">{t("invoices.cards")}</h4>
              <div className="space-y-2">
                {invoice.items.map((item) => (
                  <div key={item.cardId} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
                    <span className="font-mono">{item.serialNumber}</span>
                    <span className="text-sm">{formatCurrency(item.unitPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InvoiceDetailsModal;
