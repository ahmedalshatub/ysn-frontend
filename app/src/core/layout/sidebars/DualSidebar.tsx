import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SidebarProps } from "./types";
import type { MenuItem } from "../../config/Menu";

const DualTooltip = ({
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
    setPos({
      top: rect.top + rect.height / 2,
      anchorRight: rect.right,
      anchorLeft: rect.left,
      anchorTop: rect.top,
      anchorHeight: rect.height,
    });
  }, [anchorRef]);

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

  const left = isRtl ? pos.anchorLeft - 8 : pos.anchorRight + 8;

  return createPortal(
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="fixed z-[9998]"
        style={
          isRtl
            ? { top: pos.anchorTop, left, width: pos.anchorLeft - left + 8, height: pos.anchorHeight }
            : { top: pos.anchorTop, left: pos.anchorRight, width: left - pos.anchorRight + 8, height: pos.anchorHeight }
        }
      />
      <div
        ref={tooltipRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="sidebar-tooltip fixed z-[9999] min-w-[180px] overflow-hidden rounded-xl py-1.5 shadow-xl"
        style={{
          top: pos.top,
          ...(isRtl ? { right: window.innerWidth - left } : { left }),
          transform: "translateY(-50%)",
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

const DualIconButton = ({
  item,
  isActiveGroup,
  roleID,
  onSetActiveGroup,
}: {
  item: MenuItem;
  isActiveGroup: boolean;
  roleID: number;
  onSetActiveGroup: (item: MenuItem) => void;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const filteredSubs = item.subMenu?.filter((sub) => sub.allowedRoles.includes(roleID));

  const handleClick = () => {
    onSetActiveGroup(item);
    if (!hasSubMenu) {
      navigate(item.path);
    }
  };

  return (
    <div
      ref={btnRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`sidebar-item-inactive rounded-xl p-2.5 transition-colors ${
          isActiveGroup ? "sidebar-item-active" : ""
        }`}
      >
        {item.icon}
      </button>

      {hovered && (
        <DualTooltip
          anchorRef={btnRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="sidebar-tooltip-sub-link px-3 py-1.5 text-xs font-semibold uppercase tracking-wide">
            {t(item.title)}
          </div>
          {hasSubMenu && filteredSubs && filteredSubs.length > 0 ? (
            <div className="sidebar-tooltip-divider border-t pt-1">
              {filteredSubs.map((sub) => (
                <NavLink
                  key={sub.name}
                  to={sub.path}
                  className={`sidebar-tooltip-sub-link block px-3 py-2 text-sm transition-colors ${
                    location.pathname === sub.path ? "sidebar-item-active font-medium" : ""
                  }`}
                >
                  {t(sub.title)}
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="sidebar-tooltip-divider border-t pt-1">
              <NavLink
                to={item.path}
                className={`sidebar-tooltip-sub-link block px-3 py-2 text-sm transition-colors ${
                  location.pathname === item.path ? "sidebar-item-active font-medium" : ""
                }`}
              >
                {t(item.title)}
              </NavLink>
            </div>
          )}
        </DualTooltip>
      )}
    </div>
  );
};

const DualSidebar = ({
  menu,
  collapsed,
  roleID,
  collapsedLogoElement,
}: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<MenuItem | null>(() => {
    return (
      menu.find(
        (item) =>
          location.pathname === item.path ||
          item.subMenu?.some((sub) => location.pathname === sub.path)
      ) || menu[0] || null
    );
  });

  const filteredMenu = menu.filter((item) =>
    item.allowedRoles.includes(roleID)
  );

  return (
    <div className="flex h-full">
      <div
        className="sidebar-dual-icon-bar flex w-[72px] flex-col items-center border-e py-4"
      >
        <div className="mb-4 flex-shrink-0">{collapsedLogoElement}</div>
        <div
          className="sidebar-dual-divider mx-3 mb-4 w-8 border-b"
        />

        <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto">
          {collapsed ? (
            filteredMenu.map((item) => (
              <DualIconButton
                key={item.name}
                item={item}
                isActiveGroup={activeGroup?.name === item.name}
                roleID={roleID}
                onSetActiveGroup={setActiveGroup}
              />
            ))
          ) : (
            filteredMenu.map((item) => {
              const isActive = activeGroup?.name === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveGroup(item)}
                  className={`rounded-xl p-2.5 transition-colors ${
                    isActive
                      ? "sidebar-dual-icon-active"
                      : "sidebar-dual-icon-inactive"
                  }`}
                >
                  {item.icon}
                </button>
              );
            })
          )}
        </nav>
      </div>

      {!collapsed && activeGroup && (
        <div
          className="sidebar-dual-menu-panel flex w-48 flex-col border-e"
        >
          <div className="flex h-16 items-center px-4">
            <h3
              className="sidebar-dual-group-title break-words text-sm font-semibold"
            >
              {t(activeGroup.title)}
            </h3>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
            {activeGroup.subMenu && activeGroup.subMenu.length > 0 ? (
              activeGroup.subMenu
                .filter((sub) => sub.allowedRoles.includes(roleID))
                .map((sub) => (
                  <NavLink
                    key={sub.name}
                    to={sub.path}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      location.pathname === sub.path
                        ? "sidebar-dual-sub-active font-medium"
                        : "sidebar-dual-sub-inactive"
                    }`}
                  >
                    {t(sub.title)}
                  </NavLink>
                ))
            ) : (
              <NavLink
                to={activeGroup.path}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  location.pathname === activeGroup.path
                    ? "sidebar-dual-sub-active font-medium"
                    : "sidebar-dual-sub-inactive"
                }`}
              >
                {t(activeGroup.title)}
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default DualSidebar;
