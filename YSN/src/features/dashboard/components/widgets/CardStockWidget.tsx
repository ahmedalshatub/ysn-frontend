import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardRow from "../DashboardRow";
import { useGetCardStatsByTypeQuery } from "../../../cards/api/Cards.api";
import { withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const CardStockWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetCardStatsByTypeQuery({ cityId: range.cityId, isDeleted: false });

  return (
    <DashboardWidget
      title={t("dashboard.cardStock")}
      loading={isFetching && !data.length}
      empty={!data.length}
    >
      <div className="divide-y ce-divider">
        {data.slice(0, 10).map((row) => (
          <DashboardRow
            key={row.cardTypeId}
            title={row.name ?? "-"}
            subtitle={[row.categoryName, row.cityName].filter(Boolean).join(" · ")}
            values={[
              t("dashboard.available", { count: row.availableCount }),
              t("dashboard.taken", { count: row.takenCount }),
              t("dashboard.disabled", { count: row.disabledCount }),
            ]}
            onClick={() => navigate(withQuery("/cards", { cardTypeId: row.cardTypeId }))}
          />
        ))}
      </div>
    </DashboardWidget>
  );
};

export default CardStockWidget;
