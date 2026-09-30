import React from "react";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";

type GradientVariant = "blue" | "purple" | "emerald" | "rose" | "amber" | "cyan" | "dark";

interface GradientStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  gradient?: GradientVariant;
  subtitle?: string;
  animated?: boolean;
}

const gradientClasses: Record<GradientVariant, string> = {
  blue: "stat-gradient-blue",
  purple: "stat-gradient-purple",
  emerald: "stat-gradient-emerald",
  rose: "stat-gradient-rose",
  amber: "stat-gradient-amber",
  cyan: "stat-gradient-cyan",
  dark: "stat-gradient-dark",
};

const GradientStatCard: React.FC<GradientStatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel = "vs last month",
  gradient = "blue",
  subtitle,
  animated = true,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${gradientClasses[gradient]} p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${animated ? "stat-card-animate" : ""}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 -mr-6 sm:-mr-8 -mt-6 sm:-mt-8 rounded-full bg-white/10 stat-pulse-ring" />
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 -ml-5 sm:-ml-6 -mb-5 sm:-mb-6 rounded-full bg-white/5" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-white/70 truncate">{title}</p>
          <p className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 ${animated ? "stat-value-animate" : ""}`}>
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-2 sm:mt-3 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-1.5 sm:px-2 py-0.5 text-xs font-semibold ${
                  change >= 0 ? "bg-white/20 text-white" : "stat-gradient-down-badge"
                }`}
              >
                {change >= 0 ? (
                  <TrendUpIcon className="w-3 h-3" />
                ) : (
                  <TrendDownIcon className="w-3 h-3" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-white/50">{changeLabel}</span>
            </div>
          )}
          {subtitle && !change && (
            <p className="text-xs text-white/50 mt-2 sm:mt-3">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-white [&>svg]:w-full [&>svg]:h-full">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradientStatCard;
