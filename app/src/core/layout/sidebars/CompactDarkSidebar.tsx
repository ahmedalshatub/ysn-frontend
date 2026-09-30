import { useState } from "react";
import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const CompactDarkSidebar = ({
  menu,
  collapsed,
  roleID,
  logoElement,
  collapsedLogoElement,
}: SidebarProps) => {
  const [hovered, setHovered] = useState(false);
  const isExpanded = !collapsed || hovered;

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex h-full flex-col border-e sidebar-dark transition-all duration-300 ${
        isExpanded ? "w-64" : "w-[72px]"
      }`}
    >
      <div
        className="flex h-20 flex-shrink-0 items-center justify-center border-b sidebar-dark-logo px-4"
      >
        {isExpanded ? logoElement : collapsedLogoElement}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={!isExpanded}
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

export default CompactDarkSidebar;
