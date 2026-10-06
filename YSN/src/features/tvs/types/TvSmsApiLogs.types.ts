import type { BaseRequest } from "../../../shared/types/base";

export const TvSmsApiCall = {
  GetToken: 1,
  GetInternalNumber: 2,
  Recharge: 3,
  ShowOrderProducts: 4,
} as const;

export type TvSmsApiCallValue = typeof TvSmsApiCall[keyof typeof TvSmsApiCall];

export const tvSmsApiCallList: TvSmsApiCallValue[] = [
  TvSmsApiCall.GetToken,
  TvSmsApiCall.GetInternalNumber,
  TvSmsApiCall.Recharge,
  TvSmsApiCall.ShowOrderProducts,
];

export const tvSmsApiCallKeys: Record<TvSmsApiCallValue, string> = {
  [TvSmsApiCall.GetToken]: "tvSmsApiCalls.getToken",
  [TvSmsApiCall.GetInternalNumber]: "tvSmsApiCalls.getInternalNumber",
  [TvSmsApiCall.Recharge]: "tvSmsApiCalls.recharge",
  [TvSmsApiCall.ShowOrderProducts]: "tvSmsApiCalls.showOrderProducts",
};

export interface TvSmsApiLogFilter {
  cityId?: number;
  baseUrl?: string;
  call?: number;
  succeeded?: boolean;
  tvId?: number;
  tvActivationId?: number;
  providerStatusCode?: number;
  httpStatus?: number;
  durationMsFrom?: number;
  durationMsTo?: number;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface TvSmsApiLogRequest extends BaseRequest, TvSmsApiLogFilter {}

export interface TvSmsApiLogDto {
  id: number;
  cityId: number;
  cityName: string | null;
  baseUrl: string;
  call: TvSmsApiCallValue;
  tvId: number | null;
  tvNumber: string | null;
  tvActivationId: number | null;
  httpStatus: number | null;
  providerStatusCode: number | null;
  providerMessage: string | null;
  durationMs: number;
  succeeded: boolean;
  createdAt: string;
  createdBy: number | null;
  creator: string;
}
