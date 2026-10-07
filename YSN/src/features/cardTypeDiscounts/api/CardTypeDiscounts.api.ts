import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../shared/types/ExportFormat.types";
import type {
  AddCardTypeDiscountsDto,
  CardTypeDiscountFilter,
  CardTypeDiscountListDto,
  CardTypeDiscountRequest,
  CardTypeDiscountsResultDto,
  DeleteCardTypeDiscountsDto,
} from "../types/CardTypeDiscounts.types";

export const cardTypeDiscountsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardTypeDiscounts: builder.query<BaseListResponse<CardTypeDiscountListDto>, Partial<CardTypeDiscountRequest>>({
      query: (params) => ({ url: "CardTypeDiscounts", params }),
    }),
    saveCardTypeDiscounts: builder.mutation<CardTypeDiscountsResultDto, AddCardTypeDiscountsDto>({
      query: (body) => ({ url: "CardTypeDiscounts", method: "POST", body }),
    }),
    deleteCardTypeDiscount: builder.mutation<boolean, number>({
      query: (id) => ({ url: `CardTypeDiscounts/${id}`, method: "DELETE" }),
    }),
    deleteCardTypeDiscounts: builder.mutation<number, DeleteCardTypeDiscountsDto>({
      query: (body) => ({ url: "CardTypeDiscounts/bulk-delete", method: "POST", body }),
    }),
    exportCardTypeDiscounts: builder.mutation<null, CardTypeDiscountFilter & ExportRequest>({
      query: (params) => ({ url: "CardTypeDiscounts/export", method: "GET", params, responseHandler: exportResponseHandler("CardTypeDiscounts", params.format) }),
    }),
  }),
});

export const {
  useGetCardTypeDiscountsQuery,
  useSaveCardTypeDiscountsMutation,
  useDeleteCardTypeDiscountMutation,
  useDeleteCardTypeDiscountsMutation,
  useExportCardTypeDiscountsMutation,
} = cardTypeDiscountsApi;
