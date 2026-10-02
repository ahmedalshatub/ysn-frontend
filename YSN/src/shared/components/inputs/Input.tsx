import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  dataList?: string[];
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  size = "md",
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  dataList,
  disabled,
  readOnly,
  ...rest
}) => {
  const dataListId = dataList ? `${id}-datalist` : undefined;

  const inputClass = [
    "form-input",
    sizeStyles[size],
    error ? "input-error" : "",
    disabled ? "cursor-not-allowed opacity-60" : "",
    readOnly ? "cursor-default" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const input = (
    <>
      <input
        id={id}
        className={inputClass}
        disabled={disabled}
        readOnly={readOnly}
        list={dataListId}
        {...rest}
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
        <label htmlFor={id} className="form-label text-sm font-medium">
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

export default Input;
