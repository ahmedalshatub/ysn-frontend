import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
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
    exportSalesByCityReport: builder.mutation<null, SalesByCityReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-city/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("SalesByCity", params.format),
      }),
    }),
  }),
});

export const { useGetSalesByCityReportQuery, useExportSalesByCityReportMutation } = salesByCityReportApi;
