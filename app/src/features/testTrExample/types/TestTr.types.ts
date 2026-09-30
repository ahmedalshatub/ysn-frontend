import type { BaseDto, BaseRequest } from '../../../shared/types/base';

export interface TestTrFilter {
  range?: number;
  size?: number;
  isDeleted?: boolean;
  createdBy?: number;
  name?: string;
}

export interface TestTrRequest extends BaseRequest, TestTrFilter {}

export interface TestTrListDto extends BaseDto {
  range: number;
  size: number;
  name: string;
  description: string;
}

export interface TestTranslationDto {
  languageCode: string;
  name: string;
  description: string;
  testTrId: number;
}

export interface TestTrDto extends BaseDto {
  range: number;
  size: number;
  translations: TestTranslationDto[];
}

export interface AddTestTranslationDto {
  languageCode: string;
  name: string;
  description: string;
}

export interface AddTestTrDto {
  range: number;
  size: number;
  translations: AddTestTranslationDto[];
}

export interface UpdateTestTrDto {
  range: number;
  size: number;
  translations: AddTestTranslationDto[];
}
