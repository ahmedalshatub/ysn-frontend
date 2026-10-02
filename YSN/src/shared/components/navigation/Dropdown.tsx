import React from "react";
import ReactDOM from "react-dom";
import CheckIcon from "../../../assets/icons/CheckIcon";

type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";
type DropdownSize = "sm" | "md" | "lg";
type DropdownItemVariant = "default" | "danger" | "success" | "warning";

interface DropdownMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  variant?: DropdownItemVariant;
  disabled?: boolean;
  active?: boolean;
}

interface DropdownMenuDivider {
  key: string;
  divider: true;
}

interface DropdownMenuHeader {
  key: string;
  header: string;
}

type DropdownMenuEntry = DropdownMenuItem | DropdownMenuDivider | DropdownMenuHeader;

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownMenuEntry[];
  placement?: DropdownPlacement;
  size?: DropdownSize;
  width?: string;
  maxHeight?: string;
  onSelect?: (key: string) => void;
  closeOnSelect?: boolean;
}

const sizeConfig: Record<DropdownSize, { item: string; icon: string; text: string; descText: string; padding: string }> = {
  sm: { item: "px-3 py-1.5", icon: "w-4 h-4", text: "text-xs", descText: "text-[10px]", padding: "py-1" },
  md: { item: "px-3.5 py-2", icon: "w-4.5 h-4.5", text: "text-sm", descText: "text-xs", padding: "py-1.5" },
  lg: { item: "px-4 py-2.5", icon: "w-5 h-5", text: "text-sm", descText: "text-xs", padding: "py-2" },
};

const itemVariantClasses: Record<DropdownItemVariant, { base: string; hover: string; icon: string }> = {
  default: { base: "dropdown-item-default", hover: "", icon: "dropdown-item-default-icon" },
  danger: { base: "dropdown-item-danger-style", hover: "", icon: "dropdown-item-danger-icon" },
  success: { base: "dropdown-item-success-style", hover: "", icon: "dropdown-item-success-icon" },
  warning: { base: "dropdown-item-warning-style", hover: "", icon: "dropdown-item-warning-icon" },
};

const isMenuItem = (entry: DropdownMenuEntry): entry is DropdownMenuItem => {
  return !("divider" in entry) && !("header" in entry);
};

const isDivider = (entry: DropdownMenuEntry): entry is DropdownMenuDivider => {
  return "divider" in entry && entry.divider === true;
};

const isHeader = (entry: DropdownMenuEntry): entry is DropdownMenuHeader => {
  return "header" in entry;
};

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  placement = "bottom-start",
  size = "md",
  width = "min-w-[200px]",
  maxHeight = "max-h-72",
  onSelect,
  closeOnSelect = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const sizes = sizeConfig[size];
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" });

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        menuRef.current && !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
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
      const isUp = placement.startsWith("top");
      const isEnd = placement.endsWith("end");

      let top: number | undefined;
      let bottom: number | undefined;
      if (isUp) {
        if (rect.top - 6 - menuH < 0) {
          top = Math.min(rect.bottom + 6, vh - menuH - 8);
        } else {
          bottom = vh - rect.top + 6;
        }
      } else {
        if (rect.bottom + 6 + menuH > vh && rect.top - 6 - menuH > 0) {
          bottom = vh - rect.top + 6;
        } else {
          top = Math.min(rect.bottom + 6, vh - menuH - 8);
        }
      }

      let left: number | undefined;
      let right: number | undefined;
      if (isEnd) {
        right = vw - rect.right;
        if (rect.right - menuW < 0) { right = undefined; left = 8; }
      } else {
        left = rect.left;
        if (rect.left + menuW > vw) { left = undefined; right = 8; }
      }

      setMenuStyle({ top, bottom, left, right, visibility: "visible" });
    });
  }, [open, placement]);

  const isUpward = placement.startsWith("top");

  const menuClasses = [
    "dropdown-menu fixed z-[9999] rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden",
    width,
    sizes.padding,
    "dropdown-menu-open",
    isUpward ? "dropdown-menu-up" : "",
  ].join(" ");

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onSelect?.(item.key);
    if (closeOnSelect) setOpen(false);
  };

  const renderEntry = (entry: DropdownMenuEntry) => {
    if (isDivider(entry)) {
      return <div key={entry.key} className="my-1 border-t dropdown-divider" />;
    }

    if (isHeader(entry)) {
      return (
        <div key={entry.key} className="px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider dropdown-header-text">
          {entry.header}
        </div>
      );
    }

    if (isMenuItem(entry)) {
      const variant = entry.variant || "default";
      const variantStyle = itemVariantClasses[variant];

      const itemClasses = [
        "group flex items-start gap-2.5 w-full rounded-lg transition-colors duration-100",
        sizes.item,
        sizes.text,
        variantStyle.base,
        entry.disabled ? "opacity-40 cursor-not-allowed" : `cursor-pointer ${variantStyle.hover}`,
        entry.active ? "dropdown-item-active dropdown-item-active-bg font-medium" : "",
      ].join(" ");

      return (
        <button
          key={entry.key}
          type="button"
          className={itemClasses}
          onClick={() => handleItemClick(entry)}
          disabled={entry.disabled}
        >
          {entry.icon && (
            <span className={`flex-shrink-0 mt-0.5 ${sizes.icon} ${entry.active ? "dropdown-item-active-icon" : variantStyle.icon}`}>
              {entry.icon}
            </span>
          )}
          <div className="min-w-0 flex-1 text-start">
            <span className="block truncate">{entry.label}</span>
            {entry.description && (
              <span className={`block ${sizes.descText} dropdown-item-desc mt-0.5 truncate`}>
                {entry.description}
              </span>
            )}
          </div>
          {entry.active && (
            <CheckIcon className="w-4 h-4 flex-shrink-0 dropdown-item-active-icon mt-0.5" />
          )}
        </button>
      );
    }

    return null;
  };

  return (
    <div className="inline-block">
      <div ref={triggerRef} onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && ReactDOM.createPortal(
        <div ref={menuRef} className={menuClasses} style={menuStyle}>
          <div className={`overflow-y-auto dropdown-menu-scroll ${maxHeight}`}>
            {items.map(renderEntry)}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export type { DropdownMenuItem, DropdownMenuDivider, DropdownMenuHeader, DropdownMenuEntry };
export default Dropdown;
