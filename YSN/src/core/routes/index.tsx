import { lazy } from "react";
import { Permission } from "../../shared/types/Permissions.types";


const NotFound = lazy(() => import("../../features/exceptions/pages/NotFound"));
const Login = lazy(() => import("../../features/auth/pages/login/Login"));
const LoginCode = lazy(() => import("../../features/auth/pages/login-code/LoginCode"));
const ForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ForgotPassword"));
const ServerError = lazy(() => import("../../features/exceptions/pages/ServerError"));

const Dashboard = lazy(() => import("../../features/dashboard/pages/DashboardPage"));
const Profile = lazy(() => import("../../features/profile/pages/ProfilePage"));
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

const reportsRoutes: any = [];

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
    path: "/login-code",
    name: "Login Code",
    element: <LoginCode />,
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
