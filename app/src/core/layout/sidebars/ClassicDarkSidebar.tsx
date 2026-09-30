import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const ClassicDarkSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`flex h-full flex-col border-e sidebar-dark transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
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
            activeClass="sidebar-dark-item-active"
            inactiveClass="sidebar-dark-item-inactive"
            subActiveClass="sidebar-dark-sub-active"
            subInactiveClass="sidebar-dark-sub-inactive"
          />
        ))}
      </nav>
    </aside>
  );
};

export default ClassicDarkSidebar;
