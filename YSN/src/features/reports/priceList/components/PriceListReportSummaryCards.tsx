import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import type { PriceListReportSummaryDto } from "../types/PriceListReport.types";

interface PriceListReportSummaryCardsProps {
  summary?: PriceListReportSummaryDto;
}

const PriceListReportSummaryCards = ({ summary }: PriceListReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<LayersIcon />} label={t("reports.priceList.cardTypesCount")} value={summary.cardTypesCount} variant="dark" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.priceList.activeCount")} value={summary.activeCount} variant="success" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.priceList.availableCount")} value={summary.availableCount} variant="info" />
    </div>
  );
};

export default PriceListReportSummaryCards;
