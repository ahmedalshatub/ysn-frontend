import type { ComponentType } from "react";
import type { PermissionCode } from "../../../shared/types/Permissions.types";

export const DashboardPeriod = {
  Today: "today",
  Week: "week",
  Month: "month",
  Year: "year",
  Custom: "custom",
} as const;

export type DashboardPeriodValue = (typeof DashboardPeriod)[keyof typeof DashboardPeriod];

export interface DashboardFilterValues {
  period: DashboardPeriodValue;
  fromDate?: string;
  toDate?: string;
  cityId?: number;
}

export interface DashboardRange {
  fromDate: string;
  toDate: string;
  cityId?: number;
}

export interface DashboardWidgetProps {
  range: DashboardRange;
}

export interface DashboardWidgetDefinition {
  key: string;
  wide?: boolean;
  isVisible: (can: (permission: PermissionCode) => boolean) => boolean;
  component: ComponentType<DashboardWidgetProps>;
}
