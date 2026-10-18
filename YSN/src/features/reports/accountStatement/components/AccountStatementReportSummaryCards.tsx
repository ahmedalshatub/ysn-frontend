import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendUpIcon from "../../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import ArrowUpDownIcon from "../../../../assets/icons/ArrowUpDownIcon";
import type { AccountStatementReportSummaryDto } from "../types/AccountStatementReport.types";

interface AccountStatementReportSummaryCardsProps {
  summary?: AccountStatementReportSummaryDto;
}

const AccountStatementReportSummaryCards = ({ summary }: AccountStatementReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<WalletIcon />} label={t("reports.accountStatement.openingBalance")} value={formatCurrency(summary.openingBalance)} variant="dark" />
      <MiniStatCard icon={<TrendUpIcon />} label={t("reports.accountStatement.totalIncrease")} value={formatCurrency(summary.totalIncrease)} variant="success" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.accountStatement.totalDecrease")} value={formatCurrency(summary.totalDecrease)} variant="danger" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.accountStatement.closingBalance")} value={formatCurrency(summary.closingBalance)} variant="primary" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.accountStatement.currentBalance")} value={formatCurrency(summary.currentBalance)} variant="info" />
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("reports.accountStatement.linesCount")} value={summary.linesCount} variant="dark" />
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("reports.accountStatement.notAppliedCount")} value={summary.notAppliedCount} variant="warning" />
    </div>
  );
};

export default AccountStatementReportSummaryCards;
