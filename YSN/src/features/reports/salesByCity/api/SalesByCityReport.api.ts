import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type {
  SalesByCityReportDto,
  SalesByCityReportFilter,
  SalesByCityReportRequest,
} from "../types/SalesByCityReport.types";

export const salesByCityReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesByCityReport: builder.query<SalesByCityReportDto, SalesByCityReportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-city",
        params,
      }),
    }),
    exportSalesByCityReport: builder.mutation<null, SalesByCityReportFilter>({
      query: (params) => ({
        url: "Reports/sales-by-city/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("SalesByCity"),
      }),
    }),
  }),
});

export const { useGetSalesByCityReportQuery, useExportSalesByCityReportMutation } = salesByCityReportApi;
