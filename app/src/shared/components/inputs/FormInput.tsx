import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

type InputSize = "sm" | "md" | "lg";

interface FormInputProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  containerClass?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  disabledStatus?: boolean;
  readOnlyStatus?: boolean;
  min?: string | number;
  dataList?: string[];
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

const FormInput = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  containerClass = "",
  className = "",
  placeholder = "",
  type = "text",
  size = "md",
  error = false,
  errorMessage = "",
  disabledStatus = false,
  readOnlyStatus = false,
  min,
  dataList,
  onKeyDown,
  rules,
  tooltip,
  tooltipPosition = "top",
}: FormInputProps<T>) => {
  const dataListId = dataList ? `${id}-datalist` : undefined;

  const inputClass = [
    "form-input",
    sizeStyles[size],
    error ? "input-error" : "",
    disabledStatus ? "cursor-not-allowed opacity-60" : "",
    readOnlyStatus ? "cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
          const input = (
            <>
              <input
                {...field}
                value={field.value ?? ""}
                id={id}
                type={type}
                className={inputClass}
                placeholder={placeholder}
                disabled={disabledStatus}
                readOnly={readOnlyStatus}
                min={min}
                list={dataListId}
                onKeyDown={onKeyDown}
              />
              {dataList && (
                <datalist id={dataListId}>
                  {dataList.map((item, index) => (
                    <option key={index} value={item} />
                  ))}
                </datalist>
              )}
            </>
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

export default FormInput;
