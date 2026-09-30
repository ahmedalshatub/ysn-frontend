import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

type RadioVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type RadioSize = "sm" | "md" | "lg";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface FormRadioButtonProps<T extends FieldValues> {
  id?: string;
  name: Path<T>;
  control: Control<T>;
  options: RadioOption[];
  variant?: RadioVariant;
  size?: RadioSize;
  direction?: "horizontal" | "vertical";
  error?: boolean;
  errorMessage?: string;
  disabledStatus?: boolean;
  containerClass?: string;
  rules?: Record<string, unknown>;
}

const checkedStyles: Record<RadioVariant, string> = {
  primary: "radio-checked-primary",
  secondary: "radio-checked-secondary",
  danger: "radio-checked-danger",
  success: "radio-checked-success",
  warning: "radio-checked-warning",
  info: "radio-checked-info",
  dark: "radio-checked-dark",
};

const circleSizes: Record<RadioSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const dotSizes: Record<RadioSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const labelSizes: Record<RadioSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const descSizes: Record<RadioSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const FormRadioButton = <T extends FieldValues>({
  id,
  name,
  control,
  options,
  variant = "primary",
  size = "md",
  direction = "vertical",
  error = false,
  errorMessage = "",
  disabledStatus = false,
  containerClass = "",
  rules,
}: FormRadioButtonProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selected = field.value as string;

        const handleSelect = (val: string) => {
          if (disabledStatus) return;
          field.onChange(val);
        };

        return (
          <div className={`flex flex-col gap-1 ${containerClass}`}>
            <div className={`flex ${direction === "horizontal" ? "flex-row flex-wrap gap-6" : "flex-col gap-3"}`}>
              {options.map((option, index) => {
                const isSelected = selected === option.value;
                const isDisabled = disabledStatus || option.disabled;
                const optionId = id ? `${id}-${index}` : `${name}-${index}`;

                const circleClass = [
                  "relative flex-shrink-0 rounded-full border-2 transition-all duration-200 ease-in-out",
                  circleSizes[size],
                  isSelected ? `${checkedStyles[variant]} radio-checked` : "",
                  !isSelected && error ? "input-error" : "",
                  !isSelected && !error ? "radio-unchecked" : "",
                  isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                ]
                  .filter(Boolean)
                  .join(" ");

                const handleKeyDown = (e: React.KeyboardEvent) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    if (!isDisabled) handleSelect(option.value);
                  }
                };

                return (
                  <label
                    key={option.value}
                    className={`inline-flex items-start gap-3 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <div
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={isDisabled}
                      tabIndex={isDisabled ? -1 : 0}
                      id={optionId}
                      className={circleClass}
                      onClick={() => !isDisabled && handleSelect(option.value)}
                      onKeyDown={handleKeyDown}
                    >
                      <span className={`radio-dot ${dotSizes[size]}`} />
                    </div>
                    {(option.label || option.description) && (
                      <div
                        className="flex flex-col"
                        onClick={() => !isDisabled && handleSelect(option.value)}
                      >
                        {option.label && (
                          <span className={`font-medium radio-label ${labelSizes[size]} ${isDisabled ? "opacity-50" : ""}`}>
                            {option.label}
                          </span>
                        )}
                        {option.description && (
                          <span className={`radio-desc ${descSizes[size]} ${isDisabled ? "opacity-50" : ""}`}>
                            {option.description}
                          </span>
                        )}
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
            {error && errorMessage && (
              <span className="input-error-text ml-8">{errorMessage}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormRadioButton;
