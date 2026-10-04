import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import type { ReportSummaryItem } from "../../types/Report.types";

interface ReportSummaryCardsProps {
  items: ReportSummaryItem[];
}

const ReportSummaryCards = ({ items }: ReportSummaryCardsProps) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
    {items.map((item) => (
      <MiniStatCard key={item.label} icon={item.icon} label={item.label} value={item.value} variant={item.variant} />
    ))}
  </div>
);

export default ReportSummaryCards;
