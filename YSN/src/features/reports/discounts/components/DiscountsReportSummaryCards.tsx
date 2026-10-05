import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import TrendUpIcon from "../../../../assets/icons/TrendUpIcon";
import type { DiscountsReportSummaryDto } from "../types/DiscountsReport.types";

interface DiscountsReportSummaryCardsProps {
  summary?: DiscountsReportSummaryDto;
}

const DiscountsReportSummaryCards = ({ summary }: DiscountsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.discounts.customersCount")} value={summary.customersCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.discounts.invoicesCount")} value={summary.invoicesCount} variant="info" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.discounts.cardsCount")} value={summary.cardsCount} variant="primary" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.discounts.baseTotal")} value={formatCurrency(summary.baseTotal)} variant="dark" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.discounts.discountTotal")} value={formatCurrency(summary.discountTotal)} variant="danger" />
      <MiniStatCard icon={<TrendUpIcon />} label={t("reports.discounts.paidTotal")} value={formatCurrency(summary.paidTotal)} variant="success" />
    </div>
  );
};

export default DiscountsReportSummaryCards;
