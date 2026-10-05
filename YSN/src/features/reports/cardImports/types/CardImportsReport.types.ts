import type { BaseListResponse } from "../../../../shared/types/base";
import type { CardSourceValue } from "../../../cards/types/Cards.types";

export interface CardImportsReportFilter {
  cardCategoryId?: number;
  cardTypeId?: number;
  cityId?: number;
  source?: number;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CardImportsReportRequest extends CardImportsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface CardImportsReportRowDto {
  firstCardId: number;
  importBatchId: string | null;
  createdAt: string;
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryName: string | null;
  cityId: number;
  cityName: string | null;
  source: CardSourceValue;
  createdBy: number | null;
  createdByName: string | null;
  addedCount: number;
  skippedCount: number;
  soldCount: number;
  disabledCount: number;
  deletedCount: number;
  availableCount: number;
}

export interface CardImportsReportSummaryDto {
  batchesCount: number;
  addedCount: number;
  skippedCount: number;
  soldCount: number;
  availableCount: number;
}

export interface CardImportsReportDto {
  summary: CardImportsReportSummaryDto;
  rows: BaseListResponse<CardImportsReportRowDto>;
}
