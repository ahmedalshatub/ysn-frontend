import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import { useGetUsersCountQuery } from "../../../users/api/Users.api";
import { rangeFilter } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const EmployeesWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { fromDate, toDate } = rangeFilter(range);
  const { data: total = 0, isFetching } = useGetUsersCountQuery({ isDeleted: false });
  const { data: active = 0 } = useGetUsersCountQuery({ isDeleted: false, isActive: true });
  const { data: signedIn = 0 } = useGetUsersCountQuery({ isDeleted: false, lastLoginFrom: fromDate, lastLoginTo: toDate });

  return (
    <DashboardWidget title={t("dashboard.employees")} loading={isFetching}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <DashboardStat label={t("dashboard.employeesTotal")} value={total} variant="primary" />
        <DashboardStat label={t("dashboard.employeesActive")} value={active} variant="success" />
        <DashboardStat label={t("dashboard.employeesSignedIn")} value={signedIn} variant="info" />
      </div>
    </DashboardWidget>
  );
};

export default EmployeesWidget;
