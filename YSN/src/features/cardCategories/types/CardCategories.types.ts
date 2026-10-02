import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export const CardCategoryAccess = {
  Default: 0,
  Allow: 1,
  Block: 2,
} as const;

export type CardCategoryAccessValue = typeof CardCategoryAccess[keyof typeof CardCategoryAccess];

export const cardCategoryAccessKeys: Record<CardCategoryAccessValue, string> = {
  [CardCategoryAccess.Default]: "cardCategoryAccess.default",
  [CardCategoryAccess.Allow]: "cardCategoryAccess.allow",
  [CardCategoryAccess.Block]: "cardCategoryAccess.block",
};

export const CardCategoryVisibility = {
  Blocked: 1,
  Allowed: 2,
  AllCities: 3,
  OwnCity: 4,
  OtherCity: 5,
  Inactive: 6,
  NoVisibleTypes: 7,
} as const;

export type CardCategoryVisibilityValue = typeof CardCategoryVisibility[keyof typeof CardCategoryVisibility];

export const cardCategoryVisibilityKeys: Record<CardCategoryVisibilityValue, string> = {
  [CardCategoryVisibility.Blocked]: "cardCategoryVisibility.blocked",
  [CardCategoryVisibility.Allowed]: "cardCategoryVisibility.allowed",
  [CardCategoryVisibility.AllCities]: "cardCategoryVisibility.allCities",
  [CardCategoryVisibility.OwnCity]: "cardCategoryVisibility.ownCity",
  [CardCategoryVisibility.OtherCity]: "cardCategoryVisibility.otherCity",
  [CardCategoryVisibility.Inactive]: "cardCategoryVisibility.inactive",
  [CardCategoryVisibility.NoVisibleTypes]: "cardCategoryVisibility.noVisibleTypes",
};

export interface CardCategoryFilter {
  name?: string;
  cityId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CardCategoryRequest extends BaseRequest, CardCategoryFilter {}

export interface CardCategoryListDto extends BaseDto {
  cityId: number;
  cityName: string | null;
  name: string;
  imageId: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  cardTypesCount: number;
}

export interface CardCategoryTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  cardCategoryId: number;
}

export interface CardCategoryDto extends CardCategoryListDto {
  translations: CardCategoryTranslationDto[];
}

export interface CardCategoryFormData {
  cityId: number;
  sortOrder: number;
  isActive: boolean;
  image: File | null;
  translations: { languageCode: string; name: string }[];
}

export interface CustomerCardCategoryAccessFilter {
  name?: string;
  cityId?: number;
  access?: number;
  isVisible?: boolean;
}

export interface CustomerCardCategoryAccessRequest extends BaseRequest, CustomerCardCategoryAccessFilter {}

export interface CustomerCardCategoryAccessDto {
  cardCategoryId: number;
  name: string;
  cityId: number;
  cityName: string | null;
  imageUrl: string | null;
  sortOrder: number;
  access: CardCategoryAccessValue;
  isVisible: boolean;
  visibilityReason: CardCategoryVisibilityValue;
}
