import type { ReactNode } from "react";

export interface ActionItem {
  label?: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}
