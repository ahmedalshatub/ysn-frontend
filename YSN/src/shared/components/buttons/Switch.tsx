import React from "react";

type SwitchVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type SwitchSize = "sm" | "md" | "lg";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: SwitchVariant;
  size?: SwitchSize;
  label?: string;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  name?: string;
  id?: string;
  containerClassName?: string;
}

const variantOnStyles: Record<SwitchVariant, string> = {
  primary: "switch-variant-primary",
  secondary: "switch-variant-secondary",
  danger: "switch-variant-danger",
  success: "switch-variant-success",
  warning: "switch-variant-warning",
  info: "switch-variant-info",
  dark: "switch-variant-dark",
};

const variantOffStyle = "switch-variant-off";

const labelSizeStyles: Record<SwitchSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  variant = "primary",
  size = "md",
  label,
  labelPosition = "right",
  disabled = false,
  name,
  id,
  containerClassName = "",
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isOn = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  const trackClass = [
    "switch-track",
    `switch-${size}`,
    isOn ? `switch-on ${variantOnStyles[variant]}` : variantOffStyle,
    disabled ? "switch-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const switchElement = (
    <div
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={trackClass}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      id={id}
    >
      <span className="switch-thumb" />
      {name && (
        <input type="checkbox" name={name} checked={isOn} readOnly hidden />
      )}
    </div>
  );

  if (label) {
    return (
      <label
        className={`switch-wrapper ${disabled ? "switch-wrapper-disabled" : ""} ${containerClassName}`}
      >
        {labelPosition === "left" && (
          <span className={`select-none switch-label ${labelSizeStyles[size]}`}>{label}</span>
        )}
        {switchElement}
        {labelPosition === "right" && (
          <span className={`select-none switch-label ${labelSizeStyles[size]}`}>{label}</span>
        )}
      </label>
    );
  }

  if (containerClassName) {
    return <div className={containerClassName}>{switchElement}</div>;
  }

  return switchElement;
};

export default Switch;
