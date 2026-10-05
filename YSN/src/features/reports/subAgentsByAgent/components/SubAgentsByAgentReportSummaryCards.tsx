import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import UserIcon from "../../../../assets/icons/UserIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import ArrowLeftRightIcon from "../../../../assets/icons/ArrowLeftRightIcon";
import type { SubAgentsByAgentReportSummaryDto } from "../types/SubAgentsByAgentReport.types";

interface SubAgentsByAgentReportSummaryCardsProps {
  summary?: SubAgentsByAgentReportSummaryDto;
}

const SubAgentsByAgentReportSummaryCards = ({ summary }: SubAgentsByAgentReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<UserIcon />} label={t("reports.subAgentsByAgent.agentsCount")} value={summary.agentsCount} variant="dark" />
      <MiniStatCard icon={<UsersIcon />} label={t("reports.subAgentsByAgent.subAgentsCount")} value={summary.subAgentsCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.subAgentsByAgent.totalBalance")} value={formatCurrency(summary.totalBalance)} variant="primary" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.subAgentsByAgent.purchases")} value={formatCurrency(summary.purchasesTotal)} variant="warning" />
      <MiniStatCard
        icon={<ArrowLeftRightIcon />}
        label={t("reports.subAgentsByAgent.transfersReceivedTotal")}
        value={formatCurrency(summary.agentTransfersReceivedTotal)}
        variant="success"
      />
    </div>
  );
};

export default SubAgentsByAgentReportSummaryCards;
