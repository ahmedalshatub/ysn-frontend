import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const MinimalSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  return (
    <aside
      className={`sidebar-minimal flex h-full flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <div
        className="flex h-20 flex-shrink-0 items-center justify-center px-4"
      >
        {collapsed ? collapsedLogoElement : logoElement}
      </div>

      <div
        className="sidebar-minimal-logo mx-5 border-b"
      />

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-6">
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

export default MinimalSidebar;
