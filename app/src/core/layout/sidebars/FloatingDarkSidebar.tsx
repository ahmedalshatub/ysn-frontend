import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const FloatingDarkSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <div className="flex h-full flex-col p-3">
      <aside
        className={`flex flex-1 flex-col overflow-hidden rounded-2xl sidebar-dark-floating shadow-lg ring-1 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-60"
        }`}
      >
        <div
          className="flex h-20 flex-shrink-0 items-center justify-center px-4"
        >
          {collapsed ? collapsedLogoElement : logoElement}
        </div>

        <div className="mx-4 border-b sidebar-dark-border" />

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menu.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              isDark={true}
              roleID={roleID}
              activeClass="sidebar-dark-floating-item-active"
              inactiveClass="sidebar-dark-floating-item-inactive"
              subActiveClass="sidebar-dark-sub-active"
              subInactiveClass="sidebar-dark-sub-inactive"
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default FloatingDarkSidebar;
