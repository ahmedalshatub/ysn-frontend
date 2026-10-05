import type { ReactNode } from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import Users2Icon from "../../assets/icons/Users2Icon";
import LayersIcon from "../../assets/icons/LayersIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import WalletIcon from "../../assets/icons/WalletIcon";
import BarChartIcon from "../../assets/icons/BarChartIcon";
import { Permission, type PermissionCode } from "../../shared/types/Permissions.types";

const iconSize = 20;

export interface SubMenuItem {
  name: string;
  title: string;
  path: string;
  permission?: PermissionCode;
}

export interface MenuItem {
  name: string;
  title: string;
  icon: ReactNode;
  path: string;
  permission?: PermissionCode;
  subMenu?: SubMenuItem[];
}

const Menu: MenuItem[] = [
  {
    name: "HomePage",
    title: "sidebar.homePage",
    icon: <HomeIcon width={iconSize} height={iconSize} />,
    path: "/dashboard",
  },
  {
    name: "Customers",
    title: "sidebar.customers",
    icon: <Users2Icon width={iconSize} height={iconSize} />,
    path: "/customers/agents",
    subMenu: [
      {
        name: "agents",
        title: "sidebar.agents",
        path: "/customers/agents",
        permission: Permission.AgentsView,
      },
      {
        name: "sub-agents",
        title: "sidebar.subAgents",
        path: "/customers/sub-agents",
        permission: Permission.SubAgentsView,
      },
      {
        name: "clients",
        title: "sidebar.clients",
        path: "/customers/clients",
        permission: Permission.ClientsView,
      },
      {
        name: "card-type-discounts",
        title: "sidebar.cardTypeDiscounts",
        path: "/card-type-discounts",
        permission: Permission.CardTypeDiscountsView,
      },
      {
        name: "messages",
        title: "sidebar.messages",
        path: "/messages",
        permission: Permission.MessagesView,
      },
    ],
  },
  {
    name: "Invoices",
    title: "sidebar.invoices",
    icon: <FileTextIcon width={iconSize} height={iconSize} />,
    path: "/invoices",
    permission: Permission.InvoicesView,
  },
  {
    name: "Transactions",
    title: "sidebar.transactions",
    icon: <WalletIcon width={iconSize} height={iconSize} />,
    path: "/transactions",
    permission: Permission.TransactionsView,
  },
  {
    name: "Cards",
    title: "sidebar.cards",
    icon: <LayersIcon width={iconSize} height={iconSize} />,
    path: "/card-categories",
    subMenu: [
      {
        name: "card-categories",
        title: "sidebar.cardCategories",
        path: "/card-categories",
        permission: Permission.CardCategoriesView,
      },
      {
        name: "card-types",
        title: "sidebar.cardTypes",
        path: "/card-types",
        permission: Permission.CardTypesView,
      },
      {
        name: "cards",
        title: "sidebar.cardsStock",
        path: "/cards",
        permission: Permission.CardsView,
      },
    ],
  },
  {
    name: "Administration",
    title: "sidebar.administration",
    icon: <UsersIcon width={iconSize} height={iconSize} />,
    path: "/users",
    subMenu: [
      {
        name: "users",
        title: "sidebar.employees",
        path: "/users",
        permission: Permission.UsersView,
      },
      {
        name: "roles",
        title: "sidebar.roles",
        path: "/roles",
        permission: Permission.RolesView,
      },
      {
        name: "audit-logs",
        title: "sidebar.auditLogs",
        path: "/audit-logs",
        permission: Permission.AuditLogsView,
      },
    ],
  },
  {
    name: "Reports",
    title: "sidebar.reports",
    icon: <BarChartIcon width={iconSize} height={iconSize} />,
    path: "/reports/account-statement",
    subMenu: [
      {
        name: "account-statement",
        title: "reports.accountStatement.title",
        path: "/reports/account-statement",
        permission: Permission.ReportsAccountStatement,
      },
      {
        name: "customer-balances",
        title: "reports.customerBalances.title",
        path: "/reports/customer-balances",
        permission: Permission.ReportsCustomerBalances,
      },
      {
        name: "daily-finance",
        title: "reports.dailyFinance.title",
        path: "/reports/daily-finance",
        permission: Permission.ReportsDailyFinance,
      },
      {
        name: "e-payments",
        title: "reports.ePayments.title",
        path: "/reports/e-payments",
        permission: Permission.ReportsEPayments,
      },
      {
        name: "sales-by-card-type",
        title: "reports.salesByCardType.title",
        path: "/reports/sales-by-card-type",
        permission: Permission.ReportsSalesByCardType,
      },
      {
        name: "sales-by-customer",
        title: "reports.salesByCustomer.title",
        path: "/reports/sales-by-customer",
        permission: Permission.ReportsSalesByCustomer,
      },
      {
        name: "sales-by-city",
        title: "reports.salesByCity.title",
        path: "/reports/sales-by-city",
        permission: Permission.ReportsSalesByCity,
      },
      {
        name: "agent-performance",
        title: "reports.agentPerformance.title",
        path: "/reports/agent-performance",
        permission: Permission.ReportsAgentPerformance,
      },
      {
        name: "sub-agents-by-agent",
        title: "reports.subAgentsByAgent.title",
        path: "/reports/sub-agents-by-agent",
        permission: Permission.ReportsSubAgentsByAgent,
      },
      {
        name: "discounts",
        title: "reports.discounts.title",
        path: "/reports/discounts",
        permission: Permission.ReportsDiscounts,
      },
      {
        name: "card-stock",
        title: "reports.cardStock.title",
        path: "/reports/card-stock",
        permission: Permission.ReportsCardStock,
      },
      {
        name: "cards-sold",
        title: "reports.cardsSold.title",
        path: "/reports/cards-sold",
        permission: Permission.ReportsCardsSold,
      },
      {
        name: "card-imports",
        title: "reports.cardImports.title",
        path: "/reports/card-imports",
        permission: Permission.ReportsCardImports,
      },
      {
        name: "price-list",
        title: "reports.priceList.title",
        path: "/reports/price-list",
        permission: Permission.ReportsPriceList,
      },
      {
        name: "registrations",
        title: "reports.registrations.title",
        path: "/reports/registrations",
        permission: Permission.ReportsRegistrations,
      },
      {
        name: "inactive-customers",
        title: "reports.inactiveCustomers.title",
        path: "/reports/inactive-customers",
        permission: Permission.ReportsInactiveCustomers,
      },
      {
        name: "invoice-deletions",
        title: "reports.invoiceDeletions.title",
        path: "/reports/invoice-deletions",
        permission: Permission.ReportsInvoiceDeletions,
      },
      {
        name: "transaction-reversals",
        title: "reports.transactionReversals.title",
        path: "/reports/transaction-reversals",
        permission: Permission.ReportsTransactionReversals,
      },
      {
        name: "messages",
        title: "reports.messages.title",
        path: "/reports/messages",
        permission: Permission.ReportsMessages,
      },
    ],
  },
  {
    name: "Settings",
    title: "sidebar.settings",
    icon: <SettingsIcon width={iconSize} height={iconSize} />,
    path: "/countries",
    subMenu: [
      {
        name: "countries",
        title: "sidebar.countries",
        path: "/countries",
        permission: Permission.CountriesView,
      },
      {
        name: "cities",
        title: "sidebar.cities",
        path: "/cities",
        permission: Permission.CitiesView,
      },
    ],
  },
];

export default Menu;
