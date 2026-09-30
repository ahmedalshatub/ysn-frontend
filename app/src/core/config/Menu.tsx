import type { ReactNode } from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import FolderIcon from "../../assets/icons/FolderIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import ShieldIcon from "../../assets/icons/ShieldIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import PackageIcon from "../../assets/icons/PackageIcon";
import SplitIcon from "../../assets/icons/SplitIcon";
import ListOrderedIcon from "../../assets/icons/ListOrderedIcon";
import UserIcon from "../../assets/icons/UserIcon";
import ClipboardIcon from "../../assets/icons/ClipboardIcon";
import { UserRole } from "../../features/auth/types/Roles.types";

const iconSize = 20;

export interface SubMenuItem {
  name: string;
  title: string;
  path: string;
  allowedRoles: number[];
}

export interface MenuItem {
  name: string;
  title: string;
  icon: ReactNode;
  path: string;
  allowedRoles: number[];
  subMenu?: SubMenuItem[];
}

const Menu: MenuItem[] = [
  {
    name: "HomePage",
    title: "sidebar.homePage",
    icon: <HomeIcon width={iconSize} height={iconSize} />,
    path: "/dashboard",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "Payments",
    title: "sidebar.payments",
    icon: <FileTextIcon width={iconSize} height={iconSize} />,
    path: "/payments",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "Categories",
    title: "sidebar.categories",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/categories-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.User],
    subMenu: [
      {
        name: "categories-example1",
        title: "sidebar.categoriesExample1",
        path: "/categories-example",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
      {
        name: "categories-example2",
        title: "sidebar.categoriesExample2",
        path: "/categories-example-2",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
      {
        name: "categories-example3",
        title: "sidebar.categoriesExample3",
        path: "/categories-example-3",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
    ],
  },
  {
    name: "TestTR",
    title: "sidebar.testTr",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/test-tr-example-1",
    allowedRoles: [UserRole.SuperAdmin, UserRole.User],
    subMenu: [
      {
        name: "test-tr-example1",
        title: "sidebar.testTrExample1",
        path: "/test-tr-example-1",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
      {
        name: "test-tr-example2",
        title: "sidebar.testTrExample2",
        path: "/test-tr-example-2",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
      {
        name: "test-tr-example3",
        title: "sidebar.testTrExample3",
        path: "/test-tr-example-3",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
    ],
  },
  {
    name: "TestSubTR",
    title: "sidebar.testSubTrs",
    icon: <FolderIcon width={iconSize} height={iconSize} />,
    path: "/test-sub-tr-example-1",
    allowedRoles: [UserRole.SuperAdmin, UserRole.User],
    subMenu: [
      {
        name: "test-sub-tr-example1",
        title: "sidebar.testSubTrExample1",
        path: "/test-sub-tr-example-1",
        allowedRoles: [UserRole.SuperAdmin, UserRole.User, UserRole.Admin],
      },
    ],
  },
  {
    name: "Users",
    title: "sidebar.users",
    icon: <UsersIcon width={iconSize} height={iconSize} />,
    path: "/users",
    allowedRoles: [UserRole.SuperAdmin],
  },
  {
    name: "AuditLogs",
    title: "sidebar.auditLogs",
    icon: <ShieldIcon width={iconSize} height={iconSize} />,
    path: "/audit-logs",
    allowedRoles: [UserRole.SuperAdmin],
  },
  {
    name: "ProductDetails",
    title: "sidebar.productDetails",
    icon: <PackageIcon width={iconSize} height={iconSize} />,
    path: "/product-details",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "AccountsExample",
    title: "sidebar.accountsExample",
    icon: <SplitIcon width={iconSize} height={iconSize} />,
    path: "/accounts-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "StepperExample",
    title: "sidebar.stepperExample",
    icon: <ListOrderedIcon width={iconSize} height={iconSize} />,
    path: "/stepper-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "ProfileExample",
    title: "sidebar.profileExample",
    icon: <UserIcon width={iconSize} height={iconSize} />,
    path: "/profile-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "InvoiceExample",
    title: "sidebar.invoiceExample",
    icon: <FileTextIcon width={iconSize} height={iconSize} />,
    path: "/invoice-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    name: "TicketExample",
    title: "sidebar.ticketExample",
    icon: <ClipboardIcon width={iconSize} height={iconSize} />,
    path: "/ticket-example",
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
];

export default Menu;
