import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddCityDto,
  CityDto,
  CityFilter,
  CityLinksDto,
  CityListDto,
  CityRequest,
  PermanentDeleteCityDto,
  PermanentDeleteCityResultDto,
  UpdateCityDto,
} from "../types/Cities.types";

export const citiesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<BaseListResponse<CityListDto>, Partial<CityRequest>>({
      query: (params) => ({
        url: "Cities",
        params,
      }),
    }),
    getCity: builder.query<CityDto, number>({
      query: (id) => `Cities/${id}`,
    }),
    addCity: builder.mutation<CityDto, AddCityDto>({
      query: (body) => ({
        url: "Cities",
        method: "POST",
        body,
      }),
    }),
    updateCity: builder.mutation<CityDto, { id: number; data: UpdateCityDto }>({
      query: ({ id, data }) => ({
        url: `Cities/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCity: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Cities/${id}`,
        method: "DELETE",
      }),
    }),
    changeCityEPayment: builder.mutation<CityDto, { id: number; enabled: boolean }>({
      query: ({ id, enabled }) => ({
        url: `Cities/${id}/epayment`,
        method: "PUT",
        body: { enabled },
      }),
    }),
    changeAllCitiesEPayment: builder.mutation<number, { enabled: boolean }>({
      query: (body) => ({
        url: "Cities/epayment",
        method: "PUT",
        body,
      }),
    }),
    getCityLinks: builder.query<CityLinksDto, number>({
      query: (id) => `Cities/${id}/links`,
    }),
    permanentDeleteCity: builder.mutation<PermanentDeleteCityResultDto, PermanentDeleteCityDto & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `Cities/${id}/permanent`,
        method: "DELETE",
        body,
      }),
    }),
    reorderCities: builder.mutation<boolean, { ids: number[] }>({
      query: (body) => ({
        url: "Cities/reorder",
        method: "PUT",
        body,
      }),
    }),
    restoreCity: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Cities/${id}/restore`,
        method: "POST",
      }),
    }),
    exportCities: builder.mutation<null, CityFilter>({
      query: (params) => ({
        url: "Cities/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Cities"),
      }),
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useReorderCitiesMutation,
  useGetCityQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useRestoreCityMutation,
  useExportCitiesMutation,
  useChangeCityEPaymentMutation,
  useChangeAllCitiesEPaymentMutation,
  useGetCityLinksQuery,
  usePermanentDeleteCityMutation,
} = citiesApi;
