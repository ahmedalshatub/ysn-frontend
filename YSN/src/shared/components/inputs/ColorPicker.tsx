import React, { useState, useRef, useEffect, useCallback } from "react";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  presets?: string[];
  showInput?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (color: string) => void;
  className?: string;
}

const defaultPresets = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  "#ec4899", "#f43f5e", "#6b7280", "#1f2937",
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = "#3b82f6",
  presets = defaultPresets,
  showInput = true,
  disabled = false,
  size = "md",
  onChange,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = controlledValue ?? internalValue;

  const updateColor = (color: string) => {
    if (disabled) return;
    setInternalValue(color);
    onChange?.(color);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <div
      ref={containerRef}
      className={`color-picker color-picker-${size} ${disabled ? "color-picker-disabled" : ""} ${className}`}
    >
      <button
        type="button"
        className="color-picker-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="color-picker-swatch" style={{ backgroundColor: currentValue }} />
        {showInput && <span className="color-picker-value">{currentValue}</span>}
        <ChevronDownIcon className="color-picker-chevron" />
      </button>

      {isOpen && (
        <div className="color-picker-dropdown">
          <div className="color-picker-native-wrapper">
            <input
              type="color"
              className="color-picker-native"
              value={currentValue}
              onChange={(e) => updateColor(e.target.value)}
            />
            <span className="color-picker-native-label">Custom color</span>
          </div>

          {presets.length > 0 && (
            <>
              <div className="color-picker-divider" />
              <div className="color-picker-presets">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-picker-preset ${color === currentValue ? "color-picker-preset-active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      updateColor(color);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {showInput && (
            <>
              <div className="color-picker-divider" />
              <div className="color-picker-input-wrapper">
                <input
                  type="text"
                  className="color-picker-input"
                  value={currentValue}
                  onChange={(e) => updateColor(e.target.value)}
                  maxLength={7}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
