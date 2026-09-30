import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const ClassicSidebar = ({
  menu,
  collapsed,
  isDark,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`sidebar-classic flex h-full flex-col border-e transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div
        className="sidebar-classic-logo flex h-20 flex-shrink-0 items-center justify-center border-b px-4"
      >
        {collapsed ? collapsedLogoElement : logoElement}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isDark={isDark}
            roleID={roleID}
          />
        ))}
      </nav>
    </aside>
  );
};

export default ClassicSidebar;
