import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardRow from "../DashboardRow";
import { useGetTopCardTypesQuery } from "../../../invoices/api/Invoices.api";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const TopCardTypesWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetTopCardTypesQuery(rangeFilter(range));

  return (
    <DashboardWidget title={t("dashboard.topCardTypes")} loading={isFetching && !data.length} empty={!data.length}>
      <div className="divide-y ce-divider">
        {data.map((row) => (
          <DashboardRow
            key={row.cardTypeId}
            title={row.name ?? "-"}
            values={[t("dashboard.cardsCount", { count: row.count }), formatCurrency(row.total)]}
            onClick={() => navigate(withQuery("/invoices", { ...rangeFilter(range), cardTypeId: row.cardTypeId }))}
          />
        ))}
      </div>
    </DashboardWidget>
  );
};

export default TopCardTypesWidget;
