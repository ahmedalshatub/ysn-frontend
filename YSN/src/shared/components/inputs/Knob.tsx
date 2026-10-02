import { useState, useRef, useCallback, useEffect } from "react";

type KnobSize = "sm" | "md" | "lg" | "xl";
type KnobColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "dark";

interface KnobProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: KnobSize;
  color?: KnobColor;
  label?: string;
  showValue?: boolean;
  valueTemplate?: (value: number) => string;
  disabled?: boolean;
  readOnly?: boolean;
  strokeWidth?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeMap: Record<KnobSize, number> = {
  sm: 64,
  md: 96,
  lg: 128,
  xl: 160,
};

const fontSizeMap: Record<KnobSize, string> = {
  sm: "text-xs",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

const labelSizeMap: Record<KnobSize, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

const Knob = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  color = "primary",
  label,
  showValue = true,
  valueTemplate,
  disabled = false,
  readOnly = false,
  strokeWidth = 8,
  onChange,
  className = "",
}: KnobProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const pixelSize = sizeMap[size];
  const radius = (pixelSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = pixelSize / 2;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const dashOffset = circumference - (percentage / 100) * circumference;

  const clamp = useCallback(
    (val: number) => {
      const stepped = Math.round(val / step) * step;
      return Math.min(max, Math.max(min, stepped));
    },
    [min, max, step]
  );

  const getValueFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return currentValue;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
      angle = (angle + 90 + 360) % 360;
      const val = min + (angle / 360) * (max - min);
      return clamp(val);
    },
    [currentValue, min, max, clamp]
  );

  const updateValue = useCallback(
    (val: number) => {
      if (controlledValue === undefined) setInternalValue(val);
      onChange?.(val);
    },
    [controlledValue, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();
    dragging.current = true;
    const val = getValueFromEvent(e.clientX, e.clientY);
    updateValue(val);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const val = getValueFromEvent(e.clientX, e.clientY);
      updateValue(val);
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [getValueFromEvent, updateValue]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const touch = e.touches[0];
      const val = getValueFromEvent(touch.clientX, touch.clientY);
      updateValue(val);
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [getValueFromEvent, updateValue]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || readOnly) return;
    dragging.current = true;
    const touch = e.touches[0];
    const val = getValueFromEvent(touch.clientX, touch.clientY);
    updateValue(val);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const newVal = clamp(currentValue + step * direction);
    updateValue(newVal);
  };

  const displayValue = valueTemplate ? valueTemplate(currentValue) : `${Math.round(currentValue)}`;

  return (
    <div className={`knob-wrapper ${disabled ? "knob-disabled" : ""} ${className}`}>
      <svg
        ref={svgRef}
        width={pixelSize}
        height={pixelSize}
        className={`knob-svg ${!disabled && !readOnly ? "knob-interactive" : ""}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="knob-track"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className={`knob-fill knob-fill-${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {showValue && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            className={`knob-value-text ${fontSizeMap[size]}`}
          >
            {displayValue}
          </text>
        )}
      </svg>
      {label && <span className={`knob-label ${labelSizeMap[size]}`}>{label}</span>}
    </div>
  );
};

export type { KnobProps, KnobSize, KnobColor };
export default Knob;
