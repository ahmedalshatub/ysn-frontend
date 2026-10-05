import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import type { SalesByCardTypeReportSummaryDto } from "../types/SalesByCardTypeReport.types";

interface SalesByCardTypeReportSummaryCardsProps {
  summary?: SalesByCardTypeReportSummaryDto;
}

const SalesByCardTypeReportSummaryCards = ({ summary }: SalesByCardTypeReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<LayersIcon />} label={t("reports.salesByCardType.cardTypesCount")} value={summary.cardTypesCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.salesByCardType.invoicesCount")} value={summary.invoicesCount} variant="dark" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.salesByCardType.cardsCount")} value={summary.cardsCount} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.salesByCardType.baseTotal")} value={formatCurrency(summary.baseTotal)} variant="dark" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("reports.salesByCardType.discountTotal")} value={formatCurrency(summary.discountTotal)} variant="danger" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.salesByCardType.salesTotal")} value={formatCurrency(summary.salesTotal)} variant="success" />
    </div>
  );
};

export default SalesByCardTypeReportSummaryCards;
