import { lazy } from "react";
import { Permission } from "../../shared/types/Permissions.types";


const NotFound = lazy(() => import("../../features/exceptions/pages/NotFound"));
const Login = lazy(() => import("../../features/auth/pages/login/Login"));
const OtpLogin = lazy(() => import("../../features/auth/pages/otp-login/OtpLogin"));
const ForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ForgotPassword"));
const ServerError = lazy(() => import("../../features/exceptions/pages/ServerError"));

const Dashboard = lazy(() => import("../../features/dashboard/pages/DashboardPage"));
const Profile = lazy(() => import("../../features/profile/pages/ProfilePage"));
const AccountStatementReport = lazy(() => import("../../features/reports/accountStatement/pages/AccountStatementReportPage"));
const CustomerBalancesReport = lazy(() => import("../../features/reports/customerBalances/pages/CustomerBalancesReportPage"));
const DailyFinanceReport = lazy(() => import("../../features/reports/dailyFinance/pages/DailyFinanceReportPage"));
const EPaymentsReport = lazy(() => import("../../features/reports/ePayments/pages/EPaymentsReportPage"));
const SalesByCardTypeReport = lazy(() => import("../../features/reports/salesByCardType/pages/SalesByCardTypeReportPage"));
const SalesByCustomerReport = lazy(() => import("../../features/reports/salesByCustomer/pages/SalesByCustomerReportPage"));
const SalesByCityReport = lazy(() => import("../../features/reports/salesByCity/pages/SalesByCityReportPage"));
const AgentPerformanceReport = lazy(() => import("../../features/reports/agentPerformance/pages/AgentPerformanceReportPage"));
const SubAgentsByAgentReport = lazy(() => import("../../features/reports/subAgentsByAgent/pages/SubAgentsByAgentReportPage"));
const DiscountsReport = lazy(() => import("../../features/reports/discounts/pages/DiscountsReportPage"));
const CardStockReport = lazy(() => import("../../features/reports/cardStock/pages/CardStockReportPage"));
const CardsSoldReport = lazy(() => import("../../features/reports/cardsSold/pages/CardsSoldReportPage"));
const CardImportsReport = lazy(() => import("../../features/reports/cardImports/pages/CardImportsReportPage"));
const PriceListReport = lazy(() => import("../../features/reports/priceList/pages/PriceListReportPage"));
const RegistrationsReport = lazy(() => import("../../features/reports/registrations/pages/RegistrationsReportPage"));
const InactiveCustomersReport = lazy(() => import("../../features/reports/inactiveCustomers/pages/InactiveCustomersReportPage"));
const InvoiceDeletionsReport = lazy(() => import("../../features/reports/invoiceDeletions/pages/InvoiceDeletionsReportPage"));
const TransactionReversalsReport = lazy(() => import("../../features/reports/transactionReversals/pages/TransactionReversalsReportPage"));
const MessagesReport = lazy(() => import("../../features/reports/messages/pages/MessagesReportPage"));
const TvActivationsReport = lazy(() => import("../../features/reports/tvActivations/pages/TvActivationsReportPage"));
const TvSubscriptionsEndingReport = lazy(() => import("../../features/reports/tvSubscriptionsEnding/pages/TvSubscriptionsEndingReportPage"));
const TvsByCityReport = lazy(() => import("../../features/reports/tvsByCity/pages/TvsByCityReportPage"));
const Users = lazy(() => import("../../features/users/pages/UsersPage"));
const Agents = lazy(() => import("../../features/customers/pages/AgentsPage"));
const SubAgents = lazy(() => import("../../features/customers/pages/SubAgentsPage"));
const Clients = lazy(() => import("../../features/customers/pages/ClientsPage"));
const CustomerDetails = lazy(() => import("../../features/customers/pages/CustomerDetailsPage"));
const Messages = lazy(() => import("../../features/messages/pages/MessagesPage"));
const SendMessage = lazy(() => import("../../features/messages/pages/SendMessagePage"));
const CardTypeDiscounts = lazy(() => import("../../features/cardTypeDiscounts/pages/CardTypeDiscountsPage"));
const Invoices = lazy(() => import("../../features/invoices/pages/InvoicesPage"));
const Transactions = lazy(() => import("../../features/transactions/pages/TransactionsPage"));
const CardCategories = lazy(() => import("../../features/cardCategories/pages/CardCategoriesPage"));
const CardTypes = lazy(() => import("../../features/cardTypes/pages/CardTypesPage"));
const Cards = lazy(() => import("../../features/cards/pages/CardsPage"));
const Roles = lazy(() => import("../../features/roles/pages/RolesPage"));
const RoleForm = lazy(() => import("../../features/roles/pages/RoleFormPage"));
const AuditLogs = lazy(() => import("../../features/auditLogs/pages/AuditLogsPage"));
const Countries = lazy(() => import("../../features/countries/pages/CountriesPage"));
const Cities = lazy(() => import("../../features/cities/pages/CitiesPage"));
const Tvs = lazy(() => import("../../features/tvs/pages/tvs/TvsPage"));
const TvActivations = lazy(() => import("../../features/tvs/pages/tvActivations/TvActivationsPage"));
const TvSmsApiLogs = lazy(() => import("../../features/tvs/pages/tvSmsApiLogs/TvSmsApiLogsPage"));

const dashboardRoutes: any = [
  {
    path: "/customers/agents",
    name: "Agents",
    element: <Agents />,
    permission: Permission.AgentsView,
  },
  {
    path: "/customers/sub-agents",
    name: "SubAgents",
    element: <SubAgents />,
    permission: Permission.SubAgentsView,
  },
  {
    path: "/customers/clients",
    name: "Clients",
    element: <Clients />,
    permission: Permission.ClientsView,
  },
  {
    path: "/card-categories",
    name: "Card Categories",
    element: <CardCategories />,
    permission: Permission.CardCategoriesView,
  },
  {
    path: "/cards",
    name: "Cards",
    element: <Cards />,
    permission: Permission.CardsView,
  },
  {
    path: "/card-types",
    name: "Card Types",
    element: <CardTypes />,
    permission: Permission.CardTypesView,
  },
  {
    path: "/card-type-discounts",
    name: "Card type discounts",
    element: <CardTypeDiscounts />,
    permission: Permission.CardTypeDiscountsView,
  },
  {
    path: "/invoices",
    name: "Invoices",
    element: <Invoices />,
    permission: Permission.InvoicesView,
  },
  {
    path: "/transactions",
    name: "Transactions",
    element: <Transactions />,
    permission: Permission.TransactionsView,
  },
  {
    path: "/messages",
    name: "Messages",
    element: <Messages />,
    permission: Permission.MessagesView,
  },
  {
    path: "/messages/send",
    name: "Send Message",
    element: <SendMessage />,
    anyPermission: [
      Permission.MessagesSendToCustomer,
      Permission.MessagesSendToCity,
      Permission.MessagesSendToRole,
      Permission.MessagesSendToRoleInCity,
      Permission.MessagesSendToAll,
    ],
  },
  {
    path: "/tvs",
    name: "Tvs",
    element: <Tvs />,
    permission: Permission.TvsView,
  },
  {
    path: "/tv-activations",
    name: "TvActivations",
    element: <TvActivations />,
    permission: Permission.TvsView,
  },
  {
    path: "/tv-sms-api-logs",
    name: "TvSmsApiLogs",
    element: <TvSmsApiLogs />,
    permission: Permission.CitiesViewTvSmsLogs,
  },
  {
    path: "/customers/:id",
    name: "Customer Details",
    element: <CustomerDetails />,
    anyPermission: [Permission.AgentsView, Permission.SubAgentsView, Permission.ClientsView],
  },
  {
    path: "/countries",
    name: "Countries",
    element: <Countries />,
    permission: Permission.CountriesView,
  },
  {
    path: "/cities",
    name: "Cities",
    element: <Cities />,
    permission: Permission.CitiesView,
  },
  {
    path: "/users",
    name: "Users",
    element: <Users />,
    permission: Permission.UsersView,
  },
  {
    path: "/roles",
    name: "Roles",
    element: <Roles />,
    permission: Permission.RolesView,
  },
  {
    path: "/roles/new",
    name: "Add Role",
    element: <RoleForm />,
    permission: Permission.RolesCreate,
  },
  {
    path: "/roles/:id",
    name: "Edit Role",
    element: <RoleForm />,
    permission: Permission.RolesUpdate,
  },
  {
    path: "/audit-logs",
    name: "Audit Logs",
    element: <AuditLogs />,
    permission: Permission.AuditLogsView,
  },
  {
    path: "/profile",
    name: "Profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
];

const reportsRoutes: any = [
  {
    path: "/reports/account-statement",
    name: "AccountStatementReport",
    element: <AccountStatementReport />,
    permission: Permission.ReportsAccountStatement,
  },
  {
    path: "/reports/customer-balances",
    name: "CustomerBalancesReport",
    element: <CustomerBalancesReport />,
    permission: Permission.ReportsCustomerBalances,
  },
  {
    path: "/reports/daily-finance",
    name: "DailyFinanceReport",
    element: <DailyFinanceReport />,
    permission: Permission.ReportsDailyFinance,
  },
  {
    path: "/reports/e-payments",
    name: "EPaymentsReport",
    element: <EPaymentsReport />,
    permission: Permission.ReportsEPayments,
  },
  {
    path: "/reports/sales-by-card-type",
    name: "SalesByCardTypeReport",
    element: <SalesByCardTypeReport />,
    permission: Permission.ReportsSalesByCardType,
  },
  {
    path: "/reports/sales-by-customer",
    name: "SalesByCustomerReport",
    element: <SalesByCustomerReport />,
    permission: Permission.ReportsSalesByCustomer,
  },
  {
    path: "/reports/sales-by-city",
    name: "SalesByCityReport",
    element: <SalesByCityReport />,
    permission: Permission.ReportsSalesByCity,
  },
  {
    path: "/reports/agent-performance",
    name: "AgentPerformanceReport",
    element: <AgentPerformanceReport />,
    permission: Permission.ReportsAgentPerformance,
  },
  {
    path: "/reports/sub-agents-by-agent",
    name: "SubAgentsByAgentReport",
    element: <SubAgentsByAgentReport />,
    permission: Permission.ReportsSubAgentsByAgent,
  },
  {
    path: "/reports/discounts",
    name: "DiscountsReport",
    element: <DiscountsReport />,
    permission: Permission.ReportsDiscounts,
  },
  {
    path: "/reports/card-stock",
    name: "CardStockReport",
    element: <CardStockReport />,
    permission: Permission.ReportsCardStock,
  },
  {
    path: "/reports/cards-sold",
    name: "CardsSoldReport",
    element: <CardsSoldReport />,
    permission: Permission.ReportsCardsSold,
  },
  {
    path: "/reports/card-imports",
    name: "CardImportsReport",
    element: <CardImportsReport />,
    permission: Permission.ReportsCardImports,
  },
  {
    path: "/reports/price-list",
    name: "PriceListReport",
    element: <PriceListReport />,
    permission: Permission.ReportsPriceList,
  },
  {
    path: "/reports/registrations",
    name: "RegistrationsReport",
    element: <RegistrationsReport />,
    permission: Permission.ReportsRegistrations,
  },
  {
    path: "/reports/inactive-customers",
    name: "InactiveCustomersReport",
    element: <InactiveCustomersReport />,
    permission: Permission.ReportsInactiveCustomers,
  },
  {
    path: "/reports/invoice-deletions",
    name: "InvoiceDeletionsReport",
    element: <InvoiceDeletionsReport />,
    permission: Permission.ReportsInvoiceDeletions,
  },
  {
    path: "/reports/transaction-reversals",
    name: "TransactionReversalsReport",
    element: <TransactionReversalsReport />,
    permission: Permission.ReportsTransactionReversals,
  },
  {
    path: "/reports/messages",
    name: "MessagesReport",
    element: <MessagesReport />,
    permission: Permission.ReportsMessages,
  },
  {
    path: "/reports/tv-activations",
    name: "TvActivationsReport",
    element: <TvActivationsReport />,
    permission: Permission.ReportsTvActivations,
  },
  {
    path: "/reports/tv-subscriptions-ending",
    name: "TvSubscriptionsEndingReport",
    element: <TvSubscriptionsEndingReport />,
    permission: Permission.ReportsTvSubscriptionsEnding,
  },
  {
    path: "/reports/tvs-by-city",
    name: "TvsByCityReport",
    element: <TvsByCityReport />,
    permission: Permission.ReportsTvsByCity,
  },
];

const authRoutes: any = [
  {
    path: "/",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/otp-login",
    name: "OTP Login",
    element: <OtpLogin />,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    element: <ForgotPassword />,
  },
  {
    path: "/404",
    name: "Not Found",
    element: <NotFound />,
  },
  {
    path: "/500",
    name: "Server Error",
    element: <ServerError />,
  },
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
  },
];

const allAdminRoutes = [...dashboardRoutes, ...reportsRoutes];
const allBlankRoutes = [...authRoutes];

export { allAdminRoutes, allBlankRoutes };
