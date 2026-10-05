import type { BaseListResponse } from "../../../../shared/types/base";

export interface CardStockReportFilter {
  cardCategoryId?: number;
  cardTypeId?: number;
  cityId?: number;
  kind?: number;
  isActive?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface CardStockReportRequest extends CardStockReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface CardStockReportRowDto {
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryId: number;
  cardCategoryName: string | null;
  cityId: number;
  cityName: string | null;
  kind: number;
  isActive: boolean;
  sortOrder: number;
  addedCount: number;
  soldCount: number;
  disabledCount: number;
  deletedCount: number;
  availableCount: number;
}

export interface CardStockReportSummaryDto {
  cardTypesCount: number;
  addedCount: number;
  soldCount: number;
  disabledCount: number;
  deletedCount: number;
  availableCount: number;
}

export interface CardStockReportDto {
  summary: CardStockReportSummaryDto;
  rows: BaseListResponse<CardStockReportRowDto>;
}
