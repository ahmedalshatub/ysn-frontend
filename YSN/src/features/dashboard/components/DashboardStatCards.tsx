import { useTranslation } from "react-i18next";
import StatCard from "../../../shared/components/cards/StatCard";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import UsersIcon from "../../../assets/icons/UsersIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import { useGetCustomerStatsQuery } from "../../customers/api/Customers.api";
import { useGetInvoiceStatsQuery } from "../../invoices/api/Invoices.api";
import { useGetTransactionStatsQuery } from "../../transactions/api/Transactions.api";
import { useGetCardStatsQuery } from "../../cards/api/Cards.api";
import { rangeFilter } from "../utils/dashboardDates";
import type { DashboardWidgetProps } from "../types/Dashboard.types";

const DashboardStatCards = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const filter = rangeFilter(range);
  const canCustomers = can(Permission.AgentsView) || can(Permission.SubAgentsView) || can(Permission.ClientsView);
  const canInvoices = can(Permission.InvoicesView);
  const canTransactions = can(Permission.TransactionsView);
  const canCards = can(Permission.CardsView);

  const { data: customers = [] } = useGetCustomerStatsQuery({ cityId: range.cityId, isDeleted: false }, { skip: !canCustomers, refetchOnMountOrArgChange: true });
  const { data: invoices } = useGetInvoiceStatsQuery({ ...filter, isDeleted: false }, { skip: !canInvoices, refetchOnMountOrArgChange: true });
  const { data: transactions } = useGetTransactionStatsQuery(filter, { skip: !canTransactions, refetchOnMountOrArgChange: true });
  const { data: cards } = useGetCardStatsQuery({ cityId: range.cityId, isDeleted: false }, { skip: !canCards, refetchOnMountOrArgChange: true });

  const customersTotal = customers.reduce((sum, item) => sum + item.totalCount, 0);
  const balanceTotal = customers.reduce((sum, item) => sum + (item.balanceTotal ?? 0), 0);
  const moneyIn = (transactions?.depositsTotal ?? 0) + (transactions?.ePaymentsTotal ?? 0);

  const stats = [
    canCustomers && { key: "customers", title: t("dashboard.customersSummary"), value: customersTotal, icon: <UsersIcon className="h-5 w-5" />, variant: "primary" as const },
    canCustomers && canTransactions && { key: "balances", title: t("dashboard.balances"), value: formatCurrency(balanceTotal), icon: <WalletIcon className="h-5 w-5" />, variant: "info" as const },
    canInvoices && { key: "sales", title: t("dashboard.salesTotal"), value: formatCurrency(invoices?.salesTotal ?? 0), icon: <ShoppingCartIcon className="h-5 w-5" />, variant: "success" as const },
    canInvoices && { key: "cardsSold", title: t("dashboard.cardsSold"), value: invoices?.cardsSold ?? 0, icon: <LayersIcon className="h-5 w-5" />, variant: "warning" as const },
    canTransactions && { key: "moneyIn", title: t("dashboard.moneyIn"), value: formatCurrency(moneyIn), icon: <TrendUpIcon className="h-5 w-5" />, variant: "success" as const },
    canCards && { key: "available", title: t("dashboard.cardsAvailable"), value: cards?.availableCount ?? 0, icon: <PackageIcon className="h-5 w-5" />, variant: "primary" as const },
  ].filter((item) => !!item);

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.key} title={stat.title} value={stat.value} icon={stat.icon} variant={stat.variant} />
      ))}
    </div>
  );
};

export default DashboardStatCards;
