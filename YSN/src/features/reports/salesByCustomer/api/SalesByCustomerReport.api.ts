import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  SalesByCustomerReportDto,
  SalesByCustomerReportFilter,
  SalesByCustomerReportRequest,
} from "../types/SalesByCustomerReport.types";

export const salesByCustomerReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesByCustomerReport: builder.query<SalesByCustomerReportDto, SalesByCustomerReportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-customer",
        params,
      }),
    }),
    exportSalesByCustomerReport: builder.mutation<null, SalesByCustomerReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-customer/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("SalesByCustomer", params.format),
      }),
    }),
  }),
});

export const { useGetSalesByCustomerReportQuery, useExportSalesByCustomerReportMutation } = salesByCustomerReportApi;
