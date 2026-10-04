import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { CardTypeDto, CardTypeFilter, CardTypeFormData, CardTypeListDto, CardTypeRequest } from "../types/CardTypes.types";

const toFormData = (data: CardTypeFormData) => {
  const formData = new FormData();
  formData.append("cardCategoryId", String(data.cardCategoryId));
  formData.append("kind", String(data.kind));
  if (data.durationMonths !== null) formData.append("durationMonths", String(data.durationMonths));
  data.targetRoleIds.forEach((roleId, index) => formData.append(`targetRoleIds[${index}]`, String(roleId)));
  if (data.agentPrice !== null) formData.append("agentPrice", String(data.agentPrice));
  if (data.clientPrice !== null) formData.append("clientPrice", String(data.clientPrice));
  formData.append("amount", String(data.amount));
  formData.append("sortOrder", String(data.sortOrder));
  formData.append("isActive", String(data.isActive));
  if (data.image) formData.append("image", data.image);
  data.translations.forEach((translation, index) => {
    formData.append(`translations[${index}].languageCode`, translation.languageCode);
    formData.append(`translations[${index}].name`, translation.name);
    if (translation.description) formData.append(`translations[${index}].description`, translation.description);
  });
  return formData;
};

export const cardTypesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardTypes: builder.query<BaseListResponse<CardTypeListDto>, Partial<CardTypeRequest>>({
      query: (params) => ({
        url: "CardTypes",
        params,
      }),
    }),
    getCardType: builder.query<CardTypeDto, number>({
      query: (id) => `CardTypes/${id}`,
    }),
    addCardType: builder.mutation<CardTypeDto, CardTypeFormData>({
      query: (data) => ({
        url: "CardTypes",
        method: "POST",
        body: toFormData(data),
      }),
    }),
    updateCardType: builder.mutation<CardTypeDto, { id: number; data: CardTypeFormData }>({
      query: ({ id, data }) => ({
        url: `CardTypes/${id}`,
        method: "PUT",
        body: toFormData(data),
      }),
    }),
    deleteCardType: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `CardTypes/${id}`,
        method: "DELETE",
      }),
    }),
    reorderCardTypes: builder.mutation<boolean, { ids: number[] }>({
      query: (body) => ({
        url: "CardTypes/reorder",
        method: "PUT",
        body,
      }),
    }),
    restoreCardType: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `CardTypes/${id}/restore`,
        method: "POST",
      }),
    }),
    exportCardTypes: builder.mutation<null, CardTypeFilter>({
      query: (params) => ({
        url: "CardTypes/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CardTypes"),
      }),
    }),
  }),
});

export const {
  useGetCardTypesQuery,
  useLazyGetCardTypesQuery,
  useGetCardTypeQuery,
  useAddCardTypeMutation,
  useUpdateCardTypeMutation,
  useDeleteCardTypeMutation,
  useRestoreCardTypeMutation,
  useReorderCardTypesMutation,
  useExportCardTypesMutation,
} = cardTypesApi;
