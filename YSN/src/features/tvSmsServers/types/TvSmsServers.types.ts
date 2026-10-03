import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export interface TvSmsServerFilter {
  name?: string;
  baseUrl?: string;
  smsUserId?: string;
  cityId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface TvSmsServerRequest extends BaseRequest, TvSmsServerFilter {}

export interface TvSmsServerListDto extends BaseDto {
  name: string;
  baseUrl: string;
  smsUserId: string;
  isActive: boolean;
  citiesCount: number;
}

export interface TvSmsServerCityDto {
  id: number;
  name: string | null;
}

export interface TvSmsServerDto extends TvSmsServerListDto {
  defaultLanguage: number;
  defaultDepartmentId: number;
  defaultRegionId: number;
  defaultCustomerTypeId: number;
  hasPassword: boolean;
  hasAuthKey: boolean;
  hasPublicKey: boolean;
  cities: TvSmsServerCityDto[];
}

export interface AddTvSmsServerDto {
  name: string;
  baseUrl: string;
  smsUserId: string;
  password?: string;
  authKey?: string;
  publicKey?: string;
  defaultLanguage: number;
  defaultDepartmentId: number;
  defaultRegionId: number;
  defaultCustomerTypeId: number;
  isActive: boolean;
}

export type UpdateTvSmsServerDto = AddTvSmsServerDto;
