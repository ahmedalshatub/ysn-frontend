import { useState, useRef, useCallback, useEffect } from "react";

type SliderColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "dark";
type SliderSize = "sm" | "md" | "lg";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  color?: SliderColor;
  size?: SliderSize;
  label?: string;
  showValue?: boolean;
  showTooltip?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  valueTemplate?: (value: number) => string;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

interface RangeSliderProps {
  value?: [number, number];
  defaultValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  color?: SliderColor;
  size?: SliderSize;
  label?: string;
  showValue?: boolean;
  showTooltip?: boolean;
  disabled?: boolean;
  onChange?: (value: [number, number]) => void;
  className?: string;
}

const Slider = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  color = "primary",
  size = "md",
  label,
  showValue = false,
  showTooltip = true,
  showTicks = false,
  tickCount = 5,
  valueTemplate,
  disabled = false,
  onChange,
  className = "",
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const clamp = useCallback(
    (val: number) => {
      const stepped = Math.round(val / step) * step;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(10))));
    },
    [min, max, step]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return currentValue;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return clamp(min + ratio * (max - min));
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
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    updateValue(getValueFromPosition(e.clientX));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(getValueFromPosition(e.touches[0].clientX));
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateValue(getValueFromPosition(clientX));
    };

    const handleUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, getValueFromPosition, updateValue]);

  const displayValue = valueTemplate ? valueTemplate(currentValue) : `${Math.round(currentValue)}`;

  const ticks = showTicks
    ? Array.from({ length: tickCount }, (_, i) => min + (i / (tickCount - 1)) * (max - min))
    : [];

  return (
    <div className={`slider-wrapper slider-${size} ${disabled ? "slider-disabled" : ""} ${className}`}>
      {(label || showValue) && (
        <div className="slider-header">
          {label && <span className="slider-label">{label}</span>}
          {showValue && <span className="slider-value">{displayValue}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        className="slider-track"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`slider-fill slider-fill-${color}`}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`slider-thumb slider-thumb-${color} ${isDragging ? "slider-thumb-active" : ""}`}
          style={{ left: `${percentage}%` }}
        >
          {showTooltip && isDragging && (
            <div className="slider-tooltip">{displayValue}</div>
          )}
        </div>
      </div>
      {showTicks && (
        <div className="slider-ticks">
          {ticks.map((tick, i) => (
            <span key={i} className="slider-tick-label">
              {valueTemplate ? valueTemplate(tick) : Math.round(tick)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const RangeSlider = ({
  value: controlledValue,
  defaultValue = [25, 75],
  min = 0,
  max = 100,
  step = 1,
  color = "primary",
  size = "md",
  label,
  showValue = false,
  showTooltip = true,
  disabled = false,
  onChange,
  className = "",
}: RangeSliderProps) => {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const percentageMin = ((currentValue[0] - min) / (max - min)) * 100;
  const percentageMax = ((currentValue[1] - min) / (max - min)) * 100;

  const clamp = useCallback(
    (val: number) => {
      const stepped = Math.round(val / step) * step;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(10))));
    },
    [min, max, step]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return clamp(min + ratio * (max - min));
    },
    [min, max, clamp]
  );

  const updateValue = useCallback(
    (newVal: [number, number]) => {
      const sorted: [number, number] = newVal[0] <= newVal[1] ? newVal : [newVal[1], newVal[0]];
      if (controlledValue === undefined) setInternalValue(sorted);
      onChange?.(sorted);
    },
    [controlledValue, onChange]
  );

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const val = getValueFromPosition(e.clientX);
    const distToMin = Math.abs(val - currentValue[0]);
    const distToMax = Math.abs(val - currentValue[1]);
    const thumb = distToMin <= distToMax ? 0 : 1;
    setActiveThumb(thumb);
    const newVal: [number, number] = [...currentValue];
    newVal[thumb] = val;
    updateValue(newVal);
  };

  const handleTrackTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    const val = getValueFromPosition(e.touches[0].clientX);
    const distToMin = Math.abs(val - currentValue[0]);
    const distToMax = Math.abs(val - currentValue[1]);
    const thumb = distToMin <= distToMax ? 0 : 1;
    setActiveThumb(thumb);
    const newVal: [number, number] = [...currentValue];
    newVal[thumb] = val;
    updateValue(newVal);
  };

  useEffect(() => {
    if (activeThumb === null) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const val = getValueFromPosition(clientX);
      const newVal: [number, number] = [...currentValue];
      newVal[activeThumb] = val;
      updateValue(newVal);
    };

    const handleUp = () => setActiveThumb(null);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [activeThumb, currentValue, getValueFromPosition, updateValue]);

  return (
    <div className={`slider-wrapper slider-${size} ${disabled ? "slider-disabled" : ""} ${className}`}>
      {(label || showValue) && (
        <div className="slider-header">
          {label && <span className="slider-label">{label}</span>}
          {showValue && <span className="slider-value">{Math.round(currentValue[0])} – {Math.round(currentValue[1])}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        className="slider-track"
        onMouseDown={handleTrackMouseDown}
        onTouchStart={handleTrackTouchStart}
      >
        <div
          className={`slider-fill slider-fill-${color}`}
          style={{ left: `${percentageMin}%`, width: `${percentageMax - percentageMin}%` }}
        />
        <div
          className={`slider-thumb slider-thumb-${color} ${activeThumb === 0 ? "slider-thumb-active" : ""}`}
          style={{ left: `${percentageMin}%` }}
        >
          {showTooltip && activeThumb === 0 && (
            <div className="slider-tooltip">{Math.round(currentValue[0])}</div>
          )}
        </div>
        <div
          className={`slider-thumb slider-thumb-${color} ${activeThumb === 1 ? "slider-thumb-active" : ""}`}
          style={{ left: `${percentageMax}%` }}
        >
          {showTooltip && activeThumb === 1 && (
            <div className="slider-tooltip">{Math.round(currentValue[1])}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export type { SliderProps, RangeSliderProps, SliderColor, SliderSize };
export { RangeSlider };
export default Slider;
