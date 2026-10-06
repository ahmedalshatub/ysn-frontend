import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export interface CityFilter {
  name?: string;
  hasTvSmsApi?: boolean;
  ePaymentEnabled?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CityRequest extends BaseRequest, CityFilter {}

export const CityLinkAction = {
  Move: 1,
  Delete: 2,
} as const;

export type CityLinkActionValue = typeof CityLinkAction[keyof typeof CityLinkAction];

export interface CityLinksDto {
  customersCount: number;
  deletedCustomersCount: number;
  customersWithBalanceCount: number;
  cardCategoriesCount: number;
  deletedCardCategoriesCount: number;
  cardTypesCount: number;
  employeesCount: number;
  tvsCount: number;
}

export interface PermanentDeleteCityDto {
  targetCityId?: number;
  customersAction: CityLinkActionValue;
  cardCategoriesAction: CityLinkActionValue;
  employeesAction: CityLinkActionValue;
}

export interface PermanentDeleteCityResultDto {
  customersMoved: number;
  customersDeleted: number;
  cardCategoriesMoved: number;
  cardCategoriesDeleted: number;
  cardTypesDeleted: number;
  employeesMoved: number;
  employeesRemoved: number;
}

export interface CityListDto extends BaseDto {
  sortOrder: number;
  isActive: boolean;
  ePaymentEnabled: boolean;
  customersCount: number;
  hasTvSmsApi: boolean;
  name: string;
}

export interface CityTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  cityId: number;
}

export interface CityDto extends BaseDto {
  sortOrder: number;
  isActive: boolean;
  ePaymentEnabled: boolean;
  hasTvSmsApi: boolean;
  tvSmsBaseUrl: string | null;
  tvSmsUserId: string | null;
  tvSmsDefaultLanguage: number | null;
  tvSmsDefaultDepartmentId: number | null;
  tvSmsDefaultRegionId: number | null;
  tvSmsDefaultCustomerTypeId: number | null;
  hasTvSmsPassword: boolean;
  hasTvSmsAuthKey: boolean;
  hasTvSmsPublicKey: boolean;
  tvSmsCertificateThumbprint: string | null;
  translations: CityTranslationDto[];
}

export interface AddCityTranslationDto {
  languageCode: DataLanguageType;
  name: string;
}

export interface AddCityDto {
  sortOrder: number;
  isActive: boolean;
  hasTvSmsApi: boolean;
  tvSmsBaseUrl?: string;
  tvSmsUserId?: string;
  tvSmsPassword?: string;
  tvSmsAuthKey?: string;
  tvSmsPublicKey?: string;
  tvSmsCertificateThumbprint?: string;
  tvSmsDefaultLanguage: number;
  tvSmsDefaultDepartmentId: number;
  tvSmsDefaultRegionId: number;
  tvSmsDefaultCustomerTypeId: number;
  translations: AddCityTranslationDto[];
}

export type UpdateCityDto = AddCityDto;

export const TvSmsDefaultValues = {
  language: 4,
  departmentId: 1,
  regionId: 1,
  customerTypeId: 1,
} as const;

export const TvSmsDefaultFields = [
  "tvSmsDefaultLanguage",
  "tvSmsDefaultDepartmentId",
  "tvSmsDefaultRegionId",
  "tvSmsDefaultCustomerTypeId",
] as const;
