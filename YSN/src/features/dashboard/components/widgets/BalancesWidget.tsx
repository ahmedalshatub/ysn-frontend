import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardRow from "../DashboardRow";
import { useGetCustomerStatsQuery } from "../../../customers/api/Customers.api";
import { customerTypeConfigs, type CustomerTypeValue } from "../../../customers/types/Customers.types";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const BalancesWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetCustomerStatsQuery({ cityId: range.cityId, isDeleted: false });
  const total = data.reduce((sum, row) => sum + (row.balanceTotal ?? 0), 0);

  return (
    <DashboardWidget title={t("dashboard.balances")} loading={isFetching && !data.length} empty={!data.length}>
      <p className="mb-2 text-2xl font-bold ce-heading">{formatCurrency(total)}</p>
      <div className="divide-y ce-divider">
        {data.map((row) => {
          const config = customerTypeConfigs[row.userType as CustomerTypeValue];
          return (
            <DashboardRow
              key={row.userType}
              title={t(config.pluralKey)}
              values={[formatCurrency(row.balanceTotal)]}
              onClick={() => navigate(withQuery(config.route, { cityId: range.cityId }))}
            />
          );
        })}
      </div>
    </DashboardWidget>
  );
};

export default BalancesWidget;
