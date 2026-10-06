import type { BaseListResponse } from "../../../../shared/types/base";

export interface TvsByCityReportFilter {
  cityId?: number;
  customerId?: number;
  customerRoleId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface TvsByCityReportRequest extends TvsByCityReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface TvsByCityReportRowDto {
  cityId: number;
  cityName: string | null;
  tvsCount: number;
  linkedCount: number;
  activeCount: number;
  endedCount: number;
  neverActivatedCount: number;
  activationsCount: number;
  registrationsCount: number;
  renewalsCount: number;
}

export interface TvsByCityReportSummaryDto {
  citiesCount: number;
  tvsCount: number;
  linkedCount: number;
  activeCount: number;
  endedCount: number;
  neverActivatedCount: number;
  activationsCount: number;
  registrationsCount: number;
  renewalsCount: number;
}

export interface TvsByCityReportDto {
  summary: TvsByCityReportSummaryDto;
  rows: BaseListResponse<TvsByCityReportRowDto>;
}
