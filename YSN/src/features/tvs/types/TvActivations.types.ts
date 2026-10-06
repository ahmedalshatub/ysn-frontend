import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const TvActivationStatus = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
} as const;

export type TvActivationStatusValue = typeof TvActivationStatus[keyof typeof TvActivationStatus];

export const tvActivationStatusList: TvActivationStatusValue[] = [
  TvActivationStatus.Pending,
  TvActivationStatus.Completed,
  TvActivationStatus.Failed,
];

export const tvActivationStatusKeys: Record<TvActivationStatusValue, string> = {
  [TvActivationStatus.Pending]: "tvActivationStatuses.pending",
  [TvActivationStatus.Completed]: "tvActivationStatuses.completed",
  [TvActivationStatus.Failed]: "tvActivationStatuses.failed",
};

export const tvActivationStatusVariants: Record<TvActivationStatusValue, "warning" | "success" | "danger"> = {
  [TvActivationStatus.Pending]: "warning",
  [TvActivationStatus.Completed]: "success",
  [TvActivationStatus.Failed]: "danger",
};

export const TvActivationChannel = {
  App: 1,
  Dashboard: 2,
} as const;

export type TvActivationChannelValue = typeof TvActivationChannel[keyof typeof TvActivationChannel];

export const tvActivationChannelList: TvActivationChannelValue[] = [TvActivationChannel.App, TvActivationChannel.Dashboard];

export const tvActivationChannelKeys: Record<TvActivationChannelValue, string> = {
  [TvActivationChannel.App]: "tvActivationChannels.app",
  [TvActivationChannel.Dashboard]: "tvActivationChannels.dashboard",
};

export const TvActivationSource = {
  Card: 1,
  TypedCode: 2,
} as const;

export type TvActivationSourceValue = typeof TvActivationSource[keyof typeof TvActivationSource];

export const tvActivationSourceList: TvActivationSourceValue[] = [TvActivationSource.Card, TvActivationSource.TypedCode];

export const tvActivationSourceKeys: Record<TvActivationSourceValue, string> = {
  [TvActivationSource.Card]: "tvActivationSources.card",
  [TvActivationSource.TypedCode]: "tvActivationSources.typedCode",
};

export const ActivateTvMode = {
  Card: "card",
  Code: "code",
} as const;

export type ActivateTvModeValue = typeof ActivateTvMode[keyof typeof ActivateTvMode];

export const resolveTvActivationStatuses: TvActivationStatusValue[] = [TvActivationStatus.Completed, TvActivationStatus.Failed];

export const TV_CARD_CODE_MIN_LENGTH = 4;
export const TV_CARD_CODE_MAX_LENGTH = 100;
export const TV_RESOLVE_NOTE_MAX_LENGTH = 500;

export interface TvActivationFilter {
  customerTvId?: number;
  tvId?: number;
  tvNumber?: string;
  cityId?: number;
  userId?: number;
  customerName?: string;
  roleId?: number;
  cardTypeId?: number;
  cardCategoryId?: number;
  source?: number;
  kind?: number;
  status?: number;
  needsChecking?: boolean;
  channel?: number;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
  completedFrom?: string;
  completedTo?: string;
}

export interface TvActivationRequest extends BaseRequest, TvActivationFilter {}

export interface TvActivationListDto extends BaseDto {
  customerTvId: number;
  tvId: number;
  tvNumber: string;
  cityId: number;
  cityName: string | null;
  userId: number;
  customerName: string;
  customerRoleId: number;
  nickname: string | null;
  source: TvActivationSourceValue;
  cardId: number | null;
  cardCodeMasked: string;
  cardTypeId: number | null;
  cardTypeName: string | null;
  kind: number;
  durationMonths: number | null;
  status: TvActivationStatusValue;
  needsChecking: boolean;
  channel: TvActivationChannelValue;
  providerMessage: string | null;
  completedAt: string | null;
}

export interface TvActivationDto extends TvActivationListDto {
  providerStatusCode: number | null;
  providerResponse: string | null;
  resolvedBy: number | null;
  resolvedByName: string | null;
  resolveNote: string | null;
}

export interface UsableTvCardFilter {
  customerTvId: number;
  kind?: number;
}

export interface UsableTvCardDto {
  cardId: number;
  cardTypeId: number;
  cardTypeName: string | null;
  kind: number;
  durationMonths: number | null;
  cardCodeMasked: string;
  invoiceId: number | null;
  boughtAt: string | null;
}

export interface ActivateTvDto {
  customerTvId: number;
  cardId?: number;
  cardCode?: string;
  isRenewal?: boolean;
}

export interface ResolveTvActivationDto {
  status: TvActivationStatusValue;
  note?: string;
}
