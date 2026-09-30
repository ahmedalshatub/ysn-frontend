import { useState } from "react";
import type { SidebarProps } from "./types";
import SidebarItem from "../SidebarItem";

const CompactSidebar = ({
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
      className={`sidebar-compact flex h-full flex-col border-e transition-all duration-300 ${
        isExpanded ? "w-64" : "w-[72px]"
      }`}
    >
      <div
        className="sidebar-classic-logo flex h-20 flex-shrink-0 items-center justify-center border-b px-4"
      >
        {isExpanded ? logoElement : collapsedLogoElement}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            collapsed={!isExpanded}
            isDark={false}
            roleID={roleID}
          />
        ))}
      </nav>
    </aside>
  );
};

export default CompactSidebar;
