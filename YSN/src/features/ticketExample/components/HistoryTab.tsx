import { useTranslation } from "react-i18next";
import Timeline from "../../../shared/components/display/Timeline";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import type { TicketHistoryItem } from "../types/ticketData";
import { formatDateTime } from "../types/ticketUtils";

interface HistoryTabProps {
  history: TicketHistoryItem[];
}

type TimelineColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "dark";

const actionStyle = (
  action: string,
): { icon: React.ReactNode; color: TimelineColor } => {
  switch (action) {
    case "created":
      return { icon: <CheckCircleIcon className="w-4 h-4" />, color: "success" };
    case "assigned":
      return { icon: <UsersIcon className="w-4 h-4" />, color: "info" };
    case "status_changed":
      return { icon: <RefreshCwIcon className="w-4 h-4" />, color: "primary" };
    case "priority_changed":
      return { icon: <AlertIcon className="w-4 h-4" />, color: "warning" };
    case "comment":
      return { icon: <FileTextIcon className="w-4 h-4" />, color: "secondary" };
    default:
      return { icon: <CalendarIcon className="w-4 h-4" />, color: "dark" };
  }
};

const HistoryTab = ({ history }: HistoryTabProps) => {
  const { t } = useTranslation();

  if (history.length === 0) {
    return <p className="ce-muted text-sm">{t("ticketExample.noHistory")}</p>;
  }

  const items = [...history].reverse().map((entry) => {
    const { icon, color } = actionStyle(entry.action);
    return {
      id: String(entry.id),
      title: entry.description,
      description: entry.performedBy,
      date: formatDateTime(entry.performedAt),
      icon,
      color,
    };
  });

  return <Timeline items={items} variant="filled" animated />;
};

export default HistoryTab;
