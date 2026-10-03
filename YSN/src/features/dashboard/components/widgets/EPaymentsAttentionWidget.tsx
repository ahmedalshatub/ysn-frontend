import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import DashboardRow from "../DashboardRow";
import { useGetTransactionStatsQuery, useGetTransactionsQuery } from "../../../transactions/api/Transactions.api";
import { TransactionStatus, TransactionType } from "../../../transactions/types/Transactions.types";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const EPaymentsAttentionWidget = ({ range }: DashboardWidgetProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: stats } = useGetTransactionStatsQuery(rangeFilter(range));
  const { data: pending, isFetching } = useGetTransactionsQuery({
    ...rangeFilter(range),
    type: TransactionType.EPayment,
    status: TransactionStatus.Pending,
    pageNumber: 1,
    pageSize: 5,
    sortBy: "createdAt",
    isAscending: false,
  });
  const open = (status: number) => navigate(withQuery("/transactions", { ...rangeFilter(range), type: TransactionType.EPayment, status }));
  const items = pending?.items ?? [];

  return (
    <DashboardWidget title={t("dashboard.ePaymentsAttention")} loading={isFetching && !pending}>
      <div className="mb-3 grid grid-cols-2 gap-3">
        <DashboardStat label={t("transactions.pendingEPayments")} value={stats?.pendingEPaymentsCount ?? 0} variant="warning" onClick={() => open(TransactionStatus.Pending)} />
        <DashboardStat label={t("transactions.failedEPayments")} value={stats?.failedEPaymentsCount ?? 0} variant="danger" onClick={() => open(TransactionStatus.Failed)} />
      </div>
      {items.length > 0 ? (
        <div className="divide-y ce-divider">
          {items.map((item) => (
            <DashboardRow
              key={item.id}
              title={item.customerName ?? "-"}
              subtitle={formatDate(item.createdAt, { locale: i18n.language })}
              values={[formatCurrency(item.amount)]}
              onClick={() => open(TransactionStatus.Pending)}
            />
          ))}
        </div>
      ) : (
        <p className="py-4 text-center text-sm ce-muted">{t("dashboard.noPendingEPayments")}</p>
      )}
    </DashboardWidget>
  );
};

export default EPaymentsAttentionWidget;
