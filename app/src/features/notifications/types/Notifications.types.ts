import type { BaseRequest } from '../../../shared/types/base';

export interface NotificationFilter {
  isRead?: boolean;
}

export interface NotificationRequest extends BaseRequest, NotificationFilter {}

export interface NotificationDto {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface MarkAsReadDto {
  notificationIds: number[];
}

export interface UnreadCountResponse {
  count: number;
}
