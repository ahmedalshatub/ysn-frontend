import type { ReactNode } from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import FolderIcon from "../../assets/icons/FolderIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import Users2Icon from "../../assets/icons/Users2Icon";
import LayersIcon from "../../assets/icons/LayersIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import PackageIcon from "../../assets/icons/PackageIcon";
import SplitIcon from "../../assets/icons/SplitIcon";
import ListOrderedIcon from "../../assets/icons/ListOrderedIcon";
import UserIcon from "../../assets/icons/UserIcon";
import ClipboardIcon from "../../assets/icons/ClipboardIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
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
    name: "Payments",
    title: "sidebar.payments",
    icon: <FileTextIcon width={iconSize} height={iconSize} />,
    path: "/payments",
    permission: Permission.PaymentsManage,
  },
  {
    name: "Categories",
    title: "sidebar.categories",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/categories-example",
    subMenu: [
      {
        name: "categories-example1",
        title: "sidebar.categoriesExample1",
        path: "/categories-example",
        permission: Permission.CategoriesManage,
      },
      {
        name: "categories-example2",
        title: "sidebar.categoriesExample2",
        path: "/categories-example-2",
        permission: Permission.CategoriesManage,
      },
      {
        name: "categories-example3",
        title: "sidebar.categoriesExample3",
        path: "/categories-example-3",
        permission: Permission.CategoriesManage,
      },
    ],
  },
  {
    name: "TestTR",
    title: "sidebar.testTr",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/test-tr-example-1",
    subMenu: [
      {
        name: "test-tr-example1",
        title: "sidebar.testTrExample1",
        path: "/test-tr-example-1",
        permission: Permission.TestTrsManage,
      },
      {
        name: "test-tr-example2",
        title: "sidebar.testTrExample2",
        path: "/test-tr-example-2",
        permission: Permission.TestTrsManage,
      },
      {
        name: "test-tr-example3",
        title: "sidebar.testTrExample3",
        path: "/test-tr-example-3",
        permission: Permission.TestTrsManage,
      },
    ],
  },
  {
    name: "TestSubTR",
    title: "sidebar.testSubTrs",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/test-sub-tr-example-1",
    subMenu: [
      {
        name: "test-sub-tr-example1",
        title: "sidebar.testSubTrExample1",
        path: "/test-sub-tr-example-1",
        permission: Permission.TestTrsManage,
      },
    ],
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
        name: "messages",
        title: "sidebar.messages",
        path: "/messages",
        permission: Permission.MessagesView,
      },
    ],
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
    name: "ProductDetails",
    title: "sidebar.productDetails",
    icon: <PackageIcon width={iconSize} height={iconSize} />,
    path: "/product-details",
  },
  {
    name: "AccountsExample",
    title: "sidebar.accountsExample",
    icon: <SplitIcon width={iconSize} height={iconSize} />,
    path: "/accounts-example",
  },
  {
    name: "StepperExample",
    title: "sidebar.stepperExample",
    icon: <ListOrderedIcon width={iconSize} height={iconSize} />,
    path: "/stepper-example",
  },
  {
    name: "ProfileExample",
    title: "sidebar.profileExample",
    icon: <UserIcon width={iconSize} height={iconSize} />,
    path: "/profile-example",
  },
  {
    name: "InvoiceExample",
    title: "sidebar.invoiceExample",
    icon: <FileTextIcon width={iconSize} height={iconSize} />,
    path: "/invoice-example",
  },
  {
    name: "TicketExample",
    title: "sidebar.ticketExample",
    icon: <ClipboardIcon width={iconSize} height={iconSize} />,
    path: "/ticket-example",
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
