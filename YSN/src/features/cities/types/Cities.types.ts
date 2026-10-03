import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export interface CityFilter {
  name?: string;
  hasTvSmsApi?: boolean;
  tvSmsServerId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CityRequest extends BaseRequest, CityFilter {}

export interface CityListDto extends BaseDto {
  sortOrder: number;
  isActive: boolean;
  customersCount: number;
  hasTvSmsApi: boolean;
  tvSmsServerId: number | null;
  tvSmsServerName: string | null;
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
  hasTvSmsApi: boolean;
  tvSmsServerId: number | null;
  tvSmsServerName: string | null;
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
  tvSmsServerId: number | null;
  translations: AddCityTranslationDto[];
}

export type UpdateCityDto = AddCityDto;
