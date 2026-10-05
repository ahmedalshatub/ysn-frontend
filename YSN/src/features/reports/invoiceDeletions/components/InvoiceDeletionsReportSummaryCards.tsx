import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import PackageIcon from "../../../../assets/icons/PackageIcon";
import Undo2Icon from "../../../../assets/icons/Undo2Icon";
import type { InvoiceDeletionsReportSummaryDto } from "../types/InvoiceDeletionsReport.types";

interface InvoiceDeletionsReportSummaryCardsProps {
  summary?: InvoiceDeletionsReportSummaryDto;
}

const InvoiceDeletionsReportSummaryCards = ({ summary }: InvoiceDeletionsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<FileTextIcon />} label={t("reports.invoiceDeletions.invoicesCount")} value={summary.invoicesCount} variant="danger" />
      <MiniStatCard icon={<PackageIcon />} label={t("reports.invoiceDeletions.cardsCount")} value={summary.cardsCount} variant="dark" />
      <MiniStatCard icon={<Undo2Icon />} label={t("reports.invoiceDeletions.refundedTotal")} value={formatCurrency(summary.refundedTotal)} variant="warning" />
    </div>
  );
};

export default InvoiceDeletionsReportSummaryCards;
