import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const ShadowSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`sidebar-shadow flex h-full flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div
        className="flex h-20 flex-shrink-0 items-center justify-center px-4"
      >
        {collapsed ? collapsedLogoElement : logoElement}
      </div>

      <div
        className="sidebar-submenu-border mx-4 border-b"
      />

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isDark={false}
            roleID={roleID}
          />
        ))}
      </nav>
    </aside>
  );
};

export default ShadowSidebar;
