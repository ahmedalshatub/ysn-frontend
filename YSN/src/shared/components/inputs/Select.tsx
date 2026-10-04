import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

type SelectVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  id?: string;
  label?: string;
  name?: string;
  options: any[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  addDefaultOption?: boolean;
  defaultOptionLabel?: string;
  valueKey?: string;
  labelKey?: string;
  translateOptions?: boolean;
}

const focusRingStyles: Record<SelectVariant, string> = {
  primary: "select-focus-primary",
  secondary: "select-focus-secondary",
  danger: "select-focus-danger",
  success: "select-focus-success",
  warning: "select-focus-warning",
  info: "select-focus-info",
  dark: "select-focus-dark",
};

const activeOptionStyles: Record<SelectVariant, string> = {
  primary: "select-active-primary",
  secondary: "select-active-secondary",
  danger: "select-active-danger",
  success: "select-active-success",
  warning: "select-active-warning",
  info: "select-active-info",
  dark: "select-active-dark",
};

const hoverOptionStyles: Record<SelectVariant, string> = {
  primary: "select-hover-primary",
  secondary: "select-hover-secondary",
  danger: "select-hover-danger",
  success: "select-hover-success",
  warning: "select-hover-warning",
  info: "select-hover-info",
  dark: "select-hover-dark",
};

const sizeStyles: Record<SelectSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const optionSizeStyles: Record<SelectSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-2.5 text-lg",
};

const searchSizeStyles: Record<SelectSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-2.5 text-lg",
};

const Select: React.FC<SelectProps> = ({
  id,
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  variant = "primary",
  size = "md",
  searchable = false,
  searchPlaceholder = "Search...",
  disabled = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  addDefaultOption = false,
  defaultOptionLabel = "All",
  valueKey,
  labelKey,
  translateOptions = false,
}) => {
  const { t } = useTranslation();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | number>(defaultValue ?? "");
  const selectedValue = isControlled ? value : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({ visibility: "hidden" });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const allOptions: SelectOption[] = React.useMemo(() => {
    const normalized: SelectOption[] = options.map((opt: any) => {
      const rawLabel = labelKey ? opt[labelKey] : opt.label;
      return {
        value: valueKey ? opt[valueKey] : opt.value,
        label: translateOptions ? t(rawLabel) : rawLabel,
        disabled: opt.disabled,
      };
    });
    const base: SelectOption[] = addDefaultOption
      ? [{ value: "", label: defaultOptionLabel }]
      : [];
    return [...base, ...normalized];
  }, [options, addDefaultOption, defaultOptionLabel, valueKey, labelKey, translateOptions, t]);

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !search.trim()) return allOptions;
    const term = search.toLowerCase();
    return allOptions.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [allOptions, search, searchable]);

  const selectedOption = allOptions.find((opt) => opt.value === selectedValue);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearch("");
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

  React.useEffect(() => {
    setHighlightIndex(-1);
  }, [search]);

  React.useEffect(() => {
    if (highlightIndex >= 0 && optionsRef.current) {
      const el = optionsRef.current.children[highlightIndex] as HTMLElement;
      if (el) {
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightIndex]);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      setDropdownStyle({ visibility: "hidden" });
      return;
    }
    const updatePosition = () => {
      requestAnimationFrame(() => {
        if (!triggerRef.current || !dropdownRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const menuH = dropdownRef.current.offsetHeight;
        const vh = window.innerHeight;
        const spaceBelow = vh - rect.bottom - 8;
        const spaceAbove = rect.top - 8;
        let top: number | undefined;
        let bottom: number | undefined;
        if (spaceBelow >= menuH || spaceBelow >= spaceAbove) {
          top = rect.bottom + 4;
        } else {
          bottom = vh - rect.top + 4;
        }
        setDropdownStyle({
          position: "fixed",
          top,
          bottom,
          left: rect.left,
          width: rect.width,
          visibility: "visible",
        });
      });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) {
      setInternalValue(opt.value);
    }
    onChange?.(opt.value);
    setIsOpen(false);
    setSearch("");
    setHighlightIndex(-1);
    triggerRef.current?.focus();
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setSearch("");
      setHighlightIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightIndex >= 0 && filteredOptions[highlightIndex]) {
          handleSelect(filteredOptions[highlightIndex]);
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
        setSearch("");
        setHighlightIndex(-1);
        triggerRef.current?.focus();
        break;
      }
      case "Tab": {
        setIsOpen(false);
        setSearch("");
        setHighlightIndex(-1);
        break;
      }
    }
  };

  const triggerClass = [
    "select-trigger w-full flex items-center justify-between rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-0",
    sizeStyles[size],
    isOpen ? `ring-2 ring-offset-0 ${focusRingStyles[variant]} border-transparent` : "",
    !isOpen && error ? "input-error" : "",
    !isOpen && !error ? "" : "",
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const trigger = (
    <div className="relative" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
        id={id}
        name={name}
        className={triggerClass}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className={`min-w-0 truncate text-start ${selectedOption && selectedValue !== "" ? "" : "select-placeholder"}`}>
          {selectedOption && selectedValue !== "" ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`select-arrow-icon flex-shrink-0 ms-2 ${isOpen ? "select-arrow-rotated" : ""}`}
          width="20"
          height="20"
        />
      </button>

      {isOpen && ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className="select-dropdown select-open fixed z-[99999] rounded-md"
          style={dropdownStyle}
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          onKeyDown={handleKeyDown}
        >
          {searchable && (
            <div className="select-search border-b p-1.5">
              <input
                ref={searchRef}
                type="text"
                className={`w-full rounded border select-search focus:outline-none focus:ring-1 ${focusRingStyles[variant]} ${searchSizeStyles[size]}`}
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="select-options max-h-60 overflow-y-auto py-1" ref={optionsRef}>
            {filteredOptions.length === 0 ? (
              <div className={`select-empty ${optionSizeStyles[size]}`}>No results</div>
            ) : (
              filteredOptions.map((opt, index) => {
                const isActive = opt.value === selectedValue;
                const isHighlighted = index === highlightIndex;

                const optClass = [
                  "select-option w-full text-start transition-colors duration-100 flex items-center justify-between",
                  optionSizeStyles[size],
                  isActive ? `select-option-selected ${activeOptionStyles[variant]}` : "",
                  !isActive && isHighlighted ? "select-option-highlight" : "",
                  !isActive && !isHighlighted ? hoverOptionStyles[variant] : "",
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
                    onClick={() => handleSelect(opt)}
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
        </div>,
        document.body
      )}
    </div>
  );

  const triggerWithTooltip = tooltip ? (
    <div className="tooltip-wrapper w-full">
      {trigger}
      <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
    </div>
  ) : (
    trigger
  );

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm">
          {label}
        </label>
      )}
      {triggerWithTooltip}
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
