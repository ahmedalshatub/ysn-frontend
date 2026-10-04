import type { ReactNode } from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import Users2Icon from "../../assets/icons/Users2Icon";
import LayersIcon from "../../assets/icons/LayersIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import WalletIcon from "../../assets/icons/WalletIcon";
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
