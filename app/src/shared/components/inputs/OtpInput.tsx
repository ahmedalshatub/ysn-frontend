import React from "react";

type OtpInputVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type OtpInputSize = "sm" | "md" | "lg";

interface OtpInputProps {
  id?: string;
  label?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  variant?: OtpInputVariant;
  size?: OtpInputSize;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  masked?: boolean;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const focusRingStyles: Record<OtpInputVariant, string> = {
  primary: "otp-focus-primary",
  secondary: "otp-focus-secondary",
  danger: "otp-focus-danger",
  success: "otp-focus-success",
  warning: "otp-focus-warning",
  info: "otp-focus-info",
  dark: "otp-focus-dark",
};

const filledBorderStyles: Record<OtpInputVariant, string> = {
  primary: "otp-filled-primary",
  secondary: "otp-filled-secondary",
  danger: "otp-filled-danger",
  success: "otp-filled-success",
  warning: "otp-filled-warning",
  info: "otp-filled-info",
  dark: "otp-filled-dark",
};

const cellSizeStyles: Record<OtpInputSize, string> = {
  sm: "w-9 h-9 text-sm",
  md: "w-12 h-12 text-xl",
  lg: "w-14 h-14 text-2xl",
};

const gapStyles: Record<OtpInputSize, string> = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
};

const OtpInput: React.FC<OtpInputProps> = ({
  id,
  label,
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  variant = "primary",
  size = "md",
  disabled = false,
  error = false,
  errorMessage = "",
  masked = false,
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue.padEnd(length, " ").slice(0, length));
  const currentValue = isControlled ? value.padEnd(length, " ").slice(0, length) : internalValue;

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const digits = currentValue.split("");

  const updateValue = (newVal: string) => {
    if (!isControlled) {
      setInternalValue(newVal);
    }
    onChange?.(newVal.replace(/ /g, ""));
    const trimmed = newVal.replace(/ /g, "");
    if (trimmed.length === length) {
      onComplete?.(trimmed);
    }
  };

  const focusCell = (index: number) => {
    setTimeout(() => inputRefs.current[index]?.focus(), 0);
  };

  const handleChange = (index: number, char: string) => {
    if (disabled) return;
    if (!/^\d?$/.test(char)) return;

    const arr = digits.slice();
    arr[index] = char || " ";
    const newVal = arr.join("");
    updateValue(newVal);

    if (char && index < length - 1) {
      focusCell(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index] && digits[index] !== " ") {
        const arr = digits.slice();
        arr[index] = " ";
        updateValue(arr.join(""));
      } else if (index > 0) {
        const arr = digits.slice();
        arr[index - 1] = " ";
        updateValue(arr.join(""));
        focusCell(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusCell(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const padded = pasted.padEnd(length, " ");
    updateValue(padded);
    const nextIndex = Math.min(pasted.length, length - 1);
    focusCell(nextIndex);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const content = (
    <div className={`flex ${gapStyles[size]}`} onPaste={handlePaste}>
      {digits.map((digit, index) => {
        const hasValue = digit && digit !== " ";

        const cellClass = [
          "otp-cell text-center font-semibold",
          cellSizeStyles[size],
          focusRingStyles[variant],
          error ? "input-error" : hasValue ? filledBorderStyles[variant] : "",
          disabled ? "otp-cell-disabled cursor-not-allowed opacity-60" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            id={index === 0 ? id : undefined}
            type={masked ? "password" : "text"}
            inputMode="numeric"
            maxLength={1}
            className={cellClass}
            value={hasValue ? digit : ""}
            onChange={(e) => handleChange(index, e.target.value.slice(-1))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={handleFocus}
            disabled={disabled}
            autoComplete="one-time-code"
          />
        );
      })}
    </div>
  );

  const contentWithTooltip = tooltip ? (
    <div className="tooltip-wrapper">
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

export default OtpInput;
