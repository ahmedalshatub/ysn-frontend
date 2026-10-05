import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import Users2Icon from "../../../../assets/icons/Users2Icon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import ArrowLeftRightIcon from "../../../../assets/icons/ArrowLeftRightIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import type { AgentPerformanceReportSummaryDto } from "../types/AgentPerformanceReport.types";

interface AgentPerformanceReportSummaryCardsProps {
  summary?: AgentPerformanceReportSummaryDto;
}

const AgentPerformanceReportSummaryCards = ({ summary }: AgentPerformanceReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.agentPerformance.agentsCount")} value={summary.agentsCount} variant="dark" />
      <MiniStatCard icon={<Users2Icon />} label={t("reports.agentPerformance.subAgentsCount")} value={summary.subAgentsCount} variant="info" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.agentPerformance.agentPurchasesTotal")} value={formatCurrency(summary.agentPurchasesTotal)} variant="primary" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.agentPerformance.subAgentsPurchasesTotal")} value={formatCurrency(summary.subAgentsPurchasesTotal)} variant="success" />
      <MiniStatCard icon={<ArrowLeftRightIcon />} label={t("reports.agentPerformance.agentTransfersSentTotal")} value={formatCurrency(summary.agentTransfersSentTotal)} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.agentPerformance.totalBalance")} value={formatCurrency(summary.totalBalance)} variant="dark" />
    </div>
  );
};

export default AgentPerformanceReportSummaryCards;
