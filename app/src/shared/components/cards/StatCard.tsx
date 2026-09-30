import React from "react";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";

type StatVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  variant?: StatVariant;
  subtitle?: string;
  animated?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel = "vs last month",
  variant = "primary",
  subtitle,
  animated = true,
}) => {
  return (
    <div
      className={`stat-card rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${animated ? "stat-card-animate" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="stat-card-title text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className={`stat-card-value text-lg sm:text-xl lg:text-2xl font-bold mt-1 ${animated ? "stat-value-animate" : ""}`}>
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  change >= 0 ? "stat-change-up-text" : "stat-change-down-text"
                }`}
              >
                {change >= 0 ? (
                  <TrendUpIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <TrendDownIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="stat-card-muted text-xs">{changeLabel}</span>
            </div>
          )}
          {subtitle && !change && (
            <p className="stat-card-muted text-xs mt-2">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`stat-icon-${variant} flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center`}>
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
