import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
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
    exportCustomerBalancesReport: builder.mutation<null, CustomerBalancesReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/customer-balances/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("CustomerBalances", params.format),
      }),
    }),
  }),
});

export const { useGetCustomerBalancesReportQuery, useExportCustomerBalancesReportMutation } = customerBalancesReportApi;
