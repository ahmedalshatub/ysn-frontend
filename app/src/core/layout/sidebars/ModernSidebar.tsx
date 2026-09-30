import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const ModernSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`flex h-full flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      } sidebar-dark-alt`}
    >
      <div
        className="flex h-20 flex-shrink-0 items-center justify-center border-b sidebar-dark-logo px-4"
      >
        {collapsed ? collapsedLogoElement : logoElement}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isDark={true}
            roleID={roleID}
            activeClass="sidebar-dark-modern-item-active"
            inactiveClass="sidebar-dark-modern-item-inactive"
            subActiveClass="sidebar-dark-modern-sub-active"
            subInactiveClass="sidebar-dark-modern-sub-inactive"
          />
        ))}
      </nav>

      <div className="border-t sidebar-dark-border px-3 py-3">
        <div
          className={`sidebar-dark-user-card flex items-center gap-2 rounded-lg px-3 py-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="h-2 w-2 rounded-full sidebar-online-dot" />
          {!collapsed && (
            <span className="text-xs sidebar-dark-online-text">Online</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ModernSidebar;
