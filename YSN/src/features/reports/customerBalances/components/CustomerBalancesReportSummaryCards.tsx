import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendUpIcon from "../../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import type { CustomerBalancesReportSummaryDto } from "../types/CustomerBalancesReport.types";

interface CustomerBalancesReportSummaryCardsProps {
  summary?: CustomerBalancesReportSummaryDto;
}

const CustomerBalancesReportSummaryCards = ({ summary }: CustomerBalancesReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.customerBalances.customersCount")} value={summary.customersCount} variant="dark" />
      <MiniStatCard icon={<UsersIcon />} label={t("reports.customerBalances.withBalanceCount")} value={summary.withBalanceCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.customerBalances.totalBalance")} value={formatCurrency(summary.totalBalance)} variant="primary" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.customerBalances.agentsBalance")} value={formatCurrency(summary.agentsBalance)} variant="dark" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.customerBalances.subAgentsBalance")} value={formatCurrency(summary.subAgentsBalance)} variant="dark" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.customerBalances.clientsBalance")} value={formatCurrency(summary.clientsBalance)} variant="dark" />
      <MiniStatCard icon={<TrendUpIcon />} label={t("reports.customerBalances.periodCredit")} value={formatCurrency(summary.periodCredit)} variant="success" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.customerBalances.periodDebit")} value={formatCurrency(summary.periodDebit)} variant="danger" />
    </div>
  );
};

export default CustomerBalancesReportSummaryCards;
