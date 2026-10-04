import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export const CardKind = {
  Normal: 1,
  TvRegistration: 2,
  TvRenewal: 3,
} as const;

export type CardKindValue = typeof CardKind[keyof typeof CardKind];

export const cardKindKeys: Record<CardKindValue, string> = {
  [CardKind.Normal]: "cardKinds.normal",
  [CardKind.TvRegistration]: "cardKinds.tvRegistration",
  [CardKind.TvRenewal]: "cardKinds.tvRenewal",
};

export const isTvKind = (kind: number) => kind === CardKind.TvRegistration || kind === CardKind.TvRenewal;

export interface CardTypeFilter {
  name?: string;
  cardCategoryId?: number;
  cityId?: number;
  kind?: number;
  targetRoleId?: number;
  durationMonthsFrom?: number;
  durationMonthsTo?: number;
  agentPriceFrom?: number;
  agentPriceTo?: number;
  clientPriceFrom?: number;
  clientPriceTo?: number;
  amountFrom?: number;
  amountTo?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CardTypeRequest extends BaseRequest, CardTypeFilter {}

export interface CardTypeListDto extends BaseDto {
  cardCategoryId: number;
  cardCategoryName: string | null;
  cityId: number;
  cityName: string | null;
  name: string;
  description: string | null;
  imageId: string;
  imageUrl: string | null;
  kind: CardKindValue;
  durationMonths: number | null;
  agentPrice: number | null;
  clientPrice: number | null;
  amount: number;
  targetRoleIds: number[];
  sortOrder: number;
  isActive: boolean;
}

export interface CardTypeTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  description: string | null;
  cardTypeId: number;
}

export interface CardTypeDto extends CardTypeListDto {
  translations: CardTypeTranslationDto[];
}

export interface CardTypeFormData {
  cardCategoryId: number;
  kind: number;
  durationMonths: number | null;
  targetRoleIds: number[];
  agentPrice: number | null;
  clientPrice: number | null;
  amount: number;
  sortOrder: number;
  isActive: boolean;
  image: File | null;
  translations: { languageCode: string; name: string; description: string | null }[];
}
