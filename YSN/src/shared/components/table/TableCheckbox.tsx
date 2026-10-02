import React from "react";
import CheckIcon from "../../../assets/icons/CheckIcon";
import MinusIcon from "../../../assets/icons/MinusIcon";

interface TableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
  disabled = false,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const boxClass = [
    "h-4 w-4 rounded border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0",
    checked || indeterminate
      ? "table-checkbox-checked"
      : "table-checkbox-unchecked",
    disabled
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer table-checkbox-hover",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="inline-flex items-center">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={boxClass}>
        {checked && !indeterminate && (
          <CheckIcon className="h-2.5 w-2.5 text-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {indeterminate && (
          <MinusIcon className="h-2.5 w-2.5 text-white" strokeWidth="2" strokeLinecap="round" />
        )}
      </span>
    </label>
  );
};

export default TableCheckbox;
