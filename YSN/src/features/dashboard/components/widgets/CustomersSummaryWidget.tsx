import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardRow from "../DashboardRow";
import { useGetCustomerStatsQuery } from "../../../customers/api/Customers.api";
import { customerTypeConfigs, type CustomerTypeValue } from "../../../customers/types/Customers.types";
import { withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const CustomersSummaryWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetCustomerStatsQuery({ cityId: range.cityId, isDeleted: false });

  return (
    <DashboardWidget title={t("dashboard.customersSummary")} loading={isFetching && !data.length} empty={!data.length}>
      <div className="divide-y ce-divider">
        {data.map((row) => {
          const config = customerTypeConfigs[row.userType as CustomerTypeValue];
          return (
            <DashboardRow
              key={row.userType}
              title={t(config.pluralKey)}
              subtitle={t("dashboard.activeDisabled", { active: row.activeCount, disabled: row.disabledCount })}
              values={[String(row.totalCount)]}
              onClick={() => navigate(withQuery(config.route, { cityId: range.cityId }))}
            />
          );
        })}
      </div>
    </DashboardWidget>
  );
};

export default CustomersSummaryWidget;
