import { useMemo } from "react";
import { Bar } from "./chartSetup";
import { chartColors, useChartTheme, getCSSVar } from "./chartSetup";
import type { ChartVariant } from "./chartSetup";
import type { ChartData, ChartOptions } from "chart.js";

interface BarChartDataset {
  label: string;
  data: number[];
  variant?: ChartVariant;
  borderRadius?: number;
}

interface BarChartProps {
  labels: string[];
  datasets: BarChartDataset[];
  title?: string;
  height?: number;
  horizontal?: boolean;
  stacked?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  barThickness?: number;
  className?: string;
}

const BarChart = ({
  labels,
  datasets,
  title,
  height = 300,
  horizontal = false,
  stacked = false,
  showLegend = true,
  showGrid = true,
  barThickness,
  className = "",
}: BarChartProps) => {
  const { gridColor, tickColor } = useChartTheme();

  const data: ChartData<"bar"> = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => {
        const variant = ds.variant || (Object.keys(chartColors)[i % 6] as ChartVariant);
        const colors = chartColors[variant];
        return {
          label: ds.label,
          data: ds.data,
          backgroundColor: colors.border,
          borderColor: colors.main,
          borderWidth: 1,
          borderRadius: ds.borderRadius ?? 6,
          barThickness,
          hoverBackgroundColor: colors.main,
        };
      }),
    }),
    [labels, datasets, barThickness]
  );

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: horizontal ? ("y" as const) : ("x" as const),
      plugins: {
        legend: {
          display: showLegend,
          position: "top" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "rectRounded",
            padding: 20,
            font: { size: 13 },
            color: tickColor,
          },
        },
        tooltip: {
          backgroundColor: getCSSVar("--chart-tooltip-bg"),
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          stacked,
          grid: { display: showGrid && !horizontal, color: gridColor },
          ticks: { font: { size: 12 }, color: tickColor },
        },
        y: {
          stacked,
          grid: { display: showGrid && horizontal ? false : showGrid, color: gridColor },
          ticks: { font: { size: 12 }, color: tickColor },
          beginAtZero: true,
        },
      },
    }),
    [horizontal, stacked, showLegend, showGrid, gridColor, tickColor]
  );

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export type { BarChartProps, BarChartDataset };
export default BarChart;
