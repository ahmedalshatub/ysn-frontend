import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  ActivateTvDto,
  ResolveTvActivationDto,
  TvActivationDto,
  TvActivationFilter,
  TvActivationListDto,
  TvActivationRequest,
  UsableTvCardDto,
  UsableTvCardFilter,
} from "../types/TvActivations.types";

export const tvActivationsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvActivations: builder.query<BaseListResponse<TvActivationListDto>, Partial<TvActivationRequest>>({
      query: (params) => ({
        url: "TvActivations",
        params,
      }),
    }),
    getTvActivation: builder.query<TvActivationDto, number>({
      query: (id) => `TvActivations/${id}`,
    }),
    getTvActivationsCount: builder.query<number, TvActivationFilter>({
      query: (params) => ({ url: "TvActivations/count", params }),
    }),
    getUsableTvCards: builder.query<UsableTvCardDto[], UsableTvCardFilter>({
      query: (params) => ({ url: "TvActivations/usable-cards", params }),
    }),
    activateTv: builder.mutation<TvActivationDto, ActivateTvDto>({
      query: (body) => ({
        url: "TvActivations",
        method: "POST",
        body,
      }),
    }),
    resolveTvActivation: builder.mutation<TvActivationDto, { id: number; data: ResolveTvActivationDto }>({
      query: ({ id, data }) => ({
        url: `TvActivations/${id}/resolve`,
        method: "PUT",
        body: data,
      }),
    }),
    exportTvActivations: builder.mutation<null, TvActivationFilter>({
      query: (params) => ({
        url: "TvActivations/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvActivations"),
      }),
    }),
  }),
});

export const {
  useGetTvActivationsQuery,
  useGetTvActivationQuery,
  useGetTvActivationsCountQuery,
  useGetUsableTvCardsQuery,
  useActivateTvMutation,
  useResolveTvActivationMutation,
  useExportTvActivationsMutation,
} = tvActivationsApi;
