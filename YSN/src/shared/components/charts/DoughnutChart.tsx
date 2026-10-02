import { useMemo } from "react";
import { Doughnut } from "./chartSetup";
import { multiColors, multiBorderColors, useChartTheme, getCSSVar } from "./chartSetup";
import type { ChartData, ChartOptions } from "chart.js";

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  cutout?: string;
  colors?: string[];
  borderColors?: string[];
  centerText?: string;
  centerSubText?: string;
  className?: string;
}

const DoughnutChart = ({
  labels,
  data,
  title,
  height = 300,
  showLegend = true,
  legendPosition = "right",
  cutout = "65%",
  colors,
  borderColors,
  centerText,
  centerSubText,
  className = "",
}: DoughnutChartProps) => {
  const { tickColor, titleColor } = useChartTheme();

  const chartData: ChartData<"doughnut"> = useMemo(
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

  const centerPlugin = useMemo(() => {
    if (!centerText) return undefined;
    return {
      id: "centerText",
      afterDraw: (chart: { ctx: CanvasRenderingContext2D; chartArea: { left: number; right: number; top: number; bottom: number } }) => {
        const { ctx, chartArea } = chart;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 24px system-ui";
        ctx.fillStyle = titleColor;
        ctx.fillText(centerText, centerX, centerSubText ? centerY - 10 : centerY);

        if (centerSubText) {
          ctx.font = "13px system-ui";
          ctx.fillStyle = tickColor;
          ctx.fillText(centerSubText, centerX, centerY + 14);
        }

        ctx.restore();
      },
    };
  }, [centerText, centerSubText, titleColor, tickColor]);

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout,
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
    [showLegend, legendPosition, cutout, tickColor]
  );

  const plugins = centerPlugin ? [centerPlugin] : [];

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <Doughnut data={chartData} options={options} plugins={plugins} />
      </div>
    </div>
  );
};

export type { DoughnutChartProps };
export default DoughnutChart;
