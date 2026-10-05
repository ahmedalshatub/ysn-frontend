import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendUpIcon from "../../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import ArrowUpDownIcon from "../../../../assets/icons/ArrowUpDownIcon";
import ArrowLeftRightIcon from "../../../../assets/icons/ArrowLeftRightIcon";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import type { DailyFinanceReportSummaryDto } from "../types/DailyFinanceReport.types";

interface DailyFinanceReportSummaryCardsProps {
  summary?: DailyFinanceReportSummaryDto;
}

const DailyFinanceReportSummaryCards = ({ summary }: DailyFinanceReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<CalendarIcon />} label={t("reports.dailyFinance.daysCount")} value={summary.daysCount} variant="dark" />
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("reports.dailyFinance.transactionsCount")} value={summary.transactionsCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.dailyFinance.invoicesCount")} value={summary.invoicesCount} variant="dark" />
      <MiniStatCard icon={<TrendUpIcon />} label={t("reports.dailyFinance.depositsTotal")} value={formatCurrency(summary.depositsTotal)} variant="success" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.dailyFinance.withdrawsTotal")} value={formatCurrency(summary.withdrawsTotal)} variant="danger" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.dailyFinance.ePaymentsTotal")} value={formatCurrency(summary.ePaymentsTotal)} variant="primary" />
      <MiniStatCard icon={<ArrowLeftRightIcon />} label={t("reports.dailyFinance.agentTransfersTotal")} value={formatCurrency(summary.agentTransfersTotal)} variant="info" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.dailyFinance.salesTotal")} value={formatCurrency(summary.salesTotal)} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.dailyFinance.netTotal")} value={formatCurrency(summary.netTotal)} variant="primary" />
    </div>
  );
};

export default DailyFinanceReportSummaryCards;
