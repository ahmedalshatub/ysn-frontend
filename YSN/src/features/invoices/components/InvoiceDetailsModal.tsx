import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Button from "../../../shared/components/buttons/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import { showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import DetailItem from "../../../shared/components/cards/DetailItem";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import ListOrderedIcon from "../../../assets/icons/ListOrderedIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import AlertCircleIcon from "../../../assets/icons/AlertCircleIcon";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useGetInvoiceQuery, usePrintInvoiceMutation } from "../api/Invoices.api";

interface InvoiceDetailsModalProps {
  open: boolean;
  invoiceId: number;
  onClose: () => void;
}

const InvoiceDetailsModal = ({ open, invoiceId, onClose }: InvoiceDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: invoice, isLoading } = useGetInvoiceQuery(invoiceId, { refetchOnMountOrArgChange: true });
  const [printInvoice, { isLoading: isPrinting }] = usePrintInvoiceMutation();

  const handlePrint = async () => {
    try {
      await printInvoice(invoiceId).unwrap();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="form-modal-title text-lg">{t("invoices.invoice")} #{invoiceId}</h3>
          <Button variant="secondary" size="sm" label={t("common.print")} icon={<PrinterIcon className="w-4 h-4" />} iconPosition="left" loading={isPrinting} onClick={handlePrint} />
        </div>
        {isLoading || !invoice ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            {invoice.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
            <div className="detail-grid detail-grid-compact">
              <DetailItem icon={<CalendarIcon />} label={t("invoices.date")} value={date(invoice.createdAt)} />
              <DetailItem icon={<UserIcon />} label={t("invoices.customer")} value={invoice.customerName ?? "-"} />
              <DetailItem icon={<PackageIcon />} label={t("cards.cardType")} value={`${invoice.cardTypeName ?? "-"} - ${invoice.cardCategoryName ?? ""}`} />
              <DetailItem icon={<ListOrderedIcon />} label={t("invoices.quantity")} value={invoice.quantity} />
              <DetailItem icon={<WalletIcon />} label={t("invoices.basePrice")} value={formatCurrency(invoice.basePrice)} />
              <DetailItem icon={<TrendDownIcon />} label={t("invoices.discount")} value={formatCurrency(invoice.discountAmount)} />
              <DetailItem icon={<WalletIcon />} label={t("invoices.unitPrice")} value={formatCurrency(invoice.unitPrice)} />
              <DetailItem icon={<ShoppingCartIcon />} label={t("invoices.total")} value={formatCurrency(invoice.totalPrice)} />
              <DetailItem icon={<WalletIcon />} label={t("invoices.balance")} value={`${formatCurrency(invoice.balanceBefore)} → ${formatCurrency(invoice.balanceAfter)}`} />
              {invoice.isDeleted && (
                <>
                  <DetailItem icon={<TrashIcon />} label={t("invoices.deletedBy")} value={`${invoice.deletedByName ?? "-"} - ${date(invoice.deletedAt)}`} />
                  <DetailItem icon={<AlertCircleIcon />} label={t("invoices.deleteReason")} value={invoice.deleteReason ?? "-"} />
                </>
              )}
            </div>
            <div>
              <h4 className="list-header-title mb-3">{t("invoices.cards")}</h4>
              <div>
                {invoice.items.map((item) => (
                  <div key={item.cardId} className="invoice-card-row">
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
