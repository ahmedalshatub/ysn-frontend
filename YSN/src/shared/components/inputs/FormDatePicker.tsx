import React from "react";
import DatePicker from "./DatePicker";

interface FormDatePickerProps {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  format?: "yyyy-mm-dd" | "dd/mm/yyyy" | "mm/dd/yyyy";
  onChange?: (date: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  error,
  hint,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="form-label text-sm font-medium">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <DatePicker {...rest} />
      {error && <span className="form-error-text mt-1">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
};

export default FormDatePicker;
