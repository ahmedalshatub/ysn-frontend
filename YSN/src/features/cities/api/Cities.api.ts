import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { AddCityDto, CityDto, CityFilter, CityListDto, CityRequest, UpdateCityDto } from "../types/Cities.types";

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
  useGetCityQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useRestoreCityMutation,
  useExportCitiesMutation,
} = citiesApi;
