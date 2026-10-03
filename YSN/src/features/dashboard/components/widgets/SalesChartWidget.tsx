import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import BarChart from "../../../../shared/components/charts/BarChart";
import { useGetInvoiceDailyTotalsQuery } from "../../../invoices/api/Invoices.api";
import { dailyValues, rangeDays, rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const SalesChartWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetInvoiceDailyTotalsQuery(rangeFilter(range));
  const days = rangeDays(range);

  return (
    <DashboardWidget
      title={t("dashboard.salesChart")}
      loading={isFetching && !data.length}
      empty={!data.length}
      onOpen={() => navigate(withQuery("/invoices", rangeFilter(range)))}
    >
      <BarChart
        labels={days.map((day) => day.slice(5))}
        height={260}
        showLegend={false}
        datasets={[{ label: t("dashboard.salesTotal"), data: dailyValues(days, data, (row) => row.total), variant: "success" }]}
      />
    </DashboardWidget>
  );
};

export default SalesChartWidget;
