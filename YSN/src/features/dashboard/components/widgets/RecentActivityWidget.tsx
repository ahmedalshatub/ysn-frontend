import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardRow from "../DashboardRow";
import { useGetAllAuditLogsQuery } from "../../../auditLogs/api/AuditLogs.api";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const RecentActivityWidget = (_props: DashboardWidgetProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllAuditLogsQuery({ pageNumber: 1, pageSize: 10, sortBy: "createdAt", isAscending: false });
  const items = data?.items ?? [];

  return (
    <DashboardWidget title={t("dashboard.recentActivity")} loading={isFetching && !data} empty={!items.length}>
      <div className="divide-y ce-divider">
        {items.map((item) => (
          <DashboardRow
            key={item.id}
            title={`${item.userName ?? "-"} · ${item.action}`}
            subtitle={`${item.tableName}${item.recordId ? ` #${item.recordId}` : ""}`}
            values={[formatDate(item.createdAt, { locale: i18n.language })]}
            onClick={() => navigate("/audit-logs")}
          />
        ))}
      </div>
    </DashboardWidget>
  );
};

export default RecentActivityWidget;
