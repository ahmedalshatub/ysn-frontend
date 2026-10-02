import React from "react";
import ColorPicker from "./ColorPicker";

interface FormColorPickerProps {
  label: string;
  value?: string;
  defaultValue?: string;
  presets?: string[];
  showInput?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (color: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

const FormColorPicker: React.FC<FormColorPickerProps> = ({
  label,
  error,
  hint,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`form-field ${error ? "form-field-error" : ""} ${className}`}>
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <ColorPicker {...rest} />
      {error && <span className="form-error">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
};

export default FormColorPicker;
