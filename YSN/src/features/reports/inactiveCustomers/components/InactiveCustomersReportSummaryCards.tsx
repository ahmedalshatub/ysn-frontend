import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import LogInIcon from "../../../../assets/icons/LogInIcon";
import type { InactiveCustomersReportSummaryDto } from "../types/InactiveCustomersReport.types";

interface InactiveCustomersReportSummaryCardsProps {
  summary?: InactiveCustomersReportSummaryDto;
}

const InactiveCustomersReportSummaryCards = ({ summary }: InactiveCustomersReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.inactiveCustomers.customersCount")} value={summary.customersCount} variant="dark" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.inactiveCustomers.totalBalance")} value={formatCurrency(summary.totalBalance)} variant="primary" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.inactiveCustomers.neverPurchasedCount")} value={summary.neverPurchasedCount} variant="warning" />
      <MiniStatCard icon={<LogInIcon />} label={t("reports.inactiveCustomers.neverSignedInCount")} value={summary.neverSignedInCount} variant="danger" />
    </div>
  );
};

export default InactiveCustomersReportSummaryCards;
