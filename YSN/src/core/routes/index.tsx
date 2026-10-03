import { lazy } from "react";
import { Permission } from "../../shared/types/Permissions.types";


const NotFound = lazy(() => import("../../features/exceptions/pages/NotFound"));
const Login = lazy(() => import("../../features/auth/pages/login/Login"));
const LoginCode = lazy(() => import("../../features/auth/pages/login-code/LoginCode"));
const ForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ForgotPassword"));
const ServerError = lazy(() => import("../../features/exceptions/pages/ServerError"));
const ComponentExamples = lazy(() => import("../../features/showcase/pages/ComponentExamplesPage"));
const ComponentShowcase = lazy(() => import("../../features/showcase/pages/ComponentShowcasePage"));
const CategoriesExample1 = lazy(() => import("../../features/categoriesExample/pages/example1/CategoriesExample1"));
const CategoriesExample2 = lazy(() => import("../../features/categoriesExample/pages/example2/CategoriesExample2"));
const CategoriesExample3 = lazy(() => import("../../features/categoriesExample/pages/example3/CategoriesExample3"));
const CategoryFormPage = lazy(() => import("../../features/categoriesExample/pages/example3/CategoryFormPage"));
const TestTrExample1 = lazy(() => import("../../features/testTrExample/pages/example1/TestTrExample1"));
const TestTrExample2 = lazy(() => import("../../features/testTrExample/pages/example2/TestTrExample2"));
const TestTrExample3 = lazy(() => import("../../features/testTrExample/pages/example3/TestTrExample3"));
const TestTrFormPage = lazy(() => import("../../features/testTrExample/pages/example3/TestTrFormPage"));
const TestSubTrExample1 = lazy(() => import("../../features/testSubTrExample/pages/TestSubTrExample1"));
const CustomerStepperExample = lazy(() => import("../../features/stepperExample/pages/CustomerStepperExamplePage"));
const ProductDetails = lazy(() => import("../../features/productDetails/pages/ProductDetailsPage"));
const AccountsExample = lazy(() => import("../../features/accountsExample/pages/AccountsExamplePage"));
const ProfileExample = lazy(() => import("../../features/profileExample/pages/ProfileExamplePage"));
const PublicCard = lazy(() => import("../../features/publicCard/pages/PublicCardPage"));
const TicketList = lazy(() => import("../../features/ticketExample/pages/TicketList"));
const TicketDetails = lazy(() => import("../../features/ticketExample/pages/TicketDetails"));
const InvoiceExample = lazy(() => import("../../features/invoiceExample/pages/InvoiceExamplePage"));

const Dashboard = lazy(() => import("../../features/dashboard/pages/DashboardPage"));
const Profile = lazy(() => import("../../features/profile/pages/ProfilePage"));
const Users = lazy(() => import("../../features/users/pages/UsersPage"));
const Agents = lazy(() => import("../../features/customers/pages/AgentsPage"));
const SubAgents = lazy(() => import("../../features/customers/pages/SubAgentsPage"));
const Clients = lazy(() => import("../../features/customers/pages/ClientsPage"));
const CustomerDetails = lazy(() => import("../../features/customers/pages/CustomerDetailsPage"));
const Messages = lazy(() => import("../../features/messages/pages/MessagesPage"));
const Transactions = lazy(() => import("../../features/transactions/pages/TransactionsPage"));
const CardCategories = lazy(() => import("../../features/cardCategories/pages/CardCategoriesPage"));
const CardTypes = lazy(() => import("../../features/cardTypes/pages/CardTypesPage"));
const Cards = lazy(() => import("../../features/cards/pages/CardsPage"));
const Roles = lazy(() => import("../../features/roles/pages/RolesPage"));
const RoleForm = lazy(() => import("../../features/roles/pages/RoleFormPage"));
const AuditLogs = lazy(() => import("../../features/auditLogs/pages/AuditLogsPage"));
const Payments = lazy(() => import("../../features/payments/pages/PaymentsPage"));
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
    path: "/payments",
    name: "Payments",
    element: <Payments />,
    permission: Permission.PaymentsManage,
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

const categoryRoutes: any = [
  {
    path: "/categories-example",
    name: "Categories Example",
    element: <CategoriesExample1 />,
    permission: Permission.CategoriesManage,
  },
  {
    path: "/categories-example-2",
    name: "Categories Example 2",
    element: <CategoriesExample2 />,
    permission: Permission.CategoriesManage,
  },
  {
    path: "/categories-example-3",
    name: "Categories Example 3",
    element: <CategoriesExample3 />,
    permission: Permission.CategoriesManage,
  },
  {
    path: "/categories-example-3/add",
    name: "Add Category",
    element: <CategoryFormPage />,
    permission: Permission.CategoriesManage,
  },
  {
    path: "/categories-example-3/edit/:id",
    name: "Edit Category",
    element: <CategoryFormPage />,
    permission: Permission.CategoriesManage,
  },
];

const testTrRoutes: any = [
  {
    path: "/test-tr-example-1",
    name: "Test TR Example 1",
    element: <TestTrExample1 />,
    permission: Permission.TestTrsManage,
  },
  {
    path: "/test-tr-example-2",
    name: "Test TR Example 2",
    element: <TestTrExample2 />,
    permission: Permission.TestTrsManage,
  },
  {
    path: "/test-tr-example-3",
    name: "Test TR Example 3",
    element: <TestTrExample3 />,
    permission: Permission.TestTrsManage,
  },
  {
    path: "/test-tr-example-3/add",
    name: "Add Test TR",
    element: <TestTrFormPage />,
    permission: Permission.TestTrsManage,
  },
  {
    path: "/test-tr-example-3/edit/:id",
    name: "Edit Test TR",
    element: <TestTrFormPage />,
    permission: Permission.TestTrsManage,
  },
  {
    path: "/test-sub-tr-example-1",
    name: "Test Sub TR Example 1",
    element: <TestSubTrExample1 />,
    permission: Permission.TestTrsManage,
  },
];

const exampleRoutes: any = [
  {
    path: "/profile-example",
    name: "Profile Example",
    element: <ProfileExample />,
  },
  {
    path: "/ticket-example",
    name: "Ticket Example",
    element: <TicketList />,
  },
  {
    path: "/ticket-example/:id",
    name: "Ticket Details",
    element: <TicketDetails />,
  },
  {
    path: "/invoice-example",
    name: "Invoice Example",
    element: <InvoiceExample />,
  },
  {
    path: "/stepper-example",
    name: "Customer Stepper Example",
    element: <CustomerStepperExample />,
  },
  {
    path: "/product-details",
    name: "Product Details",
    element: <ProductDetails />,
  },
  {
    path: "/accounts-example",
    name: "Chart of Accounts",
    element: <AccountsExample />,
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
    path: "/components",
    name: "Component Examples",
    element: <ComponentExamples />,
  },
  {
    path: "/showcase",
    name: "Component Showcase",
    element: <ComponentShowcase />,
  },
  {
    path: "/card/:id",
    name: "Employee Card",
    element: <PublicCard />,
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

const allAdminRoutes = [...dashboardRoutes, ...categoryRoutes, ...testTrRoutes, ...exampleRoutes, ...reportsRoutes];
const allBlankRoutes = [...authRoutes];

export { allAdminRoutes, allBlankRoutes };
