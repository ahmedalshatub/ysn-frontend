import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import ArrowUpDownIcon from "../../../../assets/icons/ArrowUpDownIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import AlertCircleIcon from "../../../../assets/icons/AlertCircleIcon";
import XCircleIcon from "../../../../assets/icons/XCircleIcon";
import MinusCircleIcon from "../../../../assets/icons/MinusCircleIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import type { EPaymentsReportSummaryDto } from "../types/EPaymentsReport.types";

interface EPaymentsReportSummaryCardsProps {
  summary?: EPaymentsReportSummaryDto;
}

const EPaymentsReportSummaryCards = ({ summary }: EPaymentsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("reports.ePayments.paymentsCount")} value={summary.paymentsCount} variant="dark" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.paymentsTotal")} value={formatCurrency(summary.paymentsTotal)} variant="dark" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.ePayments.completedCount")} value={summary.completedCount} variant="success" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.completedTotal")} value={formatCurrency(summary.completedTotal)} variant="success" />
      <MiniStatCard icon={<AlertCircleIcon />} label={t("reports.ePayments.pendingCount")} value={summary.pendingCount} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.pendingTotal")} value={formatCurrency(summary.pendingTotal)} variant="warning" />
      <MiniStatCard icon={<XCircleIcon />} label={t("reports.ePayments.failedCount")} value={summary.failedCount} variant="danger" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.failedTotal")} value={formatCurrency(summary.failedTotal)} variant="danger" />
      <MiniStatCard icon={<MinusCircleIcon />} label={t("reports.ePayments.cancelledCount")} value={summary.cancelledCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.cancelledTotal")} value={formatCurrency(summary.cancelledTotal)} variant="info" />
      <MiniStatCard icon={<TrashIcon />} label={t("reports.ePayments.deletedCount")} value={summary.deletedCount} variant="primary" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.ePayments.deletedTotal")} value={formatCurrency(summary.deletedTotal)} variant="primary" />
    </div>
  );
};

export default EPaymentsReportSummaryCards;
