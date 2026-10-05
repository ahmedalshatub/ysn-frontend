import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import type { CardsSoldReportSummaryDto } from "../types/CardsSoldReport.types";

interface CardsSoldReportSummaryCardsProps {
  summary?: CardsSoldReportSummaryDto;
}

const CardsSoldReportSummaryCards = ({ summary }: CardsSoldReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<LayersIcon />} label={t("reports.cardsSold.cardsCount")} value={summary.cardsCount} variant="dark" />
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.cardsSold.invoicesCount")} value={summary.invoicesCount} variant="info" />
      <MiniStatCard icon={<UsersIcon />} label={t("reports.cardsSold.customersCount")} value={summary.customersCount} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("reports.cardsSold.total")} value={formatCurrency(summary.total)} variant="success" />
    </div>
  );
};

export default CardsSoldReportSummaryCards;
