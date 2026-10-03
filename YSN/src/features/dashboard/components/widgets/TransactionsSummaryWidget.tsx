import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import TrendUpIcon from "../../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../../assets/icons/TrendDownIcon";
import ArrowUpDownIcon from "../../../../assets/icons/ArrowUpDownIcon";
import WalletIcon from "../../../../assets/icons/WalletIcon";
import { useGetTransactionStatsQuery } from "../../../transactions/api/Transactions.api";
import { TransactionType } from "../../../transactions/types/Transactions.types";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const TransactionsSummaryWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching } = useGetTransactionStatsQuery(rangeFilter(range));
  const open = (type: number) => navigate(withQuery("/transactions", { ...rangeFilter(range), type }));
  const withCount = (total: number, count: number) => `${formatCurrency(total)} (${count})`;

  return (
    <DashboardWidget title={t("dashboard.transactionsSummary")} loading={isFetching && !data} empty={!data}>
      {data && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DashboardStat icon={<TrendUpIcon />} label={t("transactionTypes.deposit")} value={withCount(data.depositsTotal, data.depositsCount)} variant="success" onClick={() => open(TransactionType.Deposit)} />
          <DashboardStat icon={<TrendDownIcon />} label={t("transactionTypes.withdraw")} value={withCount(data.withdrawsTotal, data.withdrawsCount)} variant="danger" onClick={() => open(TransactionType.Withdraw)} />
          <DashboardStat icon={<ArrowUpDownIcon />} label={t("transactionTypes.agentDeposit")} value={withCount(data.agentDepositsTotal, data.agentDepositsCount)} variant="info" onClick={() => open(TransactionType.AgentDeposit)} />
          <DashboardStat icon={<WalletIcon />} label={t("transactionTypes.ePayment")} value={withCount(data.ePaymentsTotal, data.ePaymentsCount)} variant="primary" onClick={() => open(TransactionType.EPayment)} />
        </div>
      )}
    </DashboardWidget>
  );
};

export default TransactionsSummaryWidget;
