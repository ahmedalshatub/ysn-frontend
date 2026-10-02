import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

type TextAreaSize = "sm" | "md" | "lg";

interface FormTextAreaProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  containerClass?: string;
  className?: string;
  placeholder?: string;
  size?: TextAreaSize;
  rows?: number;
  error?: boolean;
  errorMessage?: string;
  disabledStatus?: boolean;
  readOnlyStatus?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  rules?: Record<string, unknown>;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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

const FormTextArea = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  containerClass = "",
  className = "",
  placeholder = "",
  size = "md",
  rows = 4,
  error = false,
  errorMessage = "",
  disabledStatus = false,
  readOnlyStatus = false,
  resize = "vertical",
  rules,
  tooltip,
  tooltipPosition = "top",
  onKeyDown,
}: FormTextAreaProps<T>) => {
  const textareaClass = [
    "w-full rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0",
    sizeStyles[size],
    resizeStyles[resize],
    error
      ? "input-error"
      : "form-textarea",
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
          const textarea = (
            <textarea
              {...field}
              id={id}
              className={textareaClass}
              placeholder={placeholder}
              disabled={disabledStatus}
              readOnly={readOnlyStatus}
              rows={rows}
              onKeyDown={onKeyDown}
            />
          );

          if (tooltip) {
            return (
              <div className="tooltip-wrapper w-full">
                {textarea}
                <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
              </div>
            );
          }

          return textarea;
        }}
      />
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormTextArea;
