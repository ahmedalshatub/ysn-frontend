import type { BaseDto, BaseRequest } from '../../../shared/types/base';

export interface AuditLogFilter {
  userId?: number;
  userName?: string;
  action?: string;
  tableName?: string;
  recordId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface AuditLogRequest extends BaseRequest, AuditLogFilter {}

export interface AuditLog extends BaseDto {
  userId?: number;
  userName?: string;
  action: string;
  tableName: string;
  recordId?: number;
  oldValues?: string;
  newValues?: string;
  ipAddress?: string;
  userAgent?: string;
}
