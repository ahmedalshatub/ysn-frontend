import type { BaseRequest } from "../../../shared/types/base";

export interface NotificationFilter {
  type?: number;
  isRead?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface NotificationRequest extends BaseRequest, NotificationFilter {}

export type NotificationParameters = Record<string, string | number | boolean | null | undefined>;

export interface NotificationDto {
  id: number;
  userId: number;
  type: number;
  referenceId: number | null;
  title: string | null;
  message: string | null;
  parameters: NotificationParameters | null;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
}

export interface MarkAsReadDto {
  notificationIds: number[];
}

export type EmailLanguage = "ar" | "en";

export interface NotificationTypeSettingDto {
  type: number;
  systemEnabled: boolean;
  emailEnabled: boolean;
}

export interface NotificationSettingsDto {
  emailLanguage: EmailLanguage;
  email?: string | null;
  hasEmail: boolean;
  types: NotificationTypeSettingDto[];
}

export interface UpdateNotificationSettingsDto {
  emailLanguage: EmailLanguage;
  types: NotificationTypeSettingDto[];
}

export type NotificationChannelKey = "systemEnabled" | "emailEnabled";

export type NotificationTarget =
  | { kind: "path"; path: string }
  | { kind: "transaction"; id: number }
  | { kind: "invoice"; id: number }
  | { kind: "tv"; id: number }
  | { kind: "tvActivation"; id: number };
