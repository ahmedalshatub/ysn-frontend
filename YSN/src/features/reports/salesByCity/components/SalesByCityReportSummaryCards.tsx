import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import MapPinIcon from "../../../../assets/icons/MapPinIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import type { SalesByCityReportSummaryDto } from "../types/SalesByCityReport.types";

interface SalesByCityReportSummaryCardsProps {
  summary?: SalesByCityReportSummaryDto;
}

const SalesByCityReportSummaryCards = ({ summary }: SalesByCityReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<MapPinIcon />} label={t("reports.salesByCity.citiesCount")} value={summary.citiesCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.salesByCity.invoicesCount")} value={summary.invoicesCount} variant="dark" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.salesByCity.cardsCount")} value={summary.cardsCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.salesByCity.baseTotal")} value={formatCurrency(summary.baseTotal)} variant="dark" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.salesByCity.discountTotal")} value={formatCurrency(summary.discountTotal)} variant="danger" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.salesByCity.salesTotal")} value={formatCurrency(summary.salesTotal)} variant="success" />
    </div>
  );
};

export default SalesByCityReportSummaryCards;
