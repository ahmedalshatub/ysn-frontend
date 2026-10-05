import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type {
  CustomerBalancesReportDto,
  CustomerBalancesReportFilter,
  CustomerBalancesReportRequest,
} from "../types/CustomerBalancesReport.types";

export const customerBalancesReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerBalancesReport: builder.query<CustomerBalancesReportDto, CustomerBalancesReportRequest>({
      query: (params) => ({
        url: "Reports/customer-balances",
        params,
      }),
    }),
    exportCustomerBalancesReport: builder.mutation<null, CustomerBalancesReportFilter>({
      query: (params) => ({
        url: "Reports/customer-balances/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CustomerBalances"),
      }),
    }),
  }),
});

export const { useGetCustomerBalancesReportQuery, useExportCustomerBalancesReportMutation } = customerBalancesReportApi;
