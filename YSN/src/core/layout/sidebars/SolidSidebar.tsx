import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const SolidSidebar = ({ menu, collapsed, isDark, logoElement, collapsedLogoElement }: SidebarProps) => (
  <div className="flex h-full flex-col p-3">
    <aside className={`sidebar-solid flex flex-1 flex-col overflow-hidden rounded-2xl transition-all duration-300 ${collapsed ? "w-[72px]" : "w-60"}`}>
      <div className="my-4 flex h-20 flex-shrink-0 items-center justify-center px-4">{collapsed ? collapsedLogoElement : logoElement}</div>

      <div className="sidebar-solid-divider mx-4" />

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            isDark={isDark}
            activeClass="sidebar-solid-item-active"
            inactiveClass="sidebar-solid-item-inactive"
            subActiveClass="sidebar-solid-sub-active"
            subInactiveClass="sidebar-solid-sub-inactive"
          />
        ))}
      </nav>
    </aside>
  </div>
);

export default SolidSidebar;
