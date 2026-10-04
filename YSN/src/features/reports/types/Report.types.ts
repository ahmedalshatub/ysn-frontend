import type { ReactNode } from "react";
import type { BaseListResponse } from "../../../shared/types/base";

export interface ReportResponse<TRow, TSummary> {
  summary: TSummary;
  rows: BaseListResponse<TRow>;
}

export interface ReportDateRange {
  fromDate?: string;
  toDate?: string;
}

export interface ReportPaging {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface ReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  customerId?: number;
}

export interface ReportFiltersProps<TValues> {
  values: TValues;
  hideCustomer?: boolean;
  onChange: (changes: Partial<TValues>) => void;
  onSearch: () => void;
  onClear: () => void;
}

export interface ReportColumn<TRow> {
  key: string;
  header: string;
  render?: (row: TRow, index: number) => ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface ReportOption {
  value: number | boolean;
  label: string;
}

export interface ReportSummaryItem {
  label: string;
  value: string;
  icon: ReactNode;
  variant: "primary" | "success" | "danger" | "warning" | "info" | "dark";
}

export const ReportDatePreset = {
  Today: "today",
  ThisWeek: "thisWeek",
  ThisMonth: "thisMonth",
  LastMonth: "lastMonth",
  ThisYear: "thisYear",
  Custom: "custom",
} as const;

export type ReportDatePresetValue = typeof ReportDatePreset[keyof typeof ReportDatePreset];

export const reportDatePresetList: ReportDatePresetValue[] = [
  ReportDatePreset.Today,
  ReportDatePreset.ThisWeek,
  ReportDatePreset.ThisMonth,
  ReportDatePreset.LastMonth,
  ReportDatePreset.ThisYear,
  ReportDatePreset.Custom,
];

export const reportDatePresetKeys: Record<ReportDatePresetValue, string> = {
  [ReportDatePreset.Today]: "reports.common.presets.today",
  [ReportDatePreset.ThisWeek]: "reports.common.presets.thisWeek",
  [ReportDatePreset.ThisMonth]: "reports.common.presets.thisMonth",
  [ReportDatePreset.LastMonth]: "reports.common.presets.lastMonth",
  [ReportDatePreset.ThisYear]: "reports.common.presets.thisYear",
  [ReportDatePreset.Custom]: "reports.common.presets.custom",
};

export const reportPageSizeOptions = [
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
