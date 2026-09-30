import React from "react";

type ProgressVariant = "primary" | "success" | "danger" | "warning" | "info";

interface ProgressStatCardProps {
  title: string;
  value: string | number;
  progress: number;
  icon?: React.ReactNode;
  variant?: ProgressVariant;
  target?: string;
  animated?: boolean;
}

const barColorClasses: Record<ProgressVariant, string> = {
  primary: "stat-bar-primary",
  success: "stat-bar-success",
  danger: "stat-bar-danger",
  warning: "stat-bar-warning",
  info: "stat-bar-info",
};

const ProgressStatCard: React.FC<ProgressStatCardProps> = ({
  title,
  value,
  progress,
  icon,
  variant = "primary",
  target,
  animated = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`stat-card rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${animated ? "stat-card-animate" : ""}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
        <div className="min-w-0 flex-1">
          <p className="stat-card-title text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className={`stat-card-value text-lg sm:text-xl lg:text-2xl font-bold mt-1 ${animated ? "stat-value-animate" : ""}`}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={`stat-icon-${variant} flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center`}>
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
          </div>
        )}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <div className={`stat-track-${variant} w-full h-1.5 sm:h-2 rounded-full overflow-hidden`}>
          <div
            className={`h-full rounded-full ${barColorClasses[variant]} ${animated ? "stat-progress-bar" : ""}`}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="stat-card-label text-xs font-medium">{clampedProgress}%</span>
          {target && <span className="stat-card-muted text-xs">{target}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProgressStatCard;
