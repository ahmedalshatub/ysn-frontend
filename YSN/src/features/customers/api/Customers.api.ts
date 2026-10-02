import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddCustomerDto,
  CustomerDto,
  CustomerFilter,
  CustomerListDto,
  CustomerRequest,
  CustomerTypeValue,
  SetCustomerPasswordDto,
  UpdateCustomerDto,
} from "../types/Customers.types";

const toCustomerFormData = (data: AddCustomerDto | UpdateCustomerDto, userType?: CustomerTypeValue) => {
  const formData = new FormData();
  if (userType) formData.append("userType", String(userType));
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") formData.append(key, String(value));
  });
  return formData;
};

export const customersApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<BaseListResponse<CustomerListDto>, Partial<CustomerRequest>>({
      query: (params) => ({
        url: "Users",
        params: { customersOnly: true, ...params },
      }),
    }),
    getCustomer: builder.query<CustomerDto, number>({
      query: (id) => `Users/${id}`,
    }),
    addCustomer: builder.mutation<CustomerDto, { userType: CustomerTypeValue; data: AddCustomerDto }>({
      query: ({ userType, data }) => ({
        url: "Users",
        method: "POST",
        body: toCustomerFormData(data, userType),
      }),
    }),
    updateCustomer: builder.mutation<CustomerDto, { id: number; data: UpdateCustomerDto }>({
      query: ({ id, data }) => ({
        url: `Users/${id}`,
        method: "PUT",
        body: toCustomerFormData(data),
      }),
    }),
    changeCustomerStatus: builder.mutation<boolean, { id: number; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `Users/${id}/status`,
        method: "PUT",
        body: { isActive },
      }),
    }),
    setCustomerPassword: builder.mutation<boolean, { id: number; data: SetCustomerPasswordDto }>({
      query: ({ id, data }) => ({
        url: `Users/${id}/password`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCustomer: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Users/${id}`,
        method: "DELETE",
      }),
    }),
    restoreCustomer: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Users/${id}/restore`,
        method: "POST",
      }),
    }),
    exportCustomers: builder.mutation<null, CustomerFilter>({
      query: (params) => ({
        url: "Users/export",
        method: "GET",
        params: { customersOnly: true, ...params },
        responseHandler: excelResponseHandler("Customers"),
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useChangeCustomerStatusMutation,
  useSetCustomerPasswordMutation,
  useDeleteCustomerMutation,
  useRestoreCustomerMutation,
  useExportCustomersMutation,
} = customersApi;
