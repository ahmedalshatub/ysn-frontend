import React from "react";

type ControlVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ControlVariant;
  filled?: boolean;
  icon: React.ReactNode;
  title: string;
  description?: string;
  selected?: boolean;
  containerClassName?: string;
}

const outlineStyles: Record<ControlVariant, string> = {
  primary: "ctrl-outline-primary",
  secondary: "ctrl-outline-secondary",
  danger: "ctrl-outline-danger",
  success: "ctrl-outline-success",
  warning: "ctrl-outline-warning",
  info: "ctrl-outline-info",
  dark: "ctrl-outline-dark",
};

const filledStyles: Record<ControlVariant, string> = {
  primary: "ctrl-filled-primary",
  secondary: "ctrl-filled-secondary",
  danger: "ctrl-filled-danger",
  success: "ctrl-filled-success",
  warning: "ctrl-filled-warning",
  info: "ctrl-filled-info",
  dark: "ctrl-filled-dark",
};

const outlineDescStyles: Record<ControlVariant, string> = {
  primary: "ctrl-desc-outline",
  secondary: "ctrl-desc-outline",
  danger: "ctrl-desc-outline",
  success: "ctrl-desc-outline",
  warning: "ctrl-desc-outline",
  info: "ctrl-desc-outline",
  dark: "ctrl-desc-outline",
};

const filledDescStyles: Record<ControlVariant, string> = {
  primary: "ctrl-desc-filled-primary",
  secondary: "ctrl-desc-filled-secondary",
  danger: "ctrl-desc-filled-danger",
  success: "ctrl-desc-filled-success",
  warning: "ctrl-desc-filled-warning",
  info: "ctrl-desc-filled-info",
  dark: "ctrl-desc-filled-dark",
};

const selectedRingStyles: Record<ControlVariant, string> = {
  primary: "ctrl-ring-primary",
  secondary: "ctrl-ring-secondary",
  danger: "ctrl-ring-danger",
  success: "ctrl-ring-success",
  warning: "ctrl-ring-warning",
  info: "ctrl-ring-info",
  dark: "ctrl-ring-dark",
};

const ControlButton: React.FC<ControlButtonProps> = ({
  variant = "primary",
  filled = false,
  icon,
  title,
  description,
  selected = false,
  disabled = false,
  containerClassName = "",
  className = "",
  ...rest
}) => {
  const variantClass = filled ? filledStyles[variant] : outlineStyles[variant];
  const descClass = filled ? filledDescStyles[variant] : outlineDescStyles[variant];

  const baseClass = [
    "flex flex-col items-center justify-center gap-2 rounded-xl p-6 min-w-[120px] aspect-square transition-all duration-200 ease-in-out focus:outline-none",
    variantClass,
    selected ? selectedRingStyles[variant] : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const button = (
    <button
      className={baseClass}
      disabled={disabled}
      {...rest}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold leading-tight text-center">{title}</span>
      {description && (
        <span className={`text-xs leading-tight text-center ${descClass}`}>{description}</span>
      )}
    </button>
  );

  if (containerClassName) {
    return <div className={containerClassName}>{button}</div>;
  }

  return button;
};

export default ControlButton;
