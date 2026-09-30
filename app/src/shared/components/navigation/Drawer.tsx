import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../buttons/Button";
import XIcon from "../../../assets/icons/XIcon";

type DrawerPosition = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showOverlay?: boolean;
  showDivider?: boolean;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const horizontalSizes: Record<DrawerSize, string> = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
  xl: "max-w-lg",
  full: "max-w-full",
};

const verticalSizes: Record<DrawerSize, string> = {
  sm: "max-h-[25vh]",
  md: "max-h-[40vh]",
  lg: "max-h-[55vh]",
  xl: "max-h-[70vh]",
  full: "max-h-full",
};

const Drawer = ({
  open,
  onClose,
  position = "right",
  size = "md",
  title,
  subtitle,
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  showOverlay = true,
  showDivider = true,
  icon,
  footer,
  children,
  className = "",
}: DrawerProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else if (shouldRender) {
      setAnimateOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (shouldRender && open) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateOpen(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [shouldRender, open]);

  useEffect(() => {
    if (shouldRender && !open) {
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) onClose();
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === overlayRef.current) onClose();
  };

  const isHorizontal = position === "left" || position === "right";
  const sizeClass = isHorizontal ? horizontalSizes[size] : verticalSizes[size];

  const positionClasses: Record<DrawerPosition, string> = {
    right: `drawer-right ${sizeClass}`,
    left: `drawer-left ${sizeClass}`,
    top: `drawer-top ${sizeClass}`,
    bottom: `drawer-bottom ${sizeClass}`,
  };

  const animationClass = animateOpen ? "drawer-open" : "drawer-closed";

  if (!shouldRender) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={`drawer-overlay ${showOverlay ? "" : "drawer-overlay-transparent"}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`drawer-panel ${positionClasses[position]} ${animationClass} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {(title || showCloseButton) && (
          <div className="drawer-header">
            <div className="flex items-center gap-3 min-w-0">
              {icon && <div className="drawer-header-icon">{icon}</div>}
              <div className="min-w-0">
                {title && <h3 className="drawer-title">{title}</h3>}
                {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
              </div>
            </div>
            {showCloseButton && (
              <Button
                variant="secondary"
                outline
                size="sm"
                iconOnly
                icon={<XIcon className="w-5 h-5" />}
                onClick={onClose}
                className="drawer-close-btn"
              />
            )}
          </div>
        )}

        {showDivider && title && <div className="drawer-divider" />}

        <div className="drawer-body">
          {children}
        </div>

        {footer && (
          <>
            {showDivider && <div className="drawer-divider" />}
            <div className="drawer-footer">{footer}</div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export type { DrawerProps, DrawerPosition, DrawerSize };
export default Drawer;
