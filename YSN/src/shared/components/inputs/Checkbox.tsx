import React from "react";
import CheckIcon from "../../../assets/icons/CheckIcon";

type CheckboxVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  name?: string;
}

const checkedStyles: Record<CheckboxVariant, string> = {
  primary: "checkbox-checked-primary",
  secondary: "checkbox-checked-secondary",
  danger: "checkbox-checked-danger",
  success: "checkbox-checked-success",
  warning: "checkbox-checked-warning",
  info: "checkbox-checked-info",
  dark: "checkbox-checked-dark",
};

const boxSizes: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconSizes: Record<CheckboxSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const labelSizes: Record<CheckboxSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const descSizes: Record<CheckboxSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  defaultChecked = false,
  onChange,
  variant = "primary",
  size = "md",
  label,
  description,
  disabled = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  name,
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  };

  const boxClass = [
    "relative flex-shrink-0 rounded border-2 transition-all duration-200 ease-in-out",
    boxSizes[size],
    isChecked ? checkedStyles[variant] : "",
    !isChecked && error ? "input-error" : "",
    !isChecked && !error ? "checkbox-unchecked" : "",
    isChecked ? "checkbox-checked" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1 ${containerClass}`}>
      <label
        className={`checkbox-wrapper ${disabled ? "checkbox-wrapper-disabled" : ""}`}
        onClick={(e) => e.preventDefault()}
      >
        <div
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          id={id}
          className={boxClass}
          onClick={handleChange}
          onKeyDown={handleKeyDown}
        >
          <CheckIcon
            className={`checkbox-mark ${iconSizes[size]} text-white`}
          />
          {name && (
            <input type="checkbox" name={name} checked={isChecked} readOnly hidden />
          )}
        </div>
        {(label || description) && (
          <div className="flex flex-col" onClick={handleChange}>
            {label && (
              <span className={`checkbox-label ${labelSizes[size]} ${disabled ? "opacity-50" : ""}`}>
                {label}
              </span>
            )}
            {description && (
              <span className={`checkbox-desc ${descSizes[size]} ${disabled ? "opacity-50" : ""}`}>
                {description}
              </span>
            )}
          </div>
        )}
      </label>
      {error && errorMessage && (
        <span className="input-error-text ml-8">{errorMessage}</span>
      )}
    </div>
  );
};

export default Checkbox;
