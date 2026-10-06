import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import XCircleIcon from "../../../../assets/icons/XCircleIcon";
import TriangleAlertIcon from "../../../../assets/icons/TriangleAlertIcon";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import type { TvSubscriptionsEndingReportSummaryDto } from "../types/TvSubscriptionsEndingReport.types";

interface TvSubscriptionsEndingReportSummaryCardsProps {
  summary?: TvSubscriptionsEndingReportSummaryDto;
}

const TvSubscriptionsEndingReportSummaryCards = ({ summary }: TvSubscriptionsEndingReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<MonitorIcon />} label={t("reports.tvSubscriptionsEnding.tvsCount")} value={summary.tvsCount} variant="dark" />
      <MiniStatCard icon={<XCircleIcon />} label={t("reports.tvSubscriptionsEnding.endedCount")} value={summary.endedCount} variant="danger" />
      <MiniStatCard icon={<TriangleAlertIcon />} label={t("reports.tvSubscriptionsEnding.firstWeekCount")} value={summary.firstWeekCount} variant="warning" />
      <MiniStatCard icon={<CalendarIcon />} label={t("reports.tvSubscriptionsEnding.secondWeekCount")} value={summary.secondWeekCount} variant="info" />
      <MiniStatCard icon={<CalendarIcon />} label={t("reports.tvSubscriptionsEnding.thirdWeekCount")} value={summary.thirdWeekCount} variant="info" />
      <MiniStatCard icon={<CalendarIcon />} label={t("reports.tvSubscriptionsEnding.fourthWeekCount")} value={summary.fourthWeekCount} variant="primary" />
      <MiniStatCard icon={<CalendarIcon />} label={t("reports.tvSubscriptionsEnding.laterCount")} value={summary.laterCount} variant="success" />
      <MiniStatCard icon={<UsersIcon />} label={t("reports.tvSubscriptionsEnding.withoutCustomersCount")} value={summary.withoutCustomersCount} variant="dark" />
    </div>
  );
};

export default TvSubscriptionsEndingReportSummaryCards;
