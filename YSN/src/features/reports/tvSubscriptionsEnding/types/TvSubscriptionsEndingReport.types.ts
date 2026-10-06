import type { BaseListResponse } from "../../../../shared/types/base";

export const TV_SUBSCRIPTIONS_ENDING_DEFAULT_DAYS = 30;
export const TV_SUBSCRIPTIONS_ENDING_SOON_DAYS = 7;

export interface TvSubscriptionsEndingReportFilter {
  cityId?: number;
  customerId?: number;
  customerRoleId?: number;
  tvNumber?: string;
  hasCustomers?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface TvSubscriptionsEndingReportRequest extends TvSubscriptionsEndingReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface TvSubscriptionsEndingReportRowDto {
  tvId: number;
  tvNumber: string;
  cityId: number;
  cityName: string | null;
  subscriptionEndsAt: string;
  subscriptionCheckedAt: string | null;
  daysLeft: number;
  customersCount: number;
  customerNames: string | null;
}

export interface TvSubscriptionsEndingReportSummaryDto {
  tvsCount: number;
  endedCount: number;
  firstWeekCount: number;
  secondWeekCount: number;
  thirdWeekCount: number;
  fourthWeekCount: number;
  laterCount: number;
  withoutCustomersCount: number;
}

export interface TvSubscriptionsEndingReportDto {
  summary: TvSubscriptionsEndingReportSummaryDto;
  rows: BaseListResponse<TvSubscriptionsEndingReportRowDto>;
}
