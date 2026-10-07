import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../shared/types/ExportFormat.types";
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
    exportTvActivations: builder.mutation<null, TvActivationFilter & ExportRequest>({
      query: (params) => ({
        url: "TvActivations/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TvActivations", params.format),
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
