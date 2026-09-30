import { useMemo } from "react";
import { Pie } from "./chartSetup";
import { multiColors, multiBorderColors, useChartTheme, getCSSVar } from "./chartSetup";
import type { ChartData, ChartOptions } from "chart.js";

interface PieChartProps {
  labels: string[];
  data: number[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  colors?: string[];
  borderColors?: string[];
  className?: string;
}

const PieChart = ({
  labels,
  data,
  title,
  height = 300,
  showLegend = true,
  legendPosition = "right",
  colors,
  borderColors,
  className = "",
}: PieChartProps) => {
  const { tickColor } = useChartTheme();

  const chartData: ChartData<"pie"> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors || multiColors.slice(0, data.length),
          borderColor: borderColors || multiBorderColors.slice(0, data.length),
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    }),
    [labels, data, colors, borderColors]
  );

  const options: ChartOptions<"pie"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend,
          position: legendPosition,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
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
    }),
    [showLegend, legendPosition, tickColor]
  );

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export type { PieChartProps };
export default PieChart;
