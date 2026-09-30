import React, { useState } from "react";
import EyeIcon from "../../../assets/icons/EyeIcon";
import EyeOffIcon from "../../../assets/icons/EyeOffIcon";

type InputSize = "sm" | "md" | "lg";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
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

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  size = "md",
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  disabled,
  readOnly,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = [
    "form-password w-full rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 pe-10",
    sizeStyles[size],
    error
      ? "input-error"
      : "",
    disabled ? "cursor-not-allowed opacity-60" : "",
    readOnly ? "cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const input = (
    <div className="relative">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        className={inputClass}
        disabled={disabled}
        readOnly={readOnly}
        style={{ WebkitTextSecurity: showPassword ? "none" : undefined } as React.CSSProperties}
        {...rest}
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

  const inputWithTooltip = tooltip ? (
    <div className="tooltip-wrapper w-full">
      {input}
      <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
    </div>
  ) : (
    input
  );

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm">
          {label}
        </label>
      )}
      {inputWithTooltip}
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default PasswordInput;
