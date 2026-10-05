import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import FolderIcon from "../../../../assets/icons/FolderIcon";
import UploadIcon from "../../../../assets/icons/UploadIcon";
import MinusCircleIcon from "../../../../assets/icons/MinusCircleIcon";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import type { CardImportsReportSummaryDto } from "../types/CardImportsReport.types";

interface CardImportsReportSummaryCardsProps {
  summary?: CardImportsReportSummaryDto;
}

const CardImportsReportSummaryCards = ({ summary }: CardImportsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<FolderIcon />} label={t("reports.cardImports.batchesCount")} value={summary.batchesCount} variant="dark" />
      <MiniStatCard icon={<UploadIcon />} label={t("reports.cardImports.added")} value={summary.addedCount} variant="primary" />
      <MiniStatCard icon={<MinusCircleIcon />} label={t("reports.cardImports.skipped")} value={summary.skippedCount} variant="warning" />
      <MiniStatCard icon={<ShoppingCartIcon />} label={t("reports.cardImports.sold")} value={summary.soldCount} variant="success" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.cardImports.available")} value={summary.availableCount} variant="info" />
    </div>
  );
};

export default CardImportsReportSummaryCards;
