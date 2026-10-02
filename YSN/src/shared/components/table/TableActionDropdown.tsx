import React from "react";
import ReactDOM from "react-dom";

interface DropdownActionItem {
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
  divider?: boolean;
}

interface TableActionDropdownProps {
  actions: DropdownActionItem[];
  size?: "sm" | "md" | "lg";
  position?: "left" | "right";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-10 h-10",
};

const dotSize = {
  sm: "w-[3px] h-[3px]",
  md: "w-1 h-1",
  lg: "w-1 h-1",
};

const menuWidthClasses = {
  sm: "min-w-[140px]",
  md: "min-w-[160px]",
  lg: "min-w-[180px]",
};

const TableActionDropdown: React.FC<TableActionDropdownProps> = ({
  actions,
  size = "md",
  position = "right",
}) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = React.useState<React.CSSProperties>({ visibility: "hidden" });

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        menuRef.current && !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open]);

  React.useLayoutEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      if (!triggerRef.current || !menuRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const menuH = menuRef.current.offsetHeight;
      const menuW = menuRef.current.offsetWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top: number | undefined;
      let bottom: number | undefined;
      if (rect.bottom + 4 + menuH > vh && rect.top - 4 - menuH > 0) {
        bottom = vh - rect.top + 4;
      } else {
        top = Math.min(rect.bottom + 4, vh - menuH - 8);
      }

      let left: number | undefined;
      let right: number | undefined;
      if (position === "right") {
        right = vw - rect.right;
        if (rect.right - menuW < 0) { right = undefined; left = 8; }
      } else {
        left = rect.left;
        if (rect.left + menuW > vw) { left = undefined; right = 8; }
      }

      setMenuPos({ top, bottom, left, right, visibility: "visible" });
    });
  }, [open, position]);

  const triggerClass = [
    "inline-flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer",
    sizeClasses[size],
    open
      ? "table-action-open table-action-trigger"
      : "table-action-trigger",
  ].join(" ");

  const dropdownClass = [
    "select-dropdown fixed z-[9999] rounded-xl shadow-lg ring-1 ring-black/5 py-1 select-options",
    menuWidthClasses[size],
    "select-open",
  ].join(" ");

  return (
    <div className="inline-block">
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        onClick={() => setOpen(!open)}
      >
        <span className="flex flex-col items-center justify-center gap-[3px]">
          <span className={`${dotSize[size]} rounded-full bg-current`} />
          <span className={`${dotSize[size]} rounded-full bg-current`} />
          <span className={`${dotSize[size]} rounded-full bg-current`} />
        </span>
      </button>

      {open && ReactDOM.createPortal(
        <div ref={menuRef} className={dropdownClass} style={menuPos}>
          {actions.map((action, idx) => {
            if (action.divider) {
              return <div key={idx} className="my-1 border-t table-action-divider" />;
            }

            const itemClass = [
              "flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors duration-100",
              action.variant === "danger"
                ? "table-action-item-danger"
                : "table-action-item",
              action.disabled
                ? "opacity-40 pointer-events-none"
                : "cursor-pointer",
            ].join(" ");

            return (
              <button
                key={idx}
                type="button"
                className={itemClass}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                disabled={action.disabled}
              >
                {action.icon && (
                  <span className="w-4 h-4 flex-shrink-0">{action.icon}</span>
                )}
                {action.label && <span>{action.label}</span>}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
};

export type { DropdownActionItem };
export default TableActionDropdown;
