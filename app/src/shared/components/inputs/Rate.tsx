import React, { useState } from "react";
import StarIcon from "../../../assets/icons/StarIcon";
import StarHalfIcon from "../../../assets/icons/StarHalfIcon";

interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  halfIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "warning" | "danger" | "success";
  onChange?: (value: number) => void;
  className?: string;
}

const defaultStarFull = (
  <StarIcon viewBox="0 0 24 24" />
);

const defaultStarEmpty = (
  <StarIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" />
);

const defaultStarHalf = (
  <StarHalfIcon viewBox="0 0 24 24" />
);

const Rate: React.FC<RateProps> = ({
  value: controlledValue,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  icon = defaultStarFull,
  emptyIcon = defaultStarEmpty,
  halfIcon = defaultStarHalf,
  size = "md",
  color = "warning",
  onChange,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = controlledValue ?? internalValue;
  const displayValue = hoverValue ?? currentValue;

  const handleClick = (starIndex: number, isHalf: boolean) => {
    if (disabled) return;
    let newVal = isHalf ? starIndex + 0.5 : starIndex + 1;
    if (allowClear && newVal === currentValue) newVal = 0;
    setInternalValue(newVal);
    onChange?.(newVal);
  };

  const handleMouseMove = (starIndex: number, e: React.MouseEvent<HTMLSpanElement>) => {
    if (disabled) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeft = e.clientX - rect.left < rect.width / 2;
      setHoverValue(isLeft ? starIndex + 0.5 : starIndex + 1);
    } else {
      setHoverValue(starIndex + 1);
    }
  };

  return (
    <div
      className={`rate-wrapper rate-${size} rate-color-${color} ${disabled ? "rate-disabled" : ""} ${className}`}
      onMouseLeave={() => !disabled && setHoverValue(null)}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isFull = displayValue >= i + 1;
        const isHalf = !isFull && allowHalf && displayValue >= i + 0.5;

        return (
          <span
            key={i}
            className={`rate-star ${isFull ? "rate-star-full" : isHalf ? "rate-star-half" : "rate-star-empty"}`}
            onClick={(e) => {
              if (allowHalf) {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeft = e.clientX - rect.left < rect.width / 2;
                handleClick(i, isLeft);
              } else {
                handleClick(i, false);
              }
            }}
            onMouseMove={(e) => handleMouseMove(i, e)}
          >
            <span className="rate-star-icon">
              {isFull ? icon : isHalf ? halfIcon : emptyIcon}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Rate;
