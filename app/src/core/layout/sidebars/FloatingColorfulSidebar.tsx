import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const FloatingColorfulSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <div className="flex h-full flex-col p-3">
      <aside
        className={`flex flex-1 flex-col overflow-hidden rounded-2xl sidebar-colorful-pink shadow-lg ring-1 ring-white/10 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-60"
        }`}
      >
        <div className="flex h-20 flex-shrink-0 items-center justify-center px-4">
          {collapsed ? collapsedLogoElement : logoElement}
        </div>

        <div className="mx-4 border-b border-white/10" />

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menu.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              isDark={true}
              roleID={roleID}
              activeClass="sidebar-colorful-item-active"
              inactiveClass="sidebar-colorful-pink-item-inactive"
              subActiveClass="sidebar-colorful-sub-active"
              subInactiveClass="sidebar-colorful-pink-sub-inactive"
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default FloatingColorfulSidebar;
