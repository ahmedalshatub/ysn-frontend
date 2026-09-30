import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import BarChart from "../../../shared/components/charts/BarChart";
import AreaChart from "../../../shared/components/charts/AreaChart";
import LineChart from "../../../shared/components/charts/LineChart";
import DoughnutChart from "../../../shared/components/charts/DoughnutChart";
import {
  monthlySalesData,
  monthlyOrdersData,
  ordersCategoryData,
  salesTrendData,
} from "../types/profileData";

const ChartsTab = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card variant="bordered" padding="md" title={t("profileExample.monthlySales")} fullHeight>
        <BarChart
          labels={monthlySalesData.labels}
          datasets={[
            {
              label: t("profileExample.monthlySales"),
              data: monthlySalesData.values,
              variant: "primary",
              borderRadius: 4,
            },
          ]}
          height={280}
          showLegend={false}
          showGrid
        />
      </Card>

      <Card variant="bordered" padding="md" title={t("profileExample.monthlyOrders")} fullHeight>
        <AreaChart
          labels={monthlyOrdersData.labels}
          datasets={[
            {
              label: t("profileExample.monthlyOrders"),
              data: monthlyOrdersData.values,
              variant: "success",
              tension: 0.4,
            },
          ]}
          height={280}
          showLegend={false}
          showGrid
        />
      </Card>

      <Card variant="bordered" padding="md" title={t("profileExample.salesTrend")} fullHeight>
        <LineChart
          labels={salesTrendData.labels}
          datasets={[
            {
              label: String(year),
              data: salesTrendData.current,
              variant: "primary",
              tension: 0.3,
            },
            {
              label: String(year - 1),
              data: salesTrendData.previous,
              variant: "info",
              borderDash: [6, 4],
              tension: 0.3,
            },
          ]}
          height={280}
          showLegend
          showGrid
        />
      </Card>

      <Card
        variant="bordered"
        padding="md"
        title={t("profileExample.ordersDistribution")}
        fullHeight
      >
        <DoughnutChart
          labels={ordersCategoryData.map((item) => item.label)}
          data={ordersCategoryData.map((item) => item.value)}
          height={280}
          showLegend
          legendPosition="bottom"
          cutout="65%"
        />
      </Card>
    </div>
  );
};

export default ChartsTab;
