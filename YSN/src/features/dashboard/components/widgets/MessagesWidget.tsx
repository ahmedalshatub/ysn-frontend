import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import { useGetMessagesCountQuery } from "../../../messages/api/Messages.api";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const MessagesWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const filter = { ...rangeFilter(range), isDeleted: false };
  const { data: sent = 0, isFetching } = useGetMessagesCountQuery(filter);
  const { data: read = 0 } = useGetMessagesCountQuery({ ...filter, isRead: true });
  const open = (isRead?: boolean) => navigate(withQuery("/messages", { ...rangeFilter(range), isRead }));

  return (
    <DashboardWidget title={t("dashboard.messages")} loading={isFetching}>
      <div className="grid grid-cols-2 gap-3">
        <DashboardStat label={t("dashboard.messagesSent")} value={sent} variant="primary" onClick={() => open()} />
        <DashboardStat label={t("dashboard.readRate")} value={`${sent ? Math.round((read / sent) * 100) : 0}%`} variant="success" onClick={() => open(true)} />
      </div>
    </DashboardWidget>
  );
};

export default MessagesWidget;
