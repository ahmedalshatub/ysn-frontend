import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const GlassDarkSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`sidebar-glass flex h-full flex-col border-e border-white/10 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div className="flex h-20 flex-shrink-0 items-center justify-center border-b border-white/10 px-4">
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
            activeClass="sidebar-glass-item-active"
            inactiveClass="sidebar-glass-item-inactive"
            subActiveClass="sidebar-glass-sub-active"
            subInactiveClass="sidebar-glass-sub-inactive"
          />
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-3">
        <div
          className={`sidebar-glass-subtle flex items-center gap-2 rounded-lg px-3 py-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="h-2 w-2 rounded-full sidebar-online-dot sidebar-online-glow" />
          {!collapsed && (
            <span className="text-xs sidebar-glass-online-text">Online</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default GlassDarkSidebar;
