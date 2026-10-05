import type { BaseListResponse } from "../../../../shared/types/base";

export interface InvoiceDeletionsReportFilter {
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  deletedBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface InvoiceDeletionsReportRequest extends InvoiceDeletionsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface InvoiceDeletionsReportRowDto {
  invoiceId: number;
  createdAt: string;
  deletedAt: string | null;
  customerId: number;
  customerName: string;
  customerRoleId: number;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryName: string | null;
  quantity: number;
  refundedTotal: number;
  deleteReason: string | null;
  deletedBy: number | null;
  deletedByName: string | null;
}

export interface InvoiceDeletionsReportSummaryDto {
  invoicesCount: number;
  cardsCount: number;
  refundedTotal: number;
}

export interface InvoiceDeletionsReportDto {
  summary: InvoiceDeletionsReportSummaryDto;
  rows: BaseListResponse<InvoiceDeletionsReportRowDto>;
}
