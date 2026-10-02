import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export interface CountryFilter {
  name?: string;
  isoCode?: string;
  phoneCode?: string;
  isActive?: boolean;
  isDefault?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CountryRequest extends BaseRequest, CountryFilter {}

export interface CountryListDto extends BaseDto {
  isoCode: string;
  phoneCode: string;
  phoneNumberLength: number | null;
  isActive: boolean;
  isDefault: boolean;
  name: string;
}

export interface CountryTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  countryId: number;
}

export interface CountryDto extends BaseDto {
  isoCode: string;
  phoneCode: string;
  phoneNumberLength: number | null;
  isActive: boolean;
  isDefault: boolean;
  translations: CountryTranslationDto[];
}

export interface AddCountryTranslationDto {
  languageCode: DataLanguageType;
  name: string;
}

export interface AddCountryDto {
  isoCode: string;
  phoneCode: string;
  phoneNumberLength: number | null;
  isActive: boolean;
  isDefault: boolean;
  translations: AddCountryTranslationDto[];
}

export type UpdateCountryDto = AddCountryDto;

export const countryFlagEmoji = (isoCode: string) =>
  isoCode
    .toUpperCase()
    .replace(/[A-Z]/g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
