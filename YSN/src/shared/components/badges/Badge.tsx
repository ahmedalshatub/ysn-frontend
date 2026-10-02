import React from "react";
import XIcon from "../../../assets/icons/XIcon";

type BadgeVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark" | "light";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  outline?: boolean;
  size?: BadgeSize;
  pill?: boolean;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  removable?: boolean;
  onRemove?: () => void;
  containerClassName?: string;
  children?: React.ReactNode;
}

const solidStyles: Record<BadgeVariant, string> = {
  primary: "badge-solid-primary",
  secondary: "badge-solid-secondary",
  danger: "badge-solid-danger",
  success: "badge-solid-success",
  warning: "badge-solid-warning",
  info: "badge-solid-info",
  dark: "badge-solid-dark",
  light: "badge-solid-light",
};

const outlineStyles: Record<BadgeVariant, string> = {
  primary: "badge-outline-primary",
  secondary: "badge-outline-secondary",
  danger: "badge-outline-danger",
  success: "badge-outline-success",
  warning: "badge-outline-warning",
  info: "badge-outline-info",
  dark: "badge-outline-dark",
  light: "badge-outline-light",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

const removeBtnSize: Record<BadgeSize, string> = {
  sm: "ml-1 -mr-0.5 h-3.5 w-3.5",
  md: "ml-1.5 -mr-1 h-4 w-4",
  lg: "ml-2 -mr-1 h-5 w-5",
};

const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  outline = false,
  size = "md",
  pill = false,
  label,
  icon,
  iconPosition = "left",
  removable = false,
  onRemove,
  containerClassName = "",
  children,
}) => {
  const variantClass = outline ? outlineStyles[variant] : solidStyles[variant];

  const baseClass = [
    "inline-flex items-center font-medium transition-all duration-200 ease-in-out",
    variantClass,
    sizeStyles[size],
    pill ? "rounded-full" : "rounded-md",
    removable ? "badge-removable" : "",
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const text = label || children;

  return (
    <span className={baseClass}>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0 mr-1">{icon}</span>}
      {text}
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0 ml-1">{icon}</span>}
      {removable && (
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-full hover:bg-black/20 transition-colors duration-150 cursor-pointer ${removeBtnSize[size]}`}
          onClick={onRemove}
          aria-label="Remove"
        >
          <XIcon className="h-full w-full" />
        </button>
      )}
    </span>
  );
};

export default Badge;
