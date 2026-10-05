import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportSalesByCustomerReport: builder.mutation<null, SalesByCustomerReportFilter>({
      query: (params) => ({
        url: "Reports/sales-by-customer/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("SalesByCustomer"),
      }),
    }),
  }),
});

export const { useGetSalesByCustomerReportQuery, useExportSalesByCustomerReportMutation } = salesByCustomerReportApi;
