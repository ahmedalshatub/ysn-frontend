import React from "react";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";

type MiniStatVariant = "primary" | "success" | "danger" | "warning" | "info" | "dark";

interface MiniStatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  variant?: MiniStatVariant;
  animated?: boolean;
}

const MiniStatCard: React.FC<MiniStatCardProps> = ({
  icon,
  label,
  value,
  change,
  variant = "primary",
  animated = true,
}) => {
  return (
    <div
      className={`stat-card rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 sm:gap-3 ${animated ? "stat-card-animate" : ""}`}
    >
      {icon && (
        <div className={`stat-icon-${variant} flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center`}>
          <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="stat-card-title text-xs font-medium truncate">{label}</p>
        <p className={`stat-card-value text-sm sm:text-base lg:text-lg font-bold leading-tight ${animated ? "stat-value-animate" : ""}`}>
          {value}
        </p>
      </div>
      {change !== undefined && (
        <div className="flex-shrink-0">
          <span
            className={`${change >= 0 ? "stat-change-up" : "stat-change-down"} inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full`}
          >
            {change >= 0 ? (
              <TrendUpIcon className="w-3 h-3" />
            ) : (
              <TrendDownIcon className="w-3 h-3" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MiniStatCard;
