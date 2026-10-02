import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import XIcon from "../../../assets/icons/XIcon";
import Button from "../buttons/Button";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-7xl",
};

const Modal = ({
  open,
  onClose,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  children,
  className = "",
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      const main = document.querySelector<HTMLElement>("main");
      if (main) main.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        if (main) main.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`modal-content ${sizeClasses[size]} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <Button
            variant="secondary"
            outline
            size="sm"
            iconOnly
            icon={<XIcon className="w-5 h-5" />}
            onClick={onClose}
            className="modal-close-btn"
          />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export type { ModalProps, ModalSize };
export default Modal;
