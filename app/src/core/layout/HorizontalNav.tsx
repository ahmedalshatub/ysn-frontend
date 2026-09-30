import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { NavLink, useLocation } from "react-router-dom";
import Menu from "../config/Menu";
import type { MenuItem } from "../config/Menu";
import ChevronLeftIcon from "../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../assets/icons/ChevronRightIcon";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";

const HorizontalNav = () => {
  const { t, i18n } = useTranslation();
  const roleID = useSelector((state: RootState) => state.auth.roleID);
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const filteredMenu = Menu.filter((item) =>
    item.allowedRoles.includes(roleID)
  );

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isRtl = i18n.dir() === "rtl";
    if (isRtl) {
      setCanScrollRight(el.scrollLeft < -1);
      setCanScrollLeft(el.scrollLeft > -(el.scrollWidth - el.clientWidth) + 1);
    } else {
      setCanScrollLeft(el.scrollLeft > 1);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  }, [i18n]);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const resizeObs = new ResizeObserver(checkScroll);
    resizeObs.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      resizeObs.disconnect();
    };
  }, [checkScroll, filteredMenu.length]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeftStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    el.scrollLeft = scrollLeftStart.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "";
      el.style.userSelect = "";
    }
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) handleMouseUp();
  }, [handleMouseUp]);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <nav
      className="horizontal-nav hidden border-b lg:block"
    >
      <div className="flex items-center">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="horizontal-scroll-btn flex-shrink-0 flex h-full items-center justify-center px-2"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="horizontal-scroll-area flex flex-1 items-center gap-1 overflow-x-auto px-4 py-1"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClickCapture={handleClickCapture}
        >
          {filteredMenu.map((item) => (
            <HorizontalMenuItem
              key={item.name}
              item={item}
              t={t}
              i18n={i18n}
              roleID={roleID}
              currentPath={location.pathname}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="horizontal-scroll-btn flex-shrink-0 flex h-full items-center justify-center px-2"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </nav>
  );
};

interface HorizontalMenuItemProps {
  item: MenuItem;
  t: (key: string) => string;
  i18n: { dir: () => string };
  roleID: number;
  currentPath: string;
}

const HorizontalMenuItem = ({
  item,
  t,
  i18n,
  roleID,
  currentPath,
}: HorizontalMenuItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isActive =
    currentPath === item.path ||
    item.subMenu?.some((sub) => currentPath === sub.path);

  const activeClass = isActive
    ? "horizontal-nav-item horizontal-nav-item-active"
    : "horizontal-nav-item";

  if (!hasSubMenu) {
    return (
      <NavLink
        to={item.path}
        className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeClass}`}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span>{t(item.title)}</span>
      </NavLink>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeClass}`}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span>{t(item.title)}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <HorizontalDropdown anchorRef={ref} isRtl={i18n.dir() === "rtl"} onClose={() => setOpen(false)}>
        {item.subMenu
          ?.filter((sub) => sub.allowedRoles.includes(roleID))
          .map((sub) => (
            <NavLink
              key={sub.name}
              to={sub.path}
              onClick={() => setOpen(false)}
              className={`horizontal-dropdown-item block px-4 py-2.5 text-sm transition-colors ${
                currentPath === sub.path
                  ? "horizontal-dropdown-item-active"
                  : ""
              }`}
            >
              {t(sub.title)}
            </NavLink>
          ))}
      </HorizontalDropdown>}
    </div>
  );
};

const HorizontalDropdown = ({
  anchorRef,
  isRtl,
  onClose,
  children,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  isRtl: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4,
      left: isRtl ? rect.right : rect.left,
    });
  }, [anchorRef, isRtl]);

  useEffect(() => {
    if (!dropdownRef.current || !pos) return;
    const dropRect = dropdownRef.current.getBoundingClientRect();
    let newLeft = pos.left;
    if (!isRtl && dropRect.right > window.innerWidth - 8) {
      newLeft = pos.left - (dropRect.right - window.innerWidth + 8);
    }
    if (isRtl && dropRect.left < 8) {
      newLeft = pos.left + (8 - dropRect.left);
    }
    if (newLeft !== pos.left) {
      setPos((prev) => (prev ? { ...prev, left: newLeft } : prev));
    }
  }, [pos, isRtl]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose, anchorRef]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="horizontal-dropdown fixed z-[9999] min-w-[200px] overflow-hidden rounded-lg shadow-lg"
      style={{
        top: pos.top,
        ...(isRtl ? { right: window.innerWidth - pos.left } : { left: pos.left }),
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default HorizontalNav;
