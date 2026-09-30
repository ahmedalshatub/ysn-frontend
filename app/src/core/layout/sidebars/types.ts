import type { MenuItem } from "../../config/Menu";

export interface SidebarProps {
  menu: MenuItem[];
  collapsed: boolean;
  isDark: boolean;
  roleID: number;
  logoElement: React.ReactNode;
  collapsedLogoElement: React.ReactNode;
}
