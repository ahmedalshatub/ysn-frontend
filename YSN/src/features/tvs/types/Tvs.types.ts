import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export interface CustomerTvFilter {
  tvId?: number;
  tvNumber?: string;
  cityId?: number;
  userId?: number;
  customerName?: string;
  phoneNumber?: string;
  roleId?: number;
  nickname?: string;
  isSubscriptionActive?: boolean;
  subscriptionEndsFrom?: string;
  subscriptionEndsTo?: string;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
  removedFrom?: string;
  removedTo?: string;
}

export interface CustomerTvRequest extends BaseRequest, CustomerTvFilter {}

export interface CustomerTvListDto extends BaseDto {
  tvId: number;
  tvNumber: string;
  cityId: number;
  cityName: string | null;
  userId: number;
  customerName: string;
  customerRoleId: number;
  phoneCode: string | null;
  phoneNumber: string | null;
  nickname: string | null;
  subscriptionEndsAt: string | null;
  isEstimated: boolean;
  isSubscriptionActive: boolean;
  daysLeft: number | null;
  subscriptionCheckedAt: string | null;
  lastActivationAt: string | null;
  activationsCount: number;
  otherCustomersCount: number;
}

export interface TvLinkedCustomerDto {
  customerTvId: number;
  userId: number;
  customerName: string;
  customerRoleId: number;
  phoneCode: string | null;
  phoneNumber: string | null;
  nickname: string | null;
  createdAt: string;
}

export interface CustomerTvDto extends CustomerTvListDto {
  internalNumber: number;
  deletedBy: number | null;
  deletedByName: string | null;
  otherCustomers: TvLinkedCustomerDto[];
}

export interface AddCustomerTvDto {
  userId: number;
  tvNumber: string;
  nickname?: string;
}

export interface UpdateCustomerTvDto {
  nickname?: string;
}

export const SubscriptionState = {
  Active: "active",
  Ended: "ended",
  Unknown: "unknown",
} as const;

export type SubscriptionStateValue = typeof SubscriptionState[keyof typeof SubscriptionState];

export const subscriptionStateKeys: Record<SubscriptionStateValue, string> = {
  [SubscriptionState.Active]: "tvs.subscriptionActive",
  [SubscriptionState.Ended]: "tvs.subscriptionEnded",
  [SubscriptionState.Unknown]: "tvs.subscriptionUnknown",
};

export const subscriptionStateVariants: Record<SubscriptionStateValue, "success" | "danger" | "secondary"> = {
  [SubscriptionState.Active]: "success",
  [SubscriptionState.Ended]: "danger",
  [SubscriptionState.Unknown]: "secondary",
};

export const getSubscriptionState = (
  tv: Pick<CustomerTvListDto, "subscriptionEndsAt" | "isSubscriptionActive">
): SubscriptionStateValue => {
  if (!tv.subscriptionEndsAt) return SubscriptionState.Unknown;
  return tv.isSubscriptionActive ? SubscriptionState.Active : SubscriptionState.Ended;
};

export const tvPhone = (tv: Pick<CustomerTvListDto, "phoneCode" | "phoneNumber">) =>
  tv.phoneNumber ? `${tv.phoneCode ?? ""} ${tv.phoneNumber}`.trim() : "";

export type TvActionName = "view" | "activate" | "refresh" | "edit" | "remove";

export const TV_NUMBER_PATTERN = /^[A-Za-z0-9-]{1,100}$/;
export const TV_NICKNAME_MAX_LENGTH = 100;
