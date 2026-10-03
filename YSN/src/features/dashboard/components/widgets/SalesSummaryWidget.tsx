import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import { useGetInvoiceStatsQuery } from "../../../invoices/api/Invoices.api";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const SalesSummaryWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching } = useGetInvoiceStatsQuery(rangeFilter(range));
  const open = (isDeleted?: boolean) => navigate(withQuery("/invoices", { ...rangeFilter(range), isDeleted }));

  return (
    <DashboardWidget title={t("dashboard.salesSummary")} loading={isFetching && !data} empty={!data}>
      {data && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DashboardStat label={t("dashboard.invoices")} value={data.invoicesCount} variant="primary" onClick={() => open(false)} />
          <DashboardStat label={t("dashboard.cardsSold")} value={data.cardsSold} variant="info" onClick={() => open(false)} />
          <DashboardStat label={t("dashboard.salesTotal")} value={formatCurrency(data.salesTotal)} variant="success" onClick={() => open(false)} />
          <DashboardStat label={t("dashboard.refunded")} value={`${formatCurrency(data.refundedTotal)} (${data.deletedCount})`} variant="danger" onClick={() => open(true)} />
        </div>
      )}
    </DashboardWidget>
  );
};

export default SalesSummaryWidget;
