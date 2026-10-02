import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import InfoItem from "../../../shared/components/cards/InfoItem";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { useGetTransactionQuery } from "../api/Transactions.api";
import { transactionStatusKeys, transactionStatusVariants, transactionTypeKeys } from "../types/Transactions.types";

interface TransactionDetailsModalProps {
  open: boolean;
  transactionId: number;
  onClose: () => void;
}

const TransactionDetailsModal = ({ open, transactionId, onClose }: TransactionDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: transaction, isLoading } = useGetTransactionQuery(transactionId, { refetchOnMountOrArgChange: true });
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");
  const balances = (before: number | null, after: number | null) =>
    after === null ? "-" : `${formatCurrency(before)} → ${formatCurrency(after)}`;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("transactions.transaction")} #{transactionId}</h3>
        {isLoading || !transaction ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge label={t(transactionTypeKeys[transaction.type])} variant="info" size="sm" />
              <Badge label={t(transactionStatusKeys[transaction.status])} variant={transactionStatusVariants[transaction.status]} size="sm" />
              {transaction.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem title={t("transactions.amount")} value={formatCurrency(transaction.amount)} />
              <InfoItem title={t("transactions.description")} value={transaction.description} />
              <InfoItem title={t("transactions.customer")} value={transaction.customerName ?? "-"} />
              <InfoItem title={t("transactions.customerBalance")} value={balances(transaction.customerBalanceBefore, transaction.customerBalanceAfter)} />
              {transaction.sourceCustomerId && (
                <>
                  <InfoItem title={t("transactions.source")} value={transaction.sourceCustomerName ?? "-"} />
                  <InfoItem title={t("transactions.sourceBalance")} value={balances(transaction.sourceBalanceBefore, transaction.sourceBalanceAfter)} />
                </>
              )}
              <InfoItem title={t("transactions.createdAt")} value={date(transaction.createdAt)} />
              <InfoItem title={t("transactions.completedAt")} value={date(transaction.completedAt)} />
              <InfoItem title={t("transactions.createdBy")} value={transaction.creator || "-"} />
              {transaction.relatedTransactionId && (
                <InfoItem title={t("transactions.related")} value={`#${transaction.relatedTransactionId}`} />
              )}
              {transaction.paymentTransactionId && (
                <>
                  <InfoItem title={t("transactions.card")} value={transaction.maskedPan ?? "-"} />
                  <InfoItem title={t("transactions.gatewayStatus")} value={transaction.gatewayStatus ?? "-"} />
                </>
              )}
              {transaction.latitude !== null && transaction.longitude !== null && (
                <InfoItem
                  title={t("transactions.location")}
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
                  <InfoItem title={t("transactions.deletedBy")} value={`${transaction.deletedByName ?? "-"} - ${date(transaction.deletedAt)}`} />
                  <InfoItem title={t("transactions.deleteReason")} value={transaction.deleteReason || "-"} />
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
