import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import WalletIcon from "../../../assets/icons/WalletIcon";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";
import ArrowUpDownIcon from "../../../assets/icons/ArrowUpDownIcon";
import { useGetTransactionStatsQuery } from "../api/Transactions.api";
import type { TransactionFilter } from "../types/Transactions.types";

interface TransactionStatsCardsProps {
  filter: TransactionFilter;
  refreshKey: number;
}

const TransactionStatsCards = ({ filter, refreshKey }: TransactionStatsCardsProps) => {
  const { t } = useTranslation();
  const { data } = useGetTransactionStatsQuery({ ...filter, refreshKey } as TransactionFilter, { refetchOnMountOrArgChange: true });

  if (!data) return null;

  const withCount = (total: number, count: number) => `${formatCurrency(total)} (${count})`;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {data.currentBalance !== null && (
        <MiniStatCard icon={<WalletIcon />} label={t("transactions.currentBalance")} value={formatCurrency(data.currentBalance)} variant="dark" />
      )}
      <MiniStatCard icon={<TrendUpIcon />} label={t("transactionTypes.deposit")} value={withCount(data.depositsTotal, data.depositsCount)} variant="success" />
      <MiniStatCard icon={<TrendDownIcon />} label={t("transactionTypes.withdraw")} value={withCount(data.withdrawsTotal, data.withdrawsCount)} variant="danger" />
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("transactionTypes.agentDeposit")} value={withCount(data.agentDepositsTotal, data.agentDepositsCount)} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("transactionTypes.ePayment")} value={withCount(data.ePaymentsTotal, data.ePaymentsCount)} variant="primary" />
      <MiniStatCard icon={<WalletIcon />} label={t("transactions.pendingEPayments")} value={data.pendingEPaymentsCount} variant="warning" />
      <MiniStatCard icon={<WalletIcon />} label={t("transactions.failedEPayments")} value={data.failedEPaymentsCount} variant="danger" />
      <MiniStatCard icon={<ArrowUpDownIcon />} label={t("transactions.netTotal")} value={formatCurrency(data.netTotal)} variant="dark" />
    </div>
  );
};

export default TransactionStatsCards;
