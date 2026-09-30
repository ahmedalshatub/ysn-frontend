import React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "link";

type Size = "sm" | "md" | "lg";
type TooltipPosition = "top" | "bottom" | "left" | "right";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  outline?: boolean;
  size?: Size;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
  loading?: boolean;
  block?: boolean;
  containerClassName?: string;
}

const solidStyles: Record<Variant, string> = {
  primary: "btn-solid-primary",
  secondary: "btn-solid-secondary",
  danger: "btn-solid-danger",
  success: "btn-solid-success",
  warning: "btn-solid-warning",
  info: "btn-solid-info",
  dark: "btn-solid-dark",
  light: "btn-solid-light",
  link: "btn-solid-link",
};

const outlineStyles: Record<Variant, string> = {
  primary: "btn-outline-primary",
  secondary: "btn-outline-secondary",
  danger: "btn-outline-danger",
  success: "btn-outline-success",
  warning: "btn-outline-warning",
  info: "btn-outline-info",
  dark: "btn-outline-dark",
  light: "btn-outline-light",
  link: "btn-outline-link",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const iconOnlySizeStyles: Record<Size, string> = {
  sm: "p-1.5 text-sm",
  md: "p-2 text-base",
  lg: "p-3 text-lg",
};

function getSpinnerClass(variant: Variant, outline: boolean): string {
  if (outline) return "btn-spinner-dark";
  if (variant === "light" || variant === "warning") return "btn-spinner-dark";
  if (variant === "link") return "btn-spinner-link";
  return "btn-spinner";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  outline = false,
  size = "md",
  label,
  icon,
  iconPosition = "left",
  iconOnly = false,
  tooltip,
  tooltipPosition = "top",
  loading = false,
  disabled = false,
  block = false,
  containerClassName = "",
  className = "",
  children,
  ...rest
}) => {
  const variantClass = outline ? outlineStyles[variant] : solidStyles[variant];
  const sizeClass = iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size];

  const baseClass = [
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 btn-focus-ring relative",
    variantClass,
    sizeClass,
    block ? "w-full" : "",
    (disabled || loading) ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const spinnerClass = getSpinnerClass(variant, outline);

  const content = (
    <>
      {loading && <span className={spinnerClass} />}
      <span className={`inline-flex items-center gap-2 ${loading ? "invisible" : ""}`}>
        {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
        {!iconOnly && (label || children) && <span>{label || children}</span>}
        {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
      </span>
    </>
  );

  const button = (
    <button
      className={baseClass}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );

  if (tooltip) {
    return (
      <div className={`tooltip-wrapper ${containerClassName}`}>
        {button}
        <span className={`tooltip-content tooltip-${tooltipPosition}`}>
          {tooltip}
        </span>
      </div>
    );
  }

  if (containerClassName) {
    return <div className={containerClassName}>{button}</div>;
  }

  return button;
};

export default Button;
