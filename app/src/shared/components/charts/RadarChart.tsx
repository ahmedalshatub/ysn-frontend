import { useMemo } from "react";
import { Radar } from "./chartSetup";
import { chartColors, useChartTheme, getCSSVar } from "./chartSetup";
import type { ChartVariant } from "./chartSetup";
import type { ChartData, ChartOptions } from "chart.js";

interface RadarChartDataset {
  label: string;
  data: number[];
  variant?: ChartVariant;
  fill?: boolean;
}

interface RadarChartProps {
  labels: string[];
  datasets: RadarChartDataset[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  className?: string;
}

const RadarChart = ({
  labels,
  datasets,
  title,
  height = 350,
  showLegend = true,
  className = "",
}: RadarChartProps) => {
  const { gridColor, angleLineColor, tickColor } = useChartTheme();

  const data: ChartData<"radar"> = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => {
        const variant = ds.variant || (Object.keys(chartColors)[i % 6] as ChartVariant);
        const colors = chartColors[variant];
        return {
          label: ds.label,
          data: ds.data,
          borderColor: colors.main,
          backgroundColor: ds.fill !== false ? colors.light : "transparent",
          borderWidth: 2,
          pointBackgroundColor: colors.main,
          pointBorderColor: getCSSVar("--chart-point-bg"),
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      }),
    }),
    [labels, datasets]
  );

  const options: ChartOptions<"radar"> = useMemo(
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
        },
      },
      scales: {
        r: {
          angleLines: { color: angleLineColor },
          grid: { color: gridColor },
          pointLabels: { font: { size: 12 }, color: tickColor },
          ticks: { display: false },
          beginAtZero: true,
        },
      },
    }),
    [showLegend, gridColor, angleLineColor, tickColor]
  );

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export type { RadarChartProps, RadarChartDataset };
export default RadarChart;
