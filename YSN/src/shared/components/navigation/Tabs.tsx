import React, { useState, useRef, useEffect, useCallback } from "react";

type TabsVariant = "line" | "pills";
type TabsSize = "sm" | "md" | "lg";
type TabsColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  variant?: TabsVariant;
  size?: TabsSize;
  color?: TabsColor;
  fullWidth?: boolean;
  animated?: boolean;
  className?: string;
  onChange?: (tabId: string) => void;
}

const sizeClasses: Record<TabsSize, { tab: string; text: string; icon: string; badge: string; gap: string }> = {
  sm: { tab: "px-3 py-1.5", text: "text-xs", icon: "w-3.5 h-3.5", badge: "text-[9px] leading-none px-1.5 min-w-[16px] h-[16px] inline-flex items-center justify-center", gap: "gap-1.5" },
  md: { tab: "px-4 py-2.5", text: "text-sm", icon: "w-4 h-4", badge: "text-[10px] leading-none px-1.5 min-w-[18px] h-[18px] inline-flex items-center justify-center", gap: "gap-2" },
  lg: { tab: "px-5 py-3", text: "text-base", icon: "w-5 h-5", badge: "text-[11px] leading-none px-2 min-w-[20px] h-[20px] inline-flex items-center justify-center", gap: "gap-2" },
};

const colorMap: Record<TabsColor, { line: string; lineHover: string; pillActive: string; pillHover: string; badgeActive: string; badgeInactive: string }> = {
  primary: { line: "tab-line-primary", lineHover: "tab-line-hover-primary", pillActive: "tab-pill-primary", pillHover: "tab-pill-hover-primary", badgeActive: "tab-badge-active-primary", badgeInactive: "tab-badge-inactive-primary" },
  secondary: { line: "tab-line-secondary", lineHover: "tab-line-hover-secondary", pillActive: "tab-pill-secondary", pillHover: "tab-pill-hover-secondary", badgeActive: "tab-badge-active-secondary", badgeInactive: "tab-badge-inactive-secondary" },
  success: { line: "tab-line-success", lineHover: "tab-line-hover-success", pillActive: "tab-pill-success", pillHover: "tab-pill-hover-success", badgeActive: "tab-badge-active-success", badgeInactive: "tab-badge-inactive-success" },
  danger: { line: "tab-line-danger", lineHover: "tab-line-hover-danger", pillActive: "tab-pill-danger", pillHover: "tab-pill-hover-danger", badgeActive: "tab-badge-active-danger", badgeInactive: "tab-badge-inactive-danger" },
  warning: { line: "tab-line-warning", lineHover: "tab-line-hover-warning", pillActive: "tab-pill-warning", pillHover: "tab-pill-hover-warning", badgeActive: "tab-badge-active-warning", badgeInactive: "tab-badge-inactive-warning" },
  info: { line: "tab-line-info", lineHover: "tab-line-hover-info", pillActive: "tab-pill-info", pillHover: "tab-pill-hover-info", badgeActive: "tab-badge-active-info", badgeInactive: "tab-badge-inactive-info" },
  dark: { line: "tab-line-dark", lineHover: "tab-line-hover-dark", pillActive: "tab-pill-dark", pillHover: "tab-pill-hover-dark", badgeActive: "tab-badge-active-dark", badgeInactive: "tab-badge-inactive-dark" },
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  variant = "line",
  size = "md",
  color = "primary",
  fullWidth = false,
  animated = true,
  className,
  onChange,
}) => {
  const [internalActive, setInternalActive] = useState(defaultTab || tabs[0]?.id || "");
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const activeId = controlledActive ?? internalActive;
  const config = sizeClasses[size];
  const colors = colorMap[color];

  const handleTabClick = useCallback((tabId: string) => {
    if (dragState.current.moved) return;
    if (!controlledActive) {
      setInternalActive(tabId);
    }
    onChange?.(tabId);
  }, [controlledActive, onChange]);

  useEffect(() => {
    const activeEl = tabRefs.current.get(activeId);
    if (activeEl && tabsRef.current) {
      const container = tabsRef.current;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      if (elLeft < scrollLeft) {
        container.scrollTo({ left: elLeft - 16, behavior: "smooth" });
      } else if (elLeft + elWidth > scrollLeft + containerWidth) {
        container.scrollTo({ left: elLeft + elWidth - containerWidth + 16, behavior: "smooth" });
      }
    }
  }, [activeId]);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const ds = dragState.current;

    const onMouseDown = (e: MouseEvent) => {
      ds.isDown = true;
      ds.moved = false;
      ds.startX = e.pageX - el.offsetLeft;
      ds.scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMouseLeave = () => {
      ds.isDown = false;
      el.style.cursor = "";
    };
    const onMouseUp = () => {
      ds.isDown = false;
      el.style.cursor = "";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!ds.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - ds.startX) * 1.5;
      if (Math.abs(walk) > 3) ds.moved = true;
      el.scrollLeft = ds.scrollLeft - walk;
    };

    const onTouchStart = (e: TouchEvent) => {
      ds.isDown = true;
      ds.moved = false;
      ds.startX = e.touches[0].pageX - el.offsetLeft;
      ds.scrollLeft = el.scrollLeft;
    };
    const onTouchEnd = () => {
      ds.isDown = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!ds.isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - ds.startX) * 1.5;
      if (Math.abs(walk) > 3) ds.moved = true;
      el.scrollLeft = ds.scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const activeTabData = tabs.find((t) => t.id === activeId);

  const renderTabButton = (tab: TabItem) => {
    const isActive = tab.id === activeId;
    const isDisabled = tab.disabled;

    if (variant === "pills") {
      return (
        <button
          key={tab.id}
          ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
          className={`tabs-item flex items-center ${config.gap} ${config.tab} ${config.text} font-medium rounded-lg ${
            isActive
              ? `${colors.pillActive} shadow-sm ${animated ? "tabs-pill-active" : ""}`
              : isDisabled
                ? "tab-disabled cursor-not-allowed"
                : `tab-inactive ${colors.pillHover}`
          } ${fullWidth ? "flex-1 justify-center" : ""}`}
          onClick={() => !isDisabled && handleTabClick(tab.id)}
          disabled={isDisabled}
        >
          {tab.icon && <span className={config.icon}>{tab.icon}</span>}
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <span className={`tabs-badge rounded-full font-semibold ${config.badge} ${isActive ? colors.badgeActive : colors.badgeInactive}`}>
              {tab.badge}
            </span>
          )}
        </button>
      );
    }

    return (
      <button
        key={tab.id}
        ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
        className={`tabs-item flex items-center ${config.gap} ${config.tab} ${config.text} font-medium border-b-2 ${
          isActive
            ? colors.line
            : isDisabled
              ? "tab-disabled border-transparent cursor-not-allowed"
              : `tab-inactive border-transparent ${colors.lineHover}`
        } ${fullWidth ? "flex-1 justify-center" : ""}`}
        onClick={() => !isDisabled && handleTabClick(tab.id)}
        disabled={isDisabled}
      >
        {tab.icon && <span className={config.icon}>{tab.icon}</span>}
        <span>{tab.label}</span>
        {tab.badge !== undefined && (
          <span className={`tabs-badge rounded-full font-semibold ${config.badge} ${isActive ? colors.badgeInactive : "tab-badge-neutral"}`}>
            {tab.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={className || ""}>
      {variant === "pills" ? (
        <div
          ref={tabsRef}
          className={`tabs-scroll flex items-center gap-1 w-full p-1 tabs-pills-wrapper rounded-xl`}
        >
          {tabs.map(renderTabButton)}
        </div>
      ) : (
        <div className="relative">
          <div
            ref={tabsRef}
            className={`tabs-scroll flex items-center w-full tabs-line-border`}
          >
            {tabs.map(renderTabButton)}
          </div>
        </div>
      )}

      {activeTabData?.content && (
        <div className={`mt-4 ${animated ? "tabs-content-enter" : ""}`} key={activeId}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export type { TabItem };
export default Tabs;
