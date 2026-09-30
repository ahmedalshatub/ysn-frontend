import Modal from "./Modal";
import type { ModalSize } from "./Modal";
import Button from "../buttons/Button";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import TriangleAlertIcon from "../../../assets/icons/TriangleAlertIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";

type AlertType = "info" | "success" | "warning" | "danger" | "confirm" | "delete";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type?: AlertType;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  size?: ModalSize;
  loading?: boolean;
  showCancel?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const typeConfig: Record<AlertType, {
  iconBg: string;
  iconColor: string;
  confirmBg: string;
  confirmVariant: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark" | "light" | "link";
  confirmHover: string;
  confirmActive: string;
  defaultTitle: string;
  defaultConfirm: string;
}> = {
  info: {
    iconBg: "alert-icon-bg-info",
    iconColor: "alert-icon-color-info",
    confirmBg: "alert-confirm-info",
    confirmVariant: "info",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Information",
    defaultConfirm: "Got it",
  },
  success: {
    iconBg: "alert-icon-bg-success",
    iconColor: "alert-icon-color-success",
    confirmBg: "alert-confirm-success",
    confirmVariant: "success",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Success",
    defaultConfirm: "Continue",
  },
  warning: {
    iconBg: "alert-icon-bg-warning",
    iconColor: "alert-icon-color-warning",
    confirmBg: "alert-confirm-warning",
    confirmVariant: "warning",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Warning",
    defaultConfirm: "Understood",
  },
  danger: {
    iconBg: "alert-icon-bg-danger",
    iconColor: "alert-icon-color-danger",
    confirmBg: "alert-confirm-danger",
    confirmVariant: "danger",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Error",
    defaultConfirm: "OK",
  },
  confirm: {
    iconBg: "alert-icon-bg-info",
    iconColor: "alert-icon-color-info",
    confirmBg: "alert-confirm-info",
    confirmVariant: "info",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Are you sure?",
    defaultConfirm: "Confirm",
  },
  delete: {
    iconBg: "alert-icon-bg-danger",
    iconColor: "alert-icon-color-danger",
    confirmBg: "alert-confirm-danger",
    confirmVariant: "danger",
    confirmHover: "",
    confirmActive: "",
    defaultTitle: "Delete Item",
    defaultConfirm: "Delete",
  },
};

const icons: Record<AlertType, React.ReactNode> = {
  info: <InfoIcon className="w-7 h-7" />,
  success: <CheckCircleIcon className="w-7 h-7" />,
  warning: <TriangleAlertIcon className="w-7 h-7" />,
  danger: <XCircleIcon className="w-7 h-7" />,
  confirm: <HelpCircleIcon className="w-7 h-7" />,
  delete: <TrashIcon className="w-7 h-7" />,
};

const AlertModal = ({
  open,
  onClose,
  onConfirm,
  type = "info",
  title,
  message,
  confirmText,
  cancelText,
  size = "sm",
  loading = false,
  showCancel = true,
  icon,
  children,
}: AlertModalProps) => {
  const config = typeConfig[type];
  const displayTitle = title || config.defaultTitle;
  const displayConfirm = confirmText || config.defaultConfirm;
  const displayCancel = cancelText || "Cancel";
  const showCancelBtn = showCancel && (type === "confirm" || type === "delete" || type === "warning");

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      showCloseButton={false}
      closeOnOverlay={!loading}
      closeOnEsc={!loading}
    >
      <div className="alert-modal-body">
        <div className={`alert-modal-icon-wrapper ${config.iconBg}`}>
          <div className={config.iconColor}>
            {icon || icons[type]}
          </div>
        </div>

        <h3 className="alert-modal-title">{displayTitle}</h3>

        {message && (
          <p className="alert-modal-message">{message}</p>
        )}

        {children && (
          <div className="alert-modal-content">{children}</div>
        )}

        <div className="alert-modal-actions">
          {showCancelBtn && (
            <Button
              variant="secondary"
              outline
              onClick={onClose}
              disabled={loading}
              label={displayCancel}
              className="alert-modal-btn"
            />
          )}
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
            label={displayConfirm}
            className={`alert-modal-btn ${showCancelBtn ? "" : "alert-modal-btn-full"}`}
          />
        </div>
      </div>
    </Modal>
  );
};

export type { AlertModalProps, AlertType };
export default AlertModal;
