import React from "react";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";

interface TrendPoint {
  value: number;
}

type SparklineVariant = "primary" | "success" | "danger" | "warning" | "info";

interface SparklineStatCardProps {
  title: string;
  value: string | number;
  data: TrendPoint[];
  change?: number;
  changeLabel?: string;
  variant?: SparklineVariant;
  animated?: boolean;
}

function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const getLineColors = (): Record<SparklineVariant, string> => ({
  primary: getCSSVar("--color-primary"),
  success: getCSSVar("--color-success"),
  danger: getCSSVar("--color-danger"),
  warning: getCSSVar("--color-warning"),
  info: getCSSVar("--color-info"),
});

const getGradientColors = (): Record<SparklineVariant, { start: string; end: string }> => ({
  primary: { start: getCSSVar("--color-primary"), end: getCSSVar("--color-primary") + "00" },
  success: { start: getCSSVar("--color-success"), end: getCSSVar("--color-success") + "00" },
  danger: { start: getCSSVar("--color-danger"), end: getCSSVar("--color-danger") + "00" },
  warning: { start: getCSSVar("--color-warning"), end: getCSSVar("--color-warning") + "00" },
  info: { start: getCSSVar("--color-info"), end: getCSSVar("--color-info") + "00" },
});

const buildSparklinePath = (data: TrendPoint[], width: number, height: number, padding: number = 4): { line: string; area: string } => {
  if (data.length < 2) return { line: "", area: "" };

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const points = values.map((v, i) => ({
    x: padding + (i / (values.length - 1)) * usableWidth,
    y: padding + usableHeight - ((v - min) / range) * usableHeight,
  }));

  let line = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) / 3;
    const cpx2 = prev.x + (2 * (curr.x - prev.x)) / 3;
    line += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const area = `${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return { line, area };
};

const SparklineStatCard: React.FC<SparklineStatCardProps> = ({
  title,
  value,
  data,
  change,
  changeLabel = "vs last period",
  variant = "primary",
  animated = true,
}) => {
  const svgWidth = 160;
  const svgHeight = 48;
  const gradientId = React.useId();
  const { line, area } = buildSparklinePath(data, svgWidth, svgHeight);
  const lineColors = getLineColors();
  const gradientColors = getGradientColors();

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
        </div>

        <div className="flex-shrink-0 mt-1 hidden sm:block">
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={gradientColors[variant].start} />
                <stop offset="100%" stopColor={gradientColors[variant].end} />
              </linearGradient>
            </defs>
            {area && <path d={area} fill={`url(#${gradientId})`} opacity={0.2} />}
            {line && (
              <path
                d={line}
                fill="none"
                stroke={lineColors[variant]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
        <div className="flex-shrink-0 mt-1 block sm:hidden">
          <svg width={100} height={36} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
            <defs>
              <linearGradient id={`${gradientId}-sm`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={gradientColors[variant].start} />
                <stop offset="100%" stopColor={gradientColors[variant].end} />
              </linearGradient>
            </defs>
            {area && <path d={area} fill={`url(#${gradientId}-sm)`} opacity={0.2} />}
            {line && (
              <path d={line} fill="none" stroke={lineColors[variant]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export type { TrendPoint };
export default SparklineStatCard;
