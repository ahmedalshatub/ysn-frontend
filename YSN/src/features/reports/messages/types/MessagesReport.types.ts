import type { BaseListResponse } from "../../../../shared/types/base";
import type { CustomerRoleValue } from "../../../customers/types/Customers.types";

export interface MessagesReportFilter {
  customerId?: number;
  customerRoleId?: number;
  cityId?: number;
  subject?: string;
  isRead?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface MessagesReportRequest extends MessagesReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface MessagesReportRowDto {
  id: number;
  createdAt: string;
  subject: string;
  customerId: number;
  customerName: string;
  customerRoleId: CustomerRoleValue;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  isRead: boolean;
  readAt: string | null;
  createdBy: number | null;
  senderName: string | null;
}

export interface MessagesReportSummaryDto {
  messagesCount: number;
  readCount: number;
  unreadCount: number;
  readRate: number;
}

export interface MessagesReportDto {
  summary: MessagesReportSummaryDto;
  rows: BaseListResponse<MessagesReportRowDto>;
}
