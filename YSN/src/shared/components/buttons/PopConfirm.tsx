import React, { useState, useRef, useEffect, useCallback } from "react";
import AlertCircleIcon from "../../../assets/icons/AlertCircleIcon";

interface PopConfirmProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger" | "warning" | "success";
  icon?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const PopConfirm: React.FC<PopConfirmProps> = ({
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
  confirmVariant = "danger",
  icon,
  placement = "top",
  onConfirm,
  onCancel,
  disabled = false,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const defaultIcon = <AlertCircleIcon />;

  return (
    <div ref={containerRef} className={`popconfirm-wrapper ${className}`}>
      <div onClick={() => !disabled && setIsOpen(!isOpen)}>{children}</div>

      {isOpen && (
        <div className={`popconfirm popconfirm-${placement}`}>
          <div className="popconfirm-arrow" />
          <div className="popconfirm-content">
            <div className="popconfirm-header">
              <span className={`popconfirm-icon popconfirm-icon-${confirmVariant}`}>
                {icon || defaultIcon}
              </span>
              <span className="popconfirm-title">{title}</span>
            </div>
            {description && <p className="popconfirm-description">{description}</p>}
            <div className="popconfirm-actions">
              <button
                type="button"
                className="popconfirm-btn popconfirm-btn-cancel"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`popconfirm-btn popconfirm-btn-${confirmVariant}`}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopConfirm;
