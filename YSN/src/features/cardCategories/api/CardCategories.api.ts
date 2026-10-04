import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  CardCategoryDto,
  CardCategoryFilter,
  CardCategoryFormData,
  CardCategoryListDto,
  CardCategoryRequest,
  CustomerCardCategoryAccessDto,
  CustomerCardCategoryAccessRequest,
} from "../types/CardCategories.types";


const toFormData = (data: CardCategoryFormData) => {
  const formData = new FormData();
  formData.append("cityId", String(data.cityId));
  formData.append("sortOrder", String(data.sortOrder));
  formData.append("isActive", String(data.isActive));
  if (data.image) formData.append("image", data.image);
  data.translations.forEach((translation, index) => {
    formData.append(`translations[${index}].languageCode`, translation.languageCode);
    formData.append(`translations[${index}].name`, translation.name);
  });
  return formData;
};

export const cardCategoriesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardCategories: builder.query<BaseListResponse<CardCategoryListDto>, Partial<CardCategoryRequest>>({
      query: (params) => ({
        url: "CardCategories",
        params,
      }),
    }),
    getCardCategory: builder.query<CardCategoryDto, number>({
      query: (id) => `CardCategories/${id}`,
    }),
    addCardCategory: builder.mutation<CardCategoryDto, CardCategoryFormData>({
      query: (data) => ({
        url: "CardCategories",
        method: "POST",
        body: toFormData(data),
      }),
    }),
    updateCardCategory: builder.mutation<CardCategoryDto, { id: number; data: CardCategoryFormData }>({
      query: ({ id, data }) => ({
        url: `CardCategories/${id}`,
        method: "PUT",
        body: toFormData(data),
      }),
    }),
    deleteCardCategory: builder.mutation<boolean, { id: number; moveCardTypesToCategoryId?: number }>({
      query: ({ id, moveCardTypesToCategoryId }) => ({
        url: `CardCategories/${id}`,
        method: "DELETE",
        params: moveCardTypesToCategoryId ? { moveCardTypesToCategoryId } : undefined,
      }),
    }),
    reorderCardCategories: builder.mutation<boolean, { cityId: number; ids: number[] }>({
      query: (body) => ({
        url: "CardCategories/reorder",
        method: "PUT",
        body,
      }),
    }),
    restoreCardCategory: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `CardCategories/${id}/restore`,
        method: "POST",
      }),
    }),
    exportCardCategories: builder.mutation<null, CardCategoryFilter>({
      query: (params) => ({
        url: "CardCategories/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CardCategories"),
      }),
    }),
    getCustomerCardCategoryAccess: builder.query<
      BaseListResponse<CustomerCardCategoryAccessDto>,
      { id: number; params: Partial<CustomerCardCategoryAccessRequest> }
    >({
      query: ({ id, params }) => ({
        url: `Users/${id}/card-category-access`,
        params,
      }),
    }),
    setCustomerViewAllCategories: builder.mutation<boolean, { id: number; canViewAllCardCategories: boolean }>({
      query: ({ id, canViewAllCardCategories }) => ({
        url: `Users/${id}/view-all-card-categories`,
        method: "PUT",
        body: { canViewAllCardCategories },
      }),
    }),
    setCustomerCategoryAccess: builder.mutation<boolean, { id: number; cardCategoryId: number; access: number }>({
      query: ({ id, cardCategoryId, access }) => ({
        url: `Users/${id}/card-category-access/${cardCategoryId}`,
        method: "PUT",
        body: { access },
      }),
    }),
  }),
});

export const {
  useGetCardCategoriesQuery,
  useGetCardCategoryQuery,
  useAddCardCategoryMutation,
  useUpdateCardCategoryMutation,
  useDeleteCardCategoryMutation,
  useRestoreCardCategoryMutation,
  useReorderCardCategoriesMutation,
  useExportCardCategoriesMutation,
  useGetCustomerCardCategoryAccessQuery,
  useSetCustomerViewAllCategoriesMutation,
  useSetCustomerCategoryAccessMutation,
} = cardCategoriesApi;
