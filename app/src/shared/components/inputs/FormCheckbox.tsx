import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import CheckIcon from "../../../assets/icons/CheckIcon";

type CheckboxVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type CheckboxSize = "sm" | "md" | "lg";

interface FormCheckboxProps<T extends FieldValues> {
  id?: string;
  name: Path<T>;
  control: Control<T>;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  disabledStatus?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  rules?: Record<string, unknown>;
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

const FormCheckbox = <T extends FieldValues>({
  id,
  name,
  control,
  variant = "primary",
  size = "md",
  label,
  description,
  disabledStatus = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  rules,
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const isChecked = !!field.value;

        const handleChange = () => {
          if (disabledStatus) return;
          field.onChange(!isChecked);
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
          disabledStatus ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div className={`flex flex-col gap-1 ${containerClass}`}>
            <label
              className={`inline-flex items-start gap-3 ${disabledStatus ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={(e) => e.preventDefault()}
            >
              <div
                role="checkbox"
                aria-checked={isChecked}
                aria-disabled={disabledStatus}
                tabIndex={disabledStatus ? -1 : 0}
                id={id}
                className={boxClass}
                onClick={handleChange}
                onKeyDown={handleKeyDown}
              >
                <CheckIcon
                  className={`checkbox-mark ${iconSizes[size]} text-white`}
                />
              </div>
              {(label || description) && (
                <div className="flex flex-col" onClick={handleChange}>
                  {label && (
                    <span className={`font-medium checkbox-label ${labelSizes[size]} ${disabledStatus ? "opacity-50" : ""}`}>
                      {label}
                    </span>
                  )}
                  {description && (
                    <span className={`checkbox-desc ${descSizes[size]} ${disabledStatus ? "opacity-50" : ""}`}>
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
      }}
    />
  );
};

export default FormCheckbox;
