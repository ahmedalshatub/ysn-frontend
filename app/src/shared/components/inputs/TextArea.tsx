import React from "react";

type TextAreaSize = "sm" | "md" | "lg";

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  size?: TextAreaSize;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const sizeStyles: Record<TextAreaSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const resizeStyles: Record<string, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  size = "md",
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  resize = "vertical",
  disabled,
  readOnly,
  rows = 4,
  ...rest
}) => {
  const textareaClass = [
    "form-textarea w-full rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0",
    sizeStyles[size],
    resizeStyles[resize],
    error
      ? "input-error"
      : "",
    disabled ? "cursor-not-allowed opacity-60" : "",
    readOnly ? "cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textarea = (
    <textarea
      id={id}
      className={textareaClass}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      {...rest}
    />
  );

  const textareaWithTooltip = tooltip ? (
    <div className="tooltip-wrapper w-full">
      {textarea}
      <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
    </div>
  ) : (
    textarea
  );

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm">
          {label}
        </label>
      )}
      {textareaWithTooltip}
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextArea;
