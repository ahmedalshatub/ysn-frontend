import { useState, useEffect, useCallback } from "react";
import InfoIcon from "../../../assets/icons/InfoIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import TriangleAlertIcon from "../../../assets/icons/TriangleAlertIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import XIcon from "../../../assets/icons/XIcon";

type MessageVariant = "info" | "success" | "warning" | "danger";

interface MessageProps {
  variant?: MessageVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  showIcon?: boolean;
  bordered?: boolean;
  filled?: boolean;
  onClose?: () => void;
  autoClose?: number;
  className?: string;
}

const defaultIcons: Record<MessageVariant, React.ReactNode> = {
  info: <InfoIcon width={18} height={18} />,
  success: <CheckCircleIcon width={18} height={18} />,
  warning: <TriangleAlertIcon width={18} height={18} />,
  danger: <XCircleIcon width={18} height={18} />,
};

const Message = ({
  variant = "info",
  title,
  children,
  icon,
  closable = false,
  showIcon = true,
  bordered = false,
  filled = false,
  onClose,
  autoClose,
  className = "",
}: MessageProps) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (autoClose && autoClose > 0) {
      const timer = setTimeout(handleClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, handleClose]);

  if (!visible) return null;

  return (
    <div
      className={`message message-${variant} ${bordered ? "message-bordered" : ""} ${filled ? "message-filled" : ""} ${closing ? "message-closing" : ""} ${className}`}
      role="alert"
    >
      {showIcon && (
        <div className="message-icon">
          {icon || defaultIcons[variant]}
        </div>
      )}
      <div className="message-content">
        {title && <div className="message-title">{title}</div>}
        <div className="message-text">{children}</div>
      </div>
      {closable && (
        <button type="button" className="message-close" onClick={handleClose}>
          <XIcon width={16} height={16} />
        </button>
      )}
    </div>
  );
};

export type { MessageProps, MessageVariant };
export default Message;
