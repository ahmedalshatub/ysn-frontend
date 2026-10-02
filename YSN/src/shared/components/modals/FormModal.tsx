import Modal from "./Modal";
import type { ModalSize } from "./Modal";
import Button from "../buttons/Button";
import XIcon from "../../../assets/icons/XIcon";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  subtitle?: string;
  size?: ModalSize;
  submitText?: string;
  cancelText?: string;
  submitVariant?: "primary" | "success" | "danger" | "warning" | "info" | "dark";
  loading?: boolean;
  disabled?: boolean;
  showFooter?: boolean;
  showDivider?: boolean;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  footerExtra?: React.ReactNode;
  closable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormModal = ({
  open,
  onClose,
  onSubmit,
  title,
  subtitle,
  size = "lg",
  submitText = "Save",
  cancelText = "Cancel",
  submitVariant = "primary",
  loading = false,
  disabled = false,
  showFooter = true,
  showDivider = true,
  icon,
  headerAction,
  footerExtra,
  closable = true,
  children,
  className = "",
}: FormModalProps) => {
  const handleSubmit = () => {
    if (!loading && !disabled && onSubmit) onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      closeOnOverlay={closable && !loading}
      closeOnEsc={closable && !loading}
      showCloseButton={false}
      className={className}
    >
      <div className="form-modal">
        <div className="form-modal-header">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <div className="form-modal-header-icon">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="form-modal-title">{title}</h3>
              {subtitle && <p className="form-modal-subtitle">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {headerAction}
            {closable && (
              <Button
                variant="secondary"
                outline
                size="sm"
                iconOnly
                icon={<XIcon className="w-5 h-5" />}
                onClick={onClose}
                disabled={loading}
                className="form-modal-close"
              />
            )}
          </div>
        </div>

        {showDivider && <div className="form-modal-divider" />}

        <div className="form-modal-body">
          {children}
        </div>

        {showFooter && (
          <>
            {showDivider && <div className="form-modal-divider" />}
            <div className="form-modal-footer">
              {footerExtra && <div className="form-modal-footer-extra">{footerExtra}</div>}
              <div className="form-modal-footer-actions">
                {closable && (
                  <Button
                    variant="danger"
                    outline
                    size="md"
                    onClick={onClose}
                    disabled={loading}
                    label={cancelText}
                  />
                )}
                <Button
                  variant={submitVariant}
                  size="md"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading || disabled}
                  label={submitText}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export type { FormModalProps };
export default FormModal;
