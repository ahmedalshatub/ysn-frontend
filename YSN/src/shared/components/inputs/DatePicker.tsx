import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import ChevronsLeftIcon from "../../../assets/icons/ChevronsLeftIcon";
import ChevronsRightIcon from "../../../assets/icons/ChevronsRightIcon";

interface DatePickerProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  format?: "yyyy-mm-dd" | "dd/mm/yyyy" | "mm/dd/yyyy";
  onChange?: (date: string) => void;
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseDate(str: string): Date | null {
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(date: Date, fmt: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  if (fmt === "dd/mm/yyyy") return `${d}/${m}/${y}`;
  if (fmt === "mm/dd/yyyy") return `${m}/${d}/${y}`;
  return `${y}-${m}-${d}`;
}

function toISOString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value: controlledValue,
  defaultValue = "",
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled = false,
  size = "md",
  format = "yyyy-mm-dd",
  onChange,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const d = parseDate(controlledValue ?? defaultValue);
    return d || new Date();
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);

  const currentValue = controlledValue ?? internalValue;
  const selectedDate = parseDate(currentValue);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const minD = minDate ? parseDate(minDate) : null;
  const maxD = maxDate ? parseDate(maxDate) : null;

  const isDisabledDate = (d: Date) => {
    if (minD && d < minD) return true;
    if (maxD && d > maxD) return true;
    return false;
  };

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    if (isDisabledDate(d)) return;
    const iso = toISOString(d);
    setInternalValue(iso);
    onChange?.(iso);
    setIsOpen(false);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const prevYear = () => setViewDate(new Date(year - 1, month, 1));
  const nextYear = () => setViewDate(new Date(year + 1, month, 1));

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Node;
    if (
      containerRef.current && !containerRef.current.contains(target) &&
      dropdownRef.current && !dropdownRef.current.contains(target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = 300;
      const dropdownHeight = 320;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = rect.bottom + 6;
      let left = rect.left;

      if (left + dropdownWidth > vw) {
        left = Math.max(8, rect.right - dropdownWidth);
      }
      if (top + dropdownHeight > vh) {
        top = Math.max(8, rect.top - dropdownHeight - 6);
      }

      setDropdownPos({ top, left });
    }
  }, [isOpen]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const picker = (
    <div
      ref={containerRef}
      className={`datepicker datepicker-${size} ${disabled ? "datepicker-disabled" : ""} ${!label ? className : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="datepicker-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <CalendarIcon className="datepicker-icon" />
        <span className={`datepicker-value ${!currentValue ? "datepicker-placeholder" : ""}`}>
          {currentValue && selectedDate ? formatDate(selectedDate, format) : placeholder}
        </span>
        <ChevronDownIcon className="datepicker-chevron" />
      </button>

      {isOpen && dropdownPos && ReactDOM.createPortal(
        <div ref={dropdownRef} className="datepicker-dropdown datepicker-dropdown-portal" style={{ top: dropdownPos.top, left: dropdownPos.left }}>
          <div className="datepicker-header">
            <button type="button" className="datepicker-nav-btn" onClick={prevYear}>
              <ChevronsLeftIcon />
            </button>
            <button type="button" className="datepicker-nav-btn" onClick={prevMonth}>
              <ChevronLeftIcon />
            </button>
            <span className="datepicker-title">
              {MONTHS[month]} {year}
            </span>
            <button type="button" className="datepicker-nav-btn" onClick={nextMonth}>
              <ChevronRightIcon />
            </button>
            <button type="button" className="datepicker-nav-btn" onClick={nextYear}>
              <ChevronsRightIcon />
            </button>
          </div>

          <div className="datepicker-weekdays">
            {DAYS.map((d) => (
              <span key={d} className="datepicker-weekday">{d}</span>
            ))}
          </div>

          <div className="datepicker-grid">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} className="datepicker-cell-empty" />;
              const d = new Date(year, month, day);
              const isSelected = selectedDate && toISOString(d) === toISOString(selectedDate);
              const isToday = toISOString(d) === toISOString(new Date());
              const isOff = isDisabledDate(d);

              return (
                <button
                  key={i}
                  type="button"
                  className={`datepicker-cell ${isSelected ? "datepicker-cell-selected" : ""} ${isToday ? "datepicker-cell-today" : ""} ${isOff ? "datepicker-cell-disabled" : ""}`}
                  onClick={() => !isOff && selectDate(day)}
                  disabled={isOff}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="datepicker-footer">
            <button
              type="button"
              className="datepicker-today-btn"
              onClick={() => {
                const today = new Date();
                setViewDate(today);
                selectDate(today.getDate());
              }}
            >
              Today
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );

  if (label) {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label className="form-label text-sm font-medium">{label}</label>
        {picker}
      </div>
    );
  }

  return picker;
};

export default DatePicker;
