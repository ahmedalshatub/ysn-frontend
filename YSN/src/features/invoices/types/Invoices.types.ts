import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export interface InvoiceFilter {
  id?: number;
  customerId?: number;
  customerName?: string;
  customerPhone?: string;
  customerUserType?: number;
  cityId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  serialNumber?: string;
  quantityFrom?: number;
  quantityTo?: number;
  totalPriceFrom?: number;
  totalPriceTo?: number;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface InvoiceRequest extends BaseRequest, InvoiceFilter {}

export interface InvoiceListDto extends BaseDto {
  customerId: number;
  customerName: string | null;
  customerUserType: number;
  customerPhone: string | null;
  customerCityName: string | null;
  cardTypeId: number;
  cardTypeName: string | null;
  cardTypeImageUrl: string | null;
  kind: number;
  durationMonths: number | null;
  cardCategoryName: string | null;
  quantity: number;
  basePrice: number;
  discountAmount: number;
  unitPrice: number;
  totalPrice: number;
  balanceBefore: number;
  balanceAfter: number;
  transactionId: number | null;
  deletedBy: number | null;
  deletedByName: string | null;
  deleteReason: string | null;
}

export interface InvoiceItemDto {
  cardId: number;
  serialNumber: string;
  unitPrice: number;
}

export interface InvoiceDto extends InvoiceListDto {
  items: InvoiceItemDto[];
}

export interface InvoiceStatsDto {
  invoicesCount: number;
  cardsSold: number;
  salesTotal: number;
  deletedCount: number;
  refundedTotal: number;
}

export interface DailyInvoiceTotalDto {
  date: string;
  count: number;
  cardsSold: number;
  total: number;
}

export interface TopCardTypeDto {
  cardTypeId: number;
  name: string | null;
  count: number;
  total: number;
}
