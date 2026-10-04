import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const FloatingGlassSidebar = ({
  menu,
  collapsed,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <div className="flex h-full flex-col p-3">
      <aside
        className={`sidebar-glass-floating flex flex-1 flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-60"
        }`}
      >
        <div className="flex h-20 flex-shrink-0 items-center justify-center px-4">
          {collapsed ? collapsedLogoElement : logoElement}
        </div>

        <div className="mx-4 mt-4 border-b border-white/10" />

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menu.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              isDark={true}
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
    </div>
  );
};

export default FloatingGlassSidebar;
