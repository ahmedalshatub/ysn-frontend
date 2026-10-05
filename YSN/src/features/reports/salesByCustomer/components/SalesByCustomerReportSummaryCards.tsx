import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import type { SalesByCustomerReportSummaryDto } from "../types/SalesByCustomerReport.types";

interface SalesByCustomerReportSummaryCardsProps {
  summary?: SalesByCustomerReportSummaryDto;
}

const SalesByCustomerReportSummaryCards = ({ summary }: SalesByCustomerReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.salesByCustomer.customersCount")} value={summary.customersCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.salesByCustomer.invoicesCount")} value={summary.invoicesCount} variant="dark" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.salesByCustomer.cardsCount")} value={summary.cardsCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.salesByCustomer.baseTotal")} value={formatCurrency(summary.baseTotal)} variant="dark" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.salesByCustomer.discountTotal")} value={formatCurrency(summary.discountTotal)} variant="danger" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.salesByCustomer.salesTotal")} value={formatCurrency(summary.salesTotal)} variant="success" />
    </div>
  );
};

export default SalesByCustomerReportSummaryCards;
