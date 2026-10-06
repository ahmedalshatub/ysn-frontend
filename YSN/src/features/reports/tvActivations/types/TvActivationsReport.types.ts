import type { BaseListResponse } from "../../../../shared/types/base";

export const TvActivationsReportKind = {
  Registration: 2,
  Renewal: 3,
} as const;

export type TvActivationsReportKindValue = typeof TvActivationsReportKind[keyof typeof TvActivationsReportKind];

export const tvActivationsReportKindKeys: Record<TvActivationsReportKindValue, string> = {
  [TvActivationsReportKind.Registration]: "reports.tvActivations.kindRegistration",
  [TvActivationsReportKind.Renewal]: "reports.tvActivations.kindRenewal",
};

export const TvActivationsReportStatus = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
} as const;

export type TvActivationsReportStatusValue = typeof TvActivationsReportStatus[keyof typeof TvActivationsReportStatus];

export const tvActivationsReportStatusKeys: Record<TvActivationsReportStatusValue, string> = {
  [TvActivationsReportStatus.Pending]: "reports.tvActivations.statusPending",
  [TvActivationsReportStatus.Completed]: "reports.tvActivations.statusCompleted",
  [TvActivationsReportStatus.Failed]: "reports.tvActivations.statusFailed",
};

export const TvActivationsReportChannel = {
  App: 1,
  Dashboard: 2,
} as const;

export type TvActivationsReportChannelValue = typeof TvActivationsReportChannel[keyof typeof TvActivationsReportChannel];

export const tvActivationsReportChannelKeys: Record<TvActivationsReportChannelValue, string> = {
  [TvActivationsReportChannel.App]: "reports.tvActivations.channelApp",
  [TvActivationsReportChannel.Dashboard]: "reports.tvActivations.channelDashboard",
};

export interface TvActivationsReportFilter {
  cityId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  isTypedCode?: boolean;
  kind?: number;
  status?: number;
  needsChecking?: boolean;
  channel?: number;
  customerId?: number;
  customerRoleId?: number;
  tvNumber?: string;
  fromDate?: string;
  toDate?: string;
}

export interface TvActivationsReportRequest extends TvActivationsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface TvActivationsReportRowDto {
  cityId: number;
  cityName: string | null;
  cardTypeId: number | null;
  cardTypeName: string | null;
  kind: number;
  activationsCount: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  needsCheckingCount: number;
}

export interface TvActivationsReportSummaryDto {
  activationsCount: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  needsCheckingCount: number;
  registrationsCount: number;
  renewalsCount: number;
  typedCodeCount: number;
  successRate: number;
}

export interface TvActivationsReportDto {
  summary: TvActivationsReportSummaryDto;
  rows: BaseListResponse<TvActivationsReportRowDto>;
}
