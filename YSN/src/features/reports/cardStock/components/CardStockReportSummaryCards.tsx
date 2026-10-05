import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import MinusCircleIcon from "../../../../assets/icons/MinusCircleIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import type { CardStockReportSummaryDto } from "../types/CardStockReport.types";

interface CardStockReportSummaryCardsProps {
  summary?: CardStockReportSummaryDto;
}

const CardStockReportSummaryCards = ({ summary }: CardStockReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<LayersIcon />} label={t("reports.cardStock.cardTypesCount")} value={summary.cardTypesCount} variant="dark" />
      <MiniStatCard icon={<PlusIcon />} label={t("reports.cardStock.addedCount")} value={summary.addedCount} variant="info" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.cardStock.soldCount")} value={summary.soldCount} variant="success" />
      <MiniStatCard icon={<MinusCircleIcon />} label={t("reports.cardStock.disabledCount")} value={summary.disabledCount} variant="warning" />
      <MiniStatCard icon={<TrashIcon />} label={t("reports.cardStock.deletedCount")} value={summary.deletedCount} variant="danger" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.cardStock.availableCount")} value={summary.availableCount} variant="primary" />
    </div>
  );
};

export default CardStockReportSummaryCards;
