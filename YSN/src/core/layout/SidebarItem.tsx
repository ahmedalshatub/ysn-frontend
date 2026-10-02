import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { MenuItem } from "../config/Menu";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
  isDark: boolean;
  activeClass?: string;
  inactiveClass?: string;
  subActiveClass?: string;
  subInactiveClass?: string;
  iconActiveClass?: string;
  iconInactiveClass?: string;
  showTooltip?: boolean;
}

const CollapsedTooltip = ({
  anchorRef,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    anchorRight: number;
    anchorLeft: number;
    anchorTop: number;
    anchorHeight: number;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isRtl = document.documentElement.dir === "rtl";

  const updatePos = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    if (isRtl) {
      setPos({
        top: centerY,
        left: rect.left - 8,
        anchorRight: rect.right,
        anchorLeft: rect.left,
        anchorTop: rect.top,
        anchorHeight: rect.height,
      });
    } else {
      setPos({
        top: centerY,
        left: rect.right + 8,
        anchorRight: rect.right,
        anchorLeft: rect.left,
        anchorTop: rect.top,
        anchorHeight: rect.height,
      });
    }
  }, [anchorRef, isRtl]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  useEffect(() => {
    if (!tooltipRef.current || !pos) return;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    if (tooltipRect.bottom > window.innerHeight - 8) {
      setPos((prev) =>
        prev
          ? { ...prev, top: prev.top - (tooltipRect.bottom - window.innerHeight + 8) }
          : prev
      );
    }
  }, [pos]);

  if (!pos) return null;

  return createPortal(
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="fixed z-[9998]"
        style={
          isRtl
            ? {
                top: pos.anchorTop,
                left: pos.left,
                width: pos.anchorLeft - pos.left + 8,
                height: pos.anchorHeight,
              }
            : {
                top: pos.anchorTop,
                left: pos.anchorRight,
                width: pos.left - pos.anchorRight + 8,
                height: pos.anchorHeight,
              }
        }
      />
      <div
        ref={tooltipRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="sidebar-tooltip fixed z-[9999] whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium shadow-xl"
        style={{
          top: pos.top,
          ...(isRtl
            ? { right: window.innerWidth - pos.left }
            : { left: pos.left }),
          transform: "translateY(-50%)",
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

const SidebarItem = ({
  item,
  collapsed,
  activeClass = "sidebar-item-active",
  inactiveClass = "sidebar-item-inactive",
  subActiveClass = "sidebar-sub-active",
  subInactiveClass = "sidebar-sub-inactive",
}: SidebarItemProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isActive =
    location.pathname === item.path ||
    item.subMenu?.some((sub) => location.pathname === sub.path);

  const [subOpen, setSubOpen] = useState(isActive || false);
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const filteredSubs = item.subMenu;

  if (collapsed) {
    return (
      <div
        ref={itemRef}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <NavLink
          to={hasSubMenu ? "#" : item.path}
          onClick={(e) => {
            if (hasSubMenu) e.preventDefault();
          }}
          className={`flex items-center justify-center rounded-lg p-2.5 transition-colors ${
            isActive ? activeClass : inactiveClass
          }`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
        </NavLink>
        {hovered && (
          <CollapsedTooltip
            anchorRef={itemRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {t(item.title)}
            {hasSubMenu && filteredSubs && filteredSubs.length > 0 && (
              <div className="sidebar-tooltip-divider mt-2 space-y-0.5 border-t pt-2">
                {filteredSubs.map((sub) => (
                  <NavLink
                    key={sub.name}
                    to={sub.path}
                    className="sidebar-tooltip-sub-link block rounded-md px-2 py-1.5 text-sm"
                  >
                    {t(sub.title)}
                  </NavLink>
                ))}
              </div>
            )}
          </CollapsedTooltip>
        )}
      </div>
    );
  }

  if (!hasSubMenu) {
    return (
      <NavLink
        to={item.path}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? activeClass : inactiveClass
        }`}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span className="min-w-0 break-words">{t(item.title)}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setSubOpen(!subOpen)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? activeClass : inactiveClass
        }`}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span className="min-w-0 flex-1 break-words text-start">{t(item.title)}</span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 transition-transform ${
            subOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {subOpen && (
        <div className="sidebar-submenu-border mt-1 space-y-0.5 ltr:ml-4 ltr:border-l rtl:mr-4 rtl:border-r ltr:pl-3 rtl:pr-3">
          {filteredSubs?.map((sub) => (
            <NavLink
              key={sub.name}
              to={sub.path}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                location.pathname === sub.path
                  ? subActiveClass
                  : subInactiveClass
              }`}
            >
              {t(sub.title)}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
