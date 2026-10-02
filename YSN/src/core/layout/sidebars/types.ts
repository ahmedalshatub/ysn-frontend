import type { MenuItem } from "../../config/Menu";

export interface SidebarProps {
  menu: MenuItem[];
  collapsed: boolean;
  isDark: boolean;
  logoElement: React.ReactNode;
  collapsedLogoElement: React.ReactNode;
}
