import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import SearchIcon from "../../../assets/icons/SearchIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

type SearchInputSize = "sm" | "md" | "lg";

export interface SearchOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FormSearchInputProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: SearchOption[];
  placeholder?: string;
  size?: SearchInputSize;
  disabledStatus?: boolean;
  readOnlyStatus?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  noResultsText?: string;
  onSelect?: (option: SearchOption) => void;
  rules?: Record<string, unknown>;
}

const sizeStyles: Record<SearchInputSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const optionSizeStyles: Record<SearchInputSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-2.5 text-lg",
};

interface InnerSearchInputProps {
  id?: string;
  fieldValue: string | number;
  fieldOnChange: (value: string | number) => void;
  options: SearchOption[];
  placeholder: string;
  size: SearchInputSize;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  className: string;
  noResultsText: string;
  tooltip?: string;
  tooltipPosition: "top" | "bottom" | "left" | "right";
  onSelect?: (option: SearchOption) => void;
}

const InnerSearchInput: React.FC<InnerSearchInputProps> = ({
  id,
  fieldValue,
  fieldOnChange,
  options,
  placeholder,
  size,
  disabled,
  readOnly,
  error,
  className,
  noResultsText,
  tooltip,
  tooltipPosition,
  onSelect,
}) => {
  const [inputText, setInputText] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const match = options.find((opt) => opt.value === fieldValue);
    if (match) {
      setInputText(match.label);
    } else if (!fieldValue) {
      setInputText("");
    }
  }, [fieldValue, options]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightIndex(-1);
        const match = options.find((opt) => opt.value === fieldValue);
        if (match) {
          setInputText(match.label);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fieldValue, options]);

  React.useEffect(() => {
    setHighlightIndex(-1);
  }, [inputText]);

  React.useEffect(() => {
    if (highlightIndex >= 0 && optionsRef.current) {
      const el = optionsRef.current.children[highlightIndex] as HTMLElement;
      if (el) {
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightIndex]);

  const filteredOptions = React.useMemo(() => {
    if (!inputText.trim()) return options;
    const term = inputText.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [options, inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (opt: SearchOption) => {
    if (opt.disabled) return;
    setInputText(opt.label);
    fieldOnChange(opt.value);
    onSelect?.(opt);
    setIsOpen(false);
    setHighlightIndex(-1);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || readOnly) return;

    switch (e.key) {
      case "Enter": {
        e.preventDefault();
        if (isOpen && highlightIndex >= 0 && filteredOptions[highlightIndex]) {
          handleSelectOption(filteredOptions[highlightIndex]);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightIndex((prev) => {
            let next = prev + 1;
            while (next < filteredOptions.length && filteredOptions[next].disabled) {
              next++;
            }
            return next < filteredOptions.length ? next : prev;
          });
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (isOpen) {
          setHighlightIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && filteredOptions[next].disabled) {
              next--;
            }
            return next >= 0 ? next : prev;
          });
        }
        break;
      }
      case "Escape": {
        setIsOpen(false);
        setHighlightIndex(-1);
        const match = options.find((opt) => opt.value === fieldValue);
        if (match) {
          setInputText(match.label);
        }
        break;
      }
      case "Tab": {
        setIsOpen(false);
        setHighlightIndex(-1);
        break;
      }
    }
  };

  const inputClass = [
    "form-search-input pr-9",
    sizeStyles[size],
    error
      ? "input-error"
      : "",
    disabled ? "input-disabled" : "",
    readOnly ? "input-readonly" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dropdownClass = [
    "select-dropdown absolute z-50 mt-1 w-full rounded-md",
    isOpen && filteredOptions.length > 0 ? "select-open" : "",
    isOpen && filteredOptions.length === 0 && inputText.trim() ? "select-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const searchIcon = (
    <SearchIcon
      className="absolute right-2.5 top-1/2 -translate-y-1/2 search-icon pointer-events-none"
      width="18"
      height="18"
    />
  );

  const content = (
    <div className="relative" ref={containerRef} onKeyDown={handleKeyDown}>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={inputClass}
          placeholder={placeholder}
          value={inputText}
          onChange={handleInputChange}
          onFocus={handleFocus}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete="off"
        />
        {searchIcon}
      </div>

      <div className={dropdownClass} role="listbox">
        <div className="select-options max-h-60 overflow-y-auto py-1" ref={optionsRef}>
          {filteredOptions.length === 0 && inputText.trim() ? (
            <div className={`select-empty ${optionSizeStyles[size]}`}>{noResultsText}</div>
          ) : (
            filteredOptions.map((opt, index) => {
              const isActive = opt.value === fieldValue;
              const isHighlighted = index === highlightIndex;

              const optClass = [
                "w-full text-left transition-colors duration-100 flex items-center justify-between",
                optionSizeStyles[size],
                isActive ? "input-active-option" : "",
                !isActive && isHighlighted ? "select-option-highlight" : "",
                !isActive && !isHighlighted ? "select-option-hover" : "",
                opt.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={`${opt.value}-${index}`}
                  role="option"
                  aria-selected={isActive}
                  aria-disabled={opt.disabled}
                  className={optClass}
                  onClick={() => handleSelectOption(opt)}
                  onMouseEnter={() => setHighlightIndex(index)}
                >
                  <span>{opt.label}</span>
                  {isActive && (
                    <CheckIcon className="flex-shrink-0 w-4 h-4" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <div className="tooltip-wrapper w-full">
        {content}
        <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
      </div>
    );
  }

  return content;
};

const FormSearchInput = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  options,
  placeholder = "Search...",
  size = "md",
  disabledStatus = false,
  readOnlyStatus = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  noResultsText = "No results found",
  onSelect,
  rules,
}: FormSearchInputProps<T>) => {
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
        render={({ field }) => (
          <InnerSearchInput
            id={id}
            fieldValue={field.value as string | number}
            fieldOnChange={field.onChange}
            options={options}
            placeholder={placeholder}
            size={size}
            disabled={disabledStatus}
            readOnly={readOnlyStatus}
            error={error}
            className={className}
            noResultsText={noResultsText}
            tooltip={tooltip}
            tooltipPosition={tooltipPosition}
            onSelect={onSelect}
          />
        )}
      />
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormSearchInput;
