import React, { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import EyeIcon from "../../../assets/icons/EyeIcon";
import EyeOffIcon from "../../../assets/icons/EyeOffIcon";

type InputSize = "sm" | "md" | "lg";

interface FormPasswordInputProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  containerClass?: string;
  className?: string;
  placeholder?: string;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  disabledStatus?: boolean;
  readOnlyStatus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  rules?: Record<string, unknown>;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const iconSizeStyles: Record<InputSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const buttonPaddingStyles: Record<InputSize, string> = {
  sm: "px-2",
  md: "px-3",
  lg: "px-3.5",
};

const FormPasswordInput = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  containerClass = "",
  className = "",
  placeholder = "",
  size = "md",
  error = false,
  errorMessage = "",
  disabledStatus = false,
  readOnlyStatus = false,
  onKeyDown,
  rules,
  tooltip,
  tooltipPosition = "top",
}: FormPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = [
    "w-full rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 pe-10",
    sizeStyles[size],
    error
      ? "input-error"
      : "form-password",
    disabledStatus ? "form-input-disabled cursor-not-allowed opacity-60" : "",
    readOnlyStatus ? "form-input-readonly cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const input = (
            <div className="relative">
              <input
                {...field}
                id={id}
                type={showPassword ? "text" : "password"}
                className={inputClass}
                placeholder={placeholder}
                disabled={disabledStatus}
                readOnly={readOnlyStatus}
                onKeyDown={onKeyDown}
                style={{ WebkitTextSecurity: showPassword ? "none" : undefined } as React.CSSProperties}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute inset-y-0 end-0 flex items-center ${buttonPaddingStyles[size]} password-toggle-btn transition-colors`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className={iconSizeStyles[size]} />
                ) : (
                  <EyeIcon className={iconSizeStyles[size]} />
                )}
              </button>
            </div>
          );

          if (tooltip) {
            return (
              <div className="tooltip-wrapper w-full">
                {input}
                <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
              </div>
            );
          }

          return input;
        }}
      />
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormPasswordInput;
