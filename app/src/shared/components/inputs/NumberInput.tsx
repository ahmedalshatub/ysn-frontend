import React from "react";
import MinusIcon from "../../../assets/icons/MinusIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";

type NumberInputVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type NumberInputSize = "sm" | "md" | "lg";

interface NumberInputProps {
  id?: string;
  label?: string;
  name?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  variant?: NumberInputVariant;
  size?: NumberInputSize;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  coloredButtons?: boolean;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const buttonVariantStyles: Record<NumberInputVariant, string> = {
  primary: "number-btn-primary",
  secondary: "number-btn-secondary",
  danger: "number-btn-danger",
  success: "number-btn-success",
  warning: "number-btn-warning",
  info: "number-btn-info",
  dark: "number-btn-dark",
};

const focusRingStyles: Record<NumberInputVariant, string> = {
  primary: "number-focus-primary",
  secondary: "number-focus-secondary",
  danger: "number-focus-danger",
  success: "number-focus-success",
  warning: "number-focus-warning",
  info: "number-focus-info",
  dark: "number-focus-dark",
};

const inputSizeStyles: Record<NumberInputSize, string> = {
  sm: "py-1.5 text-sm",
  md: "py-2 text-base",
  lg: "py-3 text-lg",
};

const buttonSizeStyles: Record<NumberInputSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizeStyles: Record<NumberInputSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  name,
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  placeholder = "0",
  variant = "primary",
  size = "md",
  disabled = false,
  readOnly = false,
  error = false,
  errorMessage = "",
  coloredButtons = false,
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<number>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const clamp = (val: number): number => {
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    return clamped;
  };

  const updateValue = (newVal: number) => {
    const clamped = clamp(newVal);
    if (!isControlled) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  const handleDecrement = () => {
    if (disabled || readOnly) return;
    updateValue(currentValue - step);
  };

  const handleIncrement = () => {
    if (disabled || readOnly) return;
    updateValue(currentValue + step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      if (!isControlled) {
        setInternalValue(0);
      }
      onChange?.(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || readOnly) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  const isAtMin = min !== undefined && currentValue <= min;
  const isAtMax = max !== undefined && currentValue >= max;

  const buttonBase = "flex items-center justify-center flex-shrink-0 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 select-none";

  const decrementClass = [
    buttonBase,
    buttonSizeStyles[size],
    "rounded-l-md number-input-btn number-input-decrement",
    coloredButtons ? "number-focus-danger" : focusRingStyles[variant],
    disabled || isAtMin ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
    disabled ? "" : coloredButtons ? buttonVariantStyles["danger"] : buttonVariantStyles[variant],
    disabled ? "number-btn-disabled-color" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const incrementClass = [
    buttonBase,
    buttonSizeStyles[size],
    "rounded-r-md number-input-btn number-input-increment",
    coloredButtons ? "number-focus-success" : focusRingStyles[variant],
    disabled || isAtMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
    disabled ? "" : coloredButtons ? buttonVariantStyles["success"] : buttonVariantStyles[variant],
    disabled ? "number-btn-disabled-color" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClass = [
    "number-input-field w-full text-center border-y focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ease-in-out [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    inputSizeStyles[size],
    focusRingStyles[variant],
    error
      ? "input-error"
      : "",
    disabled ? "cursor-not-allowed opacity-60" : "",
    readOnly ? "cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const minusIcon = (
    <MinusIcon className={iconSizeStyles[size]} />
  );

  const plusIcon = (
    <PlusIcon className={iconSizeStyles[size]} />
  );

  const content = (
    <div className="number-input-wrapper flex items-center w-full" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={decrementClass}
        onClick={handleDecrement}
        disabled={disabled || isAtMin}
        tabIndex={-1}
        aria-label="Decrease"
      >
        {minusIcon}
      </button>
      <input
        id={id}
        name={name}
        type="number"
        className={inputClass}
        value={currentValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
      />
      <button
        type="button"
        className={incrementClass}
        onClick={handleIncrement}
        disabled={disabled || isAtMax}
        tabIndex={-1}
        aria-label="Increase"
      >
        {plusIcon}
      </button>
    </div>
  );

  const contentWithTooltip = tooltip ? (
    <div className="tooltip-wrapper w-full">
      {content}
      <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
    </div>
  ) : (
    content
  );

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm">
          {label}
        </label>
      )}
      {contentWithTooltip}
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default NumberInput;
