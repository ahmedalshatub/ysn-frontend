import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import LineChart from "../../../../shared/components/charts/LineChart";
import { useGetTransactionDailyTotalsQuery } from "../../../transactions/api/Transactions.api";
import { TransactionType } from "../../../transactions/types/Transactions.types";
import { dailyValues, rangeDays, rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const MoneyInChartWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetTransactionDailyTotalsQuery(rangeFilter(range));
  const days = rangeDays(range);
  const series = (type: number) => dailyValues(days, data, (row) => row.amount, (row) => row.type === type);

  return (
    <DashboardWidget
      title={t("dashboard.moneyInChart")}
      loading={isFetching && !data.length}
      empty={!data.length}
      onOpen={() => navigate(withQuery("/transactions", rangeFilter(range)))}
    >
      <LineChart
        labels={days.map((day) => day.slice(5))}
        height={260}
        datasets={[
          { label: t("transactionTypes.deposit"), data: series(TransactionType.Deposit), variant: "success", fill: true },
          { label: t("transactionTypes.ePayment"), data: series(TransactionType.EPayment), variant: "primary", fill: true },
        ]}
      />
    </DashboardWidget>
  );
};

export default MoneyInChartWidget;
