import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export interface CityFilter {
  name?: string;
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
  translations: CityTranslationDto[];
}

export interface AddCityTranslationDto {
  languageCode: DataLanguageType;
  name: string;
}

export interface AddCityDto {
  sortOrder: number;
  isActive: boolean;
  translations: AddCityTranslationDto[];
}

export type UpdateCityDto = AddCityDto;
