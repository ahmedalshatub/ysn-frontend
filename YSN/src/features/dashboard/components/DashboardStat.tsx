import type { ReactNode } from "react";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";

interface DashboardStatProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "dark";
  onClick?: () => void;
}

const DashboardStat = ({ label, value, icon, variant = "primary", onClick }: DashboardStatProps) => (
  <button type="button" onClick={onClick} disabled={!onClick} className="w-full text-start disabled:cursor-default">
    <MiniStatCard label={label} value={value} icon={icon} variant={variant} />
  </button>
);

export default DashboardStat;
