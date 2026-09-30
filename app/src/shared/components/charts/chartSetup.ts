import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

type ChartVariant = "primary" | "success" | "danger" | "warning" | "info" | "dark";

function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getChartColors(): Record<ChartVariant, { main: string; light: string; border: string }> {
  return {
    primary: { main: getCSSVar("--chart-primary-main"), light: getCSSVar("--chart-primary-light"), border: getCSSVar("--chart-primary-border") },
    success: { main: getCSSVar("--chart-success-main"), light: getCSSVar("--chart-success-light"), border: getCSSVar("--chart-success-border") },
    danger: { main: getCSSVar("--chart-danger-main"), light: getCSSVar("--chart-danger-light"), border: getCSSVar("--chart-danger-border") },
    warning: { main: getCSSVar("--chart-warning-main"), light: getCSSVar("--chart-warning-light"), border: getCSSVar("--chart-warning-border") },
    info: { main: getCSSVar("--chart-info-main"), light: getCSSVar("--chart-info-light"), border: getCSSVar("--chart-info-border") },
    dark: { main: getCSSVar("--chart-dark-main"), light: getCSSVar("--chart-dark-light"), border: getCSSVar("--chart-dark-border") },
  };
}

function getMultiColors(): string[] {
  return Array.from({ length: 10 }, (_, i) => getCSSVar(`--chart-multi-${i + 1}`));
}

function getMultiBorderColors(): string[] {
  return Array.from({ length: 10 }, (_, i) => getCSSVar(`--chart-multi-border-${i + 1}`));
}

const chartColors = getChartColors();
const multiColors = getMultiColors();
const multiBorderColors = getMultiBorderColors();

export type { ChartVariant, ChartOptions, ChartData };
export { chartColors, multiColors, multiBorderColors, ChartJS, getCSSVar, getChartColors, getMultiColors, getMultiBorderColors };
export { Line, Bar, Pie, Doughnut, Radar, PolarArea };

export function useChartTheme() {
  const isDark = useSelector((state: { theme: { mode: string } }) => state.theme.mode) === "dark";
  return {
    isDark,
    gridColor: getCSSVar("--chart-grid"),
    angleLineColor: getCSSVar("--chart-angle-line"),
    tickColor: getCSSVar("--chart-tick"),
    titleColor: getCSSVar("--chart-legend"),
  };
}
