import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddCountryDto,
  CountryDto,
  CountryFilter,
  CountryListDto,
  CountryRequest,
  UpdateCountryDto,
} from "../types/Countries.types";

export const countriesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<BaseListResponse<CountryListDto>, Partial<CountryRequest>>({
      query: (params) => ({
        url: "Countries",
        params,
      }),
    }),
    getCountry: builder.query<CountryDto, number>({
      query: (id) => `Countries/${id}`,
    }),
    addCountry: builder.mutation<CountryDto, AddCountryDto>({
      query: (body) => ({
        url: "Countries",
        method: "POST",
        body,
      }),
    }),
    updateCountry: builder.mutation<CountryDto, { id: number; data: UpdateCountryDto }>({
      query: ({ id, data }) => ({
        url: `Countries/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    setDefaultCountry: builder.mutation<CountryDto, number>({
      query: (id) => ({
        url: `Countries/${id}/default`,
        method: "PUT",
      }),
    }),
    changeCountryStatus: builder.mutation<CountryDto, { id: number; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `Countries/${id}/status`,
        method: "PUT",
        body: { isActive },
      }),
    }),
    deleteCountry: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Countries/${id}`,
        method: "DELETE",
      }),
    }),
    restoreCountry: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Countries/${id}/restore`,
        method: "POST",
      }),
    }),
    exportCountries: builder.mutation<null, CountryFilter>({
      query: (params) => ({
        url: "Countries/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Countries"),
      }),
    }),
  }),
});

export const {
  useSetDefaultCountryMutation,
  useChangeCountryStatusMutation,
  useGetCountriesQuery,
  useGetCountryQuery,
  useAddCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useRestoreCountryMutation,
  useExportCountriesMutation,
} = countriesApi;
