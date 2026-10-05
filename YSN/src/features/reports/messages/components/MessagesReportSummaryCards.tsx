import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import MailIcon from "../../../../assets/icons/MailIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import EyeOffIcon from "../../../../assets/icons/EyeOffIcon";
import BarChartIcon from "../../../../assets/icons/BarChartIcon";
import type { MessagesReportSummaryDto } from "../types/MessagesReport.types";

interface MessagesReportSummaryCardsProps {
  summary?: MessagesReportSummaryDto;
}

const MessagesReportSummaryCards = ({ summary }: MessagesReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<MailIcon />} label={t("reports.messages.messagesCount")} value={summary.messagesCount} variant="dark" />
      <MiniStatCard icon={<CheckCircleIcon />} label={t("reports.messages.readCount")} value={summary.readCount} variant="success" />
      <MiniStatCard icon={<EyeOffIcon />} label={t("reports.messages.unreadCount")} value={summary.unreadCount} variant="warning" />
      <MiniStatCard icon={<BarChartIcon />} label={t("reports.messages.readRate")} value={`${summary.readRate}%`} variant="info" />
    </div>
  );
};

export default MessagesReportSummaryCards;
