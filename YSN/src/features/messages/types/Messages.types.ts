import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const MessageTarget = {
  Customer: 1,
  City: 2,
  UserType: 3,
  UserTypeInCity: 4,
  All: 5,
} as const;

export type MessageTargetValue = typeof MessageTarget[keyof typeof MessageTarget];

export const messageTargetKeys: Record<MessageTargetValue, string> = {
  [MessageTarget.Customer]: "messageTargets.customer",
  [MessageTarget.City]: "messageTargets.city",
  [MessageTarget.UserType]: "messageTargets.userType",
  [MessageTarget.UserTypeInCity]: "messageTargets.userTypeInCity",
  [MessageTarget.All]: "messageTargets.all",
};

export interface MessageFilter {
  subject?: string;
  content?: string;
  userId?: number;
  name?: string;
  phoneNumber?: string;
  userType?: number;
  cityId?: number;
  isRead?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
  readFrom?: string;
  readTo?: string;
}

export interface MessageRequest extends BaseRequest, MessageFilter {}

export interface MessageListDto extends BaseDto {
  userId: number;
  fullName: string;
  userType: number;
  phoneCode: string | null;
  phoneNumber: string | null;
  cityId: number | null;
  cityName: string | null;
  subject: string;
  contentPreview: string;
  isRead: boolean;
  readAt: string | null;
}

export interface MessageDto extends MessageListDto {
  content: string;
}

export interface SendMessageDto {
  subject: string;
  content: string;
  targetType: MessageTargetValue;
  userId?: number;
  cityId?: number;
  userType?: number;
}

export interface SendMessageResultDto {
  messagesCount: number;
}
