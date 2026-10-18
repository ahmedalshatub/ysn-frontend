import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Button from "../../../shared/components/buttons/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import { showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import DetailItem from "../../../shared/components/cards/DetailItem";
import WalletIcon from "../../../assets/icons/WalletIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import AlertCircleIcon from "../../../assets/icons/AlertCircleIcon";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useGetTransactionQuery, usePrintTransactionMutation } from "../api/Transactions.api";
import { TransactionType, transactionStatusKeys, transactionStatusVariants, transactionTypeKeys, transactionTypeVariants } from "../types/Transactions.types";

interface TransactionDetailsModalProps {
  open: boolean;
  transactionId: number;
  onClose: () => void;
}

const TransactionDetailsModal = ({ open, transactionId, onClose }: TransactionDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: transaction, isLoading } = useGetTransactionQuery(transactionId, { refetchOnMountOrArgChange: true });
  const [printTransaction, { isLoading: isPrinting }] = usePrintTransactionMutation();

  const handlePrint = async () => {
    try {
      await printTransaction(transactionId).unwrap();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");
  const balances = (before: number | null, after: number | null) =>
    after === null ? "-" : `${formatCurrency(before)} → ${formatCurrency(after)}`;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="form-modal-title text-lg">{t("transactions.transaction")} #{transactionId}</h3>
          <Button variant="secondary" size="sm" label={t("common.print")} icon={<PrinterIcon className="w-4 h-4" />} iconPosition="left" loading={isPrinting} onClick={handlePrint} />
        </div>
        {isLoading || !transaction ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge label={t(transactionTypeKeys[transaction.type])} variant={transactionTypeVariants[transaction.type]} size="sm" />
              <Badge label={t(transactionStatusKeys[transaction.status])} variant={transactionStatusVariants[transaction.status]} size="sm" />
              {transaction.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
            </div>
            <div className="detail-grid detail-grid-compact">
              <DetailItem icon={<WalletIcon />} label={t("transactions.amount")} value={formatCurrency(transaction.amount)} />
              <DetailItem icon={<FileTextIcon />} label={t("transactions.description")} value={transaction.description || "-"} />
              <DetailItem icon={<UserIcon />} label={t("transactions.customer")} value={transaction.customerName ?? "-"} />
              <DetailItem icon={<WalletIcon />} label={t("transactions.customerBalance")} value={balances(transaction.customerBalanceBefore, transaction.customerBalanceAfter)} />
              {transaction.sourceCustomerId && (
                <>
                  <DetailItem icon={<UsersIcon />} label={t("transactions.source")} value={transaction.sourceCustomerName ?? "-"} />
                  <DetailItem icon={<WalletIcon />} label={t("transactions.sourceBalance")} value={balances(transaction.sourceBalanceBefore, transaction.sourceBalanceAfter)} />
                </>
              )}
              <DetailItem icon={<CalendarIcon />} label={t("transactions.createdAt")} value={date(transaction.createdAt)} />
              <DetailItem icon={<CheckCircleIcon />} label={t("transactions.completedAt")} value={date(transaction.completedAt)} />
              <DetailItem icon={<UserIcon />} label={t("transactions.createdBy")} value={transaction.creator || "-"} />
              {transaction.type === TransactionType.EPayment && (
                <>
                  <DetailItem icon={<KeyIcon />} label={t("transactions.card")} value={transaction.maskedPan || "-"} />
                  <DetailItem icon={<InfoIcon />} label={t("transactions.requestId")} value={transaction.requestId ?? "-"} />
                  <DetailItem icon={<LinkIcon />} label={t("transactions.referenceId")} value={transaction.referenceId ?? "-"} />
                </>
              )}
              {transaction.latitude !== null && transaction.longitude !== null && (
                <DetailItem
                  icon={<MapPinIcon />}
                  label={t("transactions.location")}
                  value={
                    <a
                      className="text-primary hover:underline"
                      href={`https://www.google.com/maps?q=${transaction.latitude},${transaction.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {transaction.latitude}, {transaction.longitude}
                    </a>
                  }
                />
              )}
              {transaction.isDeleted && (
                <>
                  <DetailItem icon={<TrashIcon />} label={t("transactions.deletedBy")} value={`${transaction.deletedByName ?? "-"} - ${date(transaction.deletedAt)}`} />
                  <DetailItem icon={<AlertCircleIcon />} label={t("transactions.deleteReason")} value={transaction.deleteReason || "-"} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal;
