import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import BarChart from "../../../../shared/components/charts/BarChart";
import { useGetCustomerDailyCountsQuery } from "../../../customers/api/Customers.api";
import { customerRoleConfigs } from "../../../customers/types/Customers.types";
import useVisibleCustomerTypes from "../../hooks/useVisibleCustomerTypes";
import { dailyValues, rangeDays, rangeFilter } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const RegistrationsChartWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const types = useVisibleCustomerTypes();
  const { data = [], isFetching } = useGetCustomerDailyCountsQuery({ ...rangeFilter(range), isDeleted: false });
  const days = rangeDays(range);
  const variants = ["primary", "info", "success"] as const;

  return (
    <DashboardWidget
      title={t("dashboard.registrationsChart")}
      loading={isFetching && !data.length}
      empty={!data.length}
    >
      <BarChart
        labels={days.map((day) => day.slice(5))}
        stacked
        height={260}
        datasets={types.map((type, index) => ({
          label: t(customerRoleConfigs[type].pluralKey),
          data: dailyValues(days, data, (row) => row.count, (row) => row.roleId === type),
          variant: variants[index % variants.length],
        }))}
      />
    </DashboardWidget>
  );
};

export default RegistrationsChartWidget;
