import type { BaseListResponse } from "../../../../shared/types/base";
import type { CardKindValue } from "../../../cardTypes/types/CardTypes.types";

export interface PriceListReportFilter {
  cardCategoryId?: number;
  cardTypeId?: number;
  cityId?: number;
  kind?: number;
  isActive?: boolean;
}

export interface PriceListReportRequest extends PriceListReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface PriceListReportRowDto {
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryId: number;
  cardCategoryName: string | null;
  cityId: number;
  cityName: string | null;
  kind: CardKindValue;
  durationMonths: number | null;
  agentPrice: number | null;
  clientPrice: number | null;
  amount: number;
  isActive: boolean;
  sortOrder: number;
  availableCount: number;
}

export interface PriceListReportSummaryDto {
  cardTypesCount: number;
  activeCount: number;
  availableCount: number;
}

export interface PriceListReportDto {
  summary: PriceListReportSummaryDto;
  rows: BaseListResponse<PriceListReportRowDto>;
}
