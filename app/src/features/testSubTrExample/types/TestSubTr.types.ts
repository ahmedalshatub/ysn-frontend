import type { BaseDto, BaseRequest } from '../../../shared/types/base';

export interface TestSubTrFilter {
  testTrId?: number;
  clientId?: number;
  minAmount?: number;
  maxAmount?: number;
  name?: string;
  isDeleted?: boolean;
  createdBy?: number;
}

export interface TestSubTrRequest extends BaseRequest, TestSubTrFilter {}

export interface TestSubTrListDto extends BaseDto {
  testTrId: number;
  clientId: number;
  clientName: string;
  imageUrl?: string;
  amount: number;
  name: string;
  description: string;
}

export interface TestSubTranslationDto {
  languageCode: string;
  name: string;
  description: string;
  testSubTrId: number;
}

export interface TestSubTrDto extends BaseDto {
  testTrId: number;
  clientId: number;
  clientName: string;
  imageId?: string;
  imageUrl?: string;
  amount: number;
  translations: TestSubTranslationDto[];
}

export interface AddTestSubTranslationDto {
  languageCode: string;
  name: string;
  description: string;
}

export interface AddTestSubTrDto {
  testTrId: number;
  clientId: number;
  image?: File;
  amount: number;
  translations: AddTestSubTranslationDto[];
}

export interface UpdateTestSubTrDto {
  testTrId: number;
  clientId: number;
  image?: File;
  amount: number;
  translations: AddTestSubTranslationDto[];
}
