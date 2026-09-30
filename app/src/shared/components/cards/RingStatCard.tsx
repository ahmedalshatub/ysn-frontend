import React from "react";

type RingVariant = "primary" | "success" | "danger" | "warning" | "info";

interface RingStatCardProps {
  title: string;
  value: string | number;
  progress: number;
  icon?: React.ReactNode;
  variant?: RingVariant;
  size?: "sm" | "md" | "lg";
  subtitle?: string;
  animated?: boolean;
}

const strokeColors: Record<RingVariant, string> = {
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  danger: "var(--color-danger)",
  warning: "var(--color-warning)",
  info: "var(--color-info)",
};

const ringDimensions = {
  sm: { size: 52, smSize: 44, strokeWidth: 4, smStrokeWidth: 3, radius: 22, smRadius: 18 },
  md: { size: 72, smSize: 56, strokeWidth: 5, smStrokeWidth: 4, radius: 29, smRadius: 22 },
  lg: { size: 88, smSize: 64, strokeWidth: 6, smStrokeWidth: 5, radius: 36, smRadius: 26 },
};

const RingStatCard: React.FC<RingStatCardProps> = ({
  title,
  value,
  progress,
  icon,
  variant = "primary",
  size = "md",
  subtitle,
  animated = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const dims = ringDimensions[size];

  const circumference = 2 * Math.PI * dims.radius;
  const offset = circumference - (clampedProgress / 100) * circumference;
  const smCircumference = 2 * Math.PI * dims.smRadius;
  const smOffset = smCircumference - (clampedProgress / 100) * smCircumference;

  return (
    <div
      className={`stat-card rounded-2xl border p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${animated ? "stat-card-animate" : ""}`}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex-shrink-0 relative">
          <svg
            width={dims.smSize}
            height={dims.smSize}
            viewBox={`0 0 ${dims.smSize} ${dims.smSize}`}
            className="-rotate-90 block sm:hidden"
          >
            <circle cx={dims.smSize / 2} cy={dims.smSize / 2} r={dims.smRadius} fill="none" className={`stat-ring-track-${variant}`} strokeWidth={dims.smStrokeWidth} />
            <circle cx={dims.smSize / 2} cy={dims.smSize / 2} r={dims.smRadius} fill="none" stroke={strokeColors[variant]} strokeWidth={dims.smStrokeWidth} strokeLinecap="round" strokeDasharray={smCircumference} strokeDashoffset={smOffset} className={animated ? "stat-ring-circle" : ""} style={{ "--stat-ring-circumference": smCircumference } as React.CSSProperties} />
          </svg>
          <svg
            width={dims.size}
            height={dims.size}
            viewBox={`0 0 ${dims.size} ${dims.size}`}
            className="-rotate-90 hidden sm:block"
          >
            <circle cx={dims.size / 2} cy={dims.size / 2} r={dims.radius} fill="none" className={`stat-ring-track-${variant}`} strokeWidth={dims.strokeWidth} />
            <circle cx={dims.size / 2} cy={dims.size / 2} r={dims.radius} fill="none" stroke={strokeColors[variant]} strokeWidth={dims.strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={animated ? "stat-ring-circle" : ""} style={{ "--stat-ring-circumference": circumference } as React.CSSProperties} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {icon ? (
              <span className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 stat-text-${variant} [&>svg]:w-full [&>svg]:h-full`}>{icon}</span>
            ) : (
              <span className={`text-xs sm:text-sm font-bold stat-text-${variant}`}>{clampedProgress}%</span>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="stat-card-title text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className={`stat-card-value text-base sm:text-lg lg:text-2xl font-bold mt-0.5 ${animated ? "stat-value-animate" : ""}`}>
            {value}
          </p>
          {subtitle && (
            <p className="stat-card-muted text-xs mt-0.5 sm:mt-1 truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RingStatCard;
