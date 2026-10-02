import { useMemo } from "react";
import { Line } from "./chartSetup";
import { chartColors, useChartTheme, getCSSVar } from "./chartSetup";
import type { ChartVariant } from "./chartSetup";
import type { ChartData, ChartOptions } from "chart.js";

interface LineChartDataset {
  label: string;
  data: number[];
  variant?: ChartVariant;
  fill?: boolean;
  tension?: number;
  borderDash?: number[];
  pointRadius?: number;
}

interface LineChartProps {
  labels: string[];
  datasets: LineChartDataset[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  stacked?: boolean;
  className?: string;
}

const LineChart = ({
  labels,
  datasets,
  title,
  height = 300,
  showLegend = true,
  showGrid = true,
  stacked = false,
  className = "",
}: LineChartProps) => {
  const { gridColor, tickColor } = useChartTheme();

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => {
        const variant = ds.variant || (Object.keys(chartColors)[i % 6] as ChartVariant);
        const colors = chartColors[variant];
        return {
          label: ds.label,
          data: ds.data,
          borderColor: colors.main,
          backgroundColor: ds.fill ? colors.light : colors.main,
          fill: ds.fill || false,
          tension: ds.tension ?? 0.4,
          borderDash: ds.borderDash,
          pointRadius: ds.pointRadius ?? 4,
          pointHoverRadius: 6,
          pointBackgroundColor: getCSSVar("--chart-point-bg"),
          pointBorderColor: colors.main,
          pointBorderWidth: 2,
          borderWidth: 2,
        };
      }),
    }),
    [labels, datasets]
  );

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend,
          position: "top" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
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
          displayColors: true,
        },
      },
      scales: {
        x: {
          stacked,
          grid: { display: showGrid, color: gridColor },
          ticks: { font: { size: 12 }, color: tickColor },
        },
        y: {
          stacked,
          grid: { display: showGrid, color: gridColor },
          ticks: { font: { size: 12 }, color: tickColor },
          beginAtZero: true,
        },
      },
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
    }),
    [showLegend, showGrid, stacked, gridColor, tickColor]
  );

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export type { LineChartProps, LineChartDataset };
export default LineChart;
