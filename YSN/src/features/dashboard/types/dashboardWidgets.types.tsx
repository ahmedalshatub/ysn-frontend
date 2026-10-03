import { Permission, type PermissionCode } from "../../../shared/types/Permissions.types";
import CustomersSummaryWidget from "../components/widgets/CustomersSummaryWidget";
import RegistrationsChartWidget from "../components/widgets/RegistrationsChartWidget";
import BalancesWidget from "../components/widgets/BalancesWidget";
import TransactionsSummaryWidget from "../components/widgets/TransactionsSummaryWidget";
import MoneyInChartWidget from "../components/widgets/MoneyInChartWidget";
import EPaymentsAttentionWidget from "../components/widgets/EPaymentsAttentionWidget";
import SalesSummaryWidget from "../components/widgets/SalesSummaryWidget";
import SalesChartWidget from "../components/widgets/SalesChartWidget";
import TopCardTypesWidget from "../components/widgets/TopCardTypesWidget";
import CardStockWidget from "../components/widgets/CardStockWidget";
import MessagesWidget from "../components/widgets/MessagesWidget";
import EmployeesWidget from "../components/widgets/EmployeesWidget";
import RecentActivityWidget from "../components/widgets/RecentActivityWidget";
import type { DashboardWidgetDefinition } from "./Dashboard.types";

type Can = (permission: PermissionCode) => boolean;

const anyCustomers = (can: Can) => can(Permission.AgentsView) || can(Permission.SubAgentsView) || can(Permission.ClientsView);

export const dashboardWidgets: DashboardWidgetDefinition[] = [
  { key: "customersSummary", isVisible: anyCustomers, component: CustomersSummaryWidget },
  { key: "balances", isVisible: (can) => anyCustomers(can) && can(Permission.TransactionsView), component: BalancesWidget },
  { key: "transactionsSummary", isVisible: (can) => can(Permission.TransactionsView), component: TransactionsSummaryWidget },
  { key: "salesSummary", isVisible: (can) => can(Permission.InvoicesView), component: SalesSummaryWidget },
  { key: "moneyInChart", wide: true, isVisible: (can) => can(Permission.TransactionsView), component: MoneyInChartWidget },
  { key: "salesChart", wide: true, isVisible: (can) => can(Permission.InvoicesView), component: SalesChartWidget },
  { key: "registrationsChart", wide: true, isVisible: anyCustomers, component: RegistrationsChartWidget },
  { key: "ePaymentsAttention", isVisible: (can) => can(Permission.TransactionsView), component: EPaymentsAttentionWidget },
  { key: "topCardTypes", isVisible: (can) => can(Permission.InvoicesView), component: TopCardTypesWidget },
  { key: "cardStock", isVisible: (can) => can(Permission.CardsView), component: CardStockWidget },
  { key: "messages", isVisible: (can) => can(Permission.MessagesView), component: MessagesWidget },
  { key: "employees", isVisible: (can) => can(Permission.UsersView), component: EmployeesWidget },
  { key: "recentActivity", isVisible: (can) => can(Permission.AuditLogsView), component: RecentActivityWidget },
];
