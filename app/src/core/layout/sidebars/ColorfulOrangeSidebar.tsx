import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const ColorfulOrangeSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`flex h-full flex-col sidebar-colorful-orange transition-all duration-300 ${
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
            activeClass="sidebar-colorful-item-active"
            inactiveClass="sidebar-colorful-orange-item-inactive"
            subActiveClass="sidebar-colorful-sub-active"
            subInactiveClass="sidebar-colorful-orange-sub-inactive"
          />
        ))}
      </nav>
    </aside>
  );
};

export default ColorfulOrangeSidebar;
