import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import type { TransactionReversalsReportSummaryDto } from "../types/TransactionReversalsReport.types";

interface TransactionReversalsReportSummaryCardsProps {
  summary?: TransactionReversalsReportSummaryDto;
}

const TransactionReversalsReportSummaryCards = ({ summary }: TransactionReversalsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<TrashIcon />} label={t("reports.transactionReversals.deletedCount")} value={summary.deletedCount} variant="danger" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.transactionReversals.deletedTotal")} value={formatCurrency(summary.deletedTotal)} variant="dark" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.transactionReversals.reversedCount")} value={summary.reversedCount} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.transactionReversals.reversedTotal")} value={formatCurrency(summary.reversedTotal)} variant="primary" />
    </div>
  );
};

export default TransactionReversalsReportSummaryCards;
