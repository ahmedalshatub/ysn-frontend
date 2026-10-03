import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddCardsDto,
  AddCardsResultDto,
  CardDto,
  CardFilter,
  CardListDto,
  CardRequest,
  CardStatsDto,
  CardsBulkActionDto,
  CardsBulkActionResultDto,
  UpdateCardDto,
} from "../types/Cards.types";

export const cardsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<BaseListResponse<CardListDto>, Partial<CardRequest>>({
      query: (params) => ({ url: "Cards", params }),
    }),
    getCardsCount: builder.query<number, CardFilter>({
      query: (params) => ({ url: "Cards/count", params }),
    }),
    getCardStats: builder.query<CardStatsDto, CardFilter>({
      query: (params) => ({ url: "Cards/stats", params }),
    }),
    getCard: builder.query<CardDto, number>({
      query: (id) => `Cards/${id}`,
    }),
    addCards: builder.mutation<AddCardsResultDto, AddCardsDto>({
      query: (body) => ({ url: "Cards", method: "POST", body }),
    }),
    updateCard: builder.mutation<CardDto, { id: number; data: UpdateCardDto }>({
      query: ({ id, data }) => ({ url: `Cards/${id}`, method: "PUT", body: data }),
    }),
    bulkCardAction: builder.mutation<CardsBulkActionResultDto, CardsBulkActionDto>({
      query: (body) => ({ url: "Cards/bulk-action", method: "POST", body }),
    }),
    deleteCard: builder.mutation<boolean, number>({
      query: (id) => ({ url: `Cards/${id}`, method: "DELETE" }),
    }),
    restoreCard: builder.mutation<boolean, number>({
      query: (id) => ({ url: `Cards/${id}/restore`, method: "POST" }),
    }),
    exportCards: builder.mutation<null, CardFilter>({
      query: (params) => ({ url: "Cards/export", method: "GET", params, responseHandler: excelResponseHandler("Cards") }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useLazyGetCardsCountQuery,
  useGetCardStatsQuery,
  useGetCardQuery,
  useAddCardsMutation,
  useUpdateCardMutation,
  useBulkCardActionMutation,
  useDeleteCardMutation,
  useRestoreCardMutation,
  useExportCardsMutation,
} = cardsApi;
