import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../../assets/icons/XCircleIcon";
import RefreshCwIcon from "../../../../assets/icons/RefreshCwIcon";
import TriangleAlertIcon from "../../../../assets/icons/TriangleAlertIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import RefreshCcwIcon from "../../../../assets/icons/RefreshCcwIcon";
import KeyIcon from "../../../../assets/icons/KeyIcon";
import BarChartIcon from "../../../../assets/icons/BarChartIcon";
import type { TvActivationsReportSummaryDto } from "../types/TvActivationsReport.types";

interface TvActivationsReportSummaryCardsProps {
  summary?: TvActivationsReportSummaryDto;
}

const TvActivationsReportSummaryCards = ({ summary }: TvActivationsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<MonitorIcon />} label={t("reports.tvActivations.activationsCount")} value={summary.activationsCount} variant="dark" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.tvActivations.completedCount")} value={summary.completedCount} variant="success" />
      <MiniStatCard icon={<XCircleIcon />} label={t("reports.tvActivations.failedCount")} value={summary.failedCount} variant="danger" />
      <MiniStatCard icon={<RefreshCwIcon />} label={t("reports.tvActivations.pendingCount")} value={summary.pendingCount} variant="warning" />
      <MiniStatCard icon={<TriangleAlertIcon />} label={t("reports.tvActivations.needsCheckingCount")} value={summary.needsCheckingCount} variant="warning" />
      <MiniStatCard icon={<PlusIcon />} label={t("reports.tvActivations.registrationsCount")} value={summary.registrationsCount} variant="primary" />
      <MiniStatCard icon={<RefreshCcwIcon />} label={t("reports.tvActivations.renewalsCount")} value={summary.renewalsCount} variant="info" />
      <MiniStatCard icon={<KeyIcon />} label={t("reports.tvActivations.typedCodeCount")} value={summary.typedCodeCount} variant="dark" />
      <MiniStatCard icon={<BarChartIcon />} label={t("reports.tvActivations.successRate")} value={`${summary.successRate}%`} variant="success" />
    </div>
  );
};

export default TvActivationsReportSummaryCards;
