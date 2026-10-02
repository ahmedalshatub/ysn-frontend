import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import MinusIcon from "../../../assets/icons/MinusIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";

type NumberInputVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type NumberInputSize = "sm" | "md" | "lg";

interface FormNumberInputProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  variant?: NumberInputVariant;
  size?: NumberInputSize;
  disabledStatus?: boolean;
  readOnlyStatus?: boolean;
  error?: boolean;
  errorMessage?: string;
  coloredButtons?: boolean;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  rules?: Record<string, unknown>;
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

const FormNumberInput = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  min,
  max,
  step = 1,
  placeholder = "0",
  variant = "primary",
  size = "md",
  disabledStatus = false,
  readOnlyStatus = false,
  error = false,
  errorMessage = "",
  coloredButtons = false,
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  rules,
}: FormNumberInputProps<T>) => {
  const clamp = (val: number): number => {
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    return clamped;
  };

  const buttonBase = "flex items-center justify-center flex-shrink-0 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 select-none";

  const minusIcon = (
    <MinusIcon className={iconSizeStyles[size]} />
  );

  const plusIcon = (
    <PlusIcon className={iconSizeStyles[size]} />
  );

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const currentValue = (typeof field.value === "number" ? field.value : 0) as number;
          const isAtMin = min !== undefined && currentValue <= min;
          const isAtMax = max !== undefined && currentValue >= max;

          const handleDecrement = () => {
            if (disabledStatus || readOnlyStatus) return;
            field.onChange(clamp(currentValue - step));
          };

          const handleIncrement = () => {
            if (disabledStatus || readOnlyStatus) return;
            field.onChange(clamp(currentValue + step));
          };

          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            if (raw === "" || raw === "-") {
              field.onChange(0);
              return;
            }
            const parsed = parseFloat(raw);
            if (!isNaN(parsed)) {
              field.onChange(clamp(parsed));
            }
          };

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (disabledStatus || readOnlyStatus) return;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              handleIncrement();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              handleDecrement();
            }
          };

          const decrementClass = [
            buttonBase,
            buttonSizeStyles[size],
            "rounded-l-md number-input-btn number-input-decrement",
            coloredButtons ? "number-focus-danger" : focusRingStyles[variant],
            disabledStatus || isAtMin ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            disabledStatus ? "" : coloredButtons ? buttonVariantStyles["danger"] : buttonVariantStyles[variant],
            disabledStatus ? "number-btn-disabled-color" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const incrementClass = [
            buttonBase,
            buttonSizeStyles[size],
            "rounded-r-md number-input-btn number-input-increment",
            coloredButtons ? "number-focus-success" : focusRingStyles[variant],
            disabledStatus || isAtMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            disabledStatus ? "" : coloredButtons ? buttonVariantStyles["success"] : buttonVariantStyles[variant],
            disabledStatus ? "number-btn-disabled-color" : "",
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
            disabledStatus ? "input-disabled" : "",
            readOnlyStatus ? "input-readonly" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ");

          const content = (
            <div className="number-input-wrapper flex items-center w-full" onKeyDown={handleKeyDown}>
              <button
                type="button"
                className={decrementClass}
                onClick={handleDecrement}
                disabled={disabledStatus || isAtMin}
                tabIndex={-1}
                aria-label="Decrease"
              >
                {minusIcon}
              </button>
              <input
                id={id}
                type="number"
                className={inputClass}
                value={currentValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabledStatus}
                readOnly={readOnlyStatus}
                min={min}
                max={max}
                step={step}
              />
              <button
                type="button"
                className={incrementClass}
                onClick={handleIncrement}
                disabled={disabledStatus || isAtMax}
                tabIndex={-1}
                aria-label="Increase"
              >
                {plusIcon}
              </button>
            </div>
          );

          if (tooltip) {
            return (
              <div className="tooltip-wrapper w-full">
                {content}
                <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
              </div>
            );
          }

          return content;
        }}
      />
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormNumberInput;
