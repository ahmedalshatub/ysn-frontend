import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import MapPinIcon from "../../../../assets/icons/MapPinIcon";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import LinkIcon from "../../../../assets/icons/LinkIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../../assets/icons/XCircleIcon";
import MinusCircleIcon from "../../../../assets/icons/MinusCircleIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import RefreshCcwIcon from "../../../../assets/icons/RefreshCcwIcon";
import type { TvsByCityReportSummaryDto } from "../types/TvsByCityReport.types";

interface TvsByCityReportSummaryCardsProps {
  summary?: TvsByCityReportSummaryDto;
}

const TvsByCityReportSummaryCards = ({ summary }: TvsByCityReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<MapPinIcon />} label={t("reports.tvsByCity.citiesCount")} value={summary.citiesCount} variant="dark" />
      <MiniStatCard icon={<MonitorIcon />} label={t("reports.tvsByCity.tvsCount")} value={summary.tvsCount} variant="primary" />
      <MiniStatCard icon={<LinkIcon />} label={t("reports.tvsByCity.linkedCount")} value={summary.linkedCount} variant="info" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.tvsByCity.activeCount")} value={summary.activeCount} variant="success" />
      <MiniStatCard icon={<XCircleIcon />} label={t("reports.tvsByCity.endedCount")} value={summary.endedCount} variant="danger" />
      <MiniStatCard icon={<MinusCircleIcon />} label={t("reports.tvsByCity.neverActivatedCount")} value={summary.neverActivatedCount} variant="warning" />
      <MiniStatCard icon={<ZapIcon />} label={t("reports.tvsByCity.activationsCount")} value={summary.activationsCount} variant="primary" />
      <MiniStatCard icon={<PlusIcon />} label={t("reports.tvsByCity.registrationsCount")} value={summary.registrationsCount} variant="info" />
      <MiniStatCard icon={<RefreshCcwIcon />} label={t("reports.tvsByCity.renewalsCount")} value={summary.renewalsCount} variant="success" />
    </div>
  );
};

export default TvsByCityReportSummaryCards;
