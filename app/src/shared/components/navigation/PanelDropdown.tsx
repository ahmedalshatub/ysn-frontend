import React from "react";
import ReactDOM from "react-dom";

type PanelDropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

interface PanelDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: PanelDropdownPlacement;
  width?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnFooterClick?: boolean;
}

const PanelDropdown: React.FC<PanelDropdownProps> = ({
  trigger,
  children,
  placement = "bottom-end",
  width = "w-80",
  header,
  footer,
  closeOnFooterClick = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
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
    "dropdown-menu fixed z-[9999] rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden",
    width,
    "dropdown-menu-open",
    isUpward ? "dropdown-menu-up" : "",
  ].join(" ");

  return (
    <div className="inline-block">
      <div ref={triggerRef} onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && ReactDOM.createPortal(
        <div ref={menuRef} className={menuClasses} style={menuStyle}>
          {header && (
            <div className="dropdown-panel-header px-4 py-3">
              {header}
            </div>
          )}
          <div className="overflow-y-auto dropdown-menu-scroll max-h-80">
            {children}
          </div>
          {footer && (
            <div
              className="dropdown-panel-footer"
              onClick={closeOnFooterClick ? () => setOpen(false) : undefined}
            >
              {footer}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default PanelDropdown;
