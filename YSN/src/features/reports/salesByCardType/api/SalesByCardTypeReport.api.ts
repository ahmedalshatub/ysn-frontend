import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  SalesByCardTypeReportDto,
  SalesByCardTypeReportFilter,
  SalesByCardTypeReportRequest,
} from "../types/SalesByCardTypeReport.types";

export const salesByCardTypeReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesByCardTypeReport: builder.query<SalesByCardTypeReportDto, SalesByCardTypeReportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-card-type",
        params,
      }),
    }),
    exportSalesByCardTypeReport: builder.mutation<null, SalesByCardTypeReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/sales-by-card-type/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("SalesByCardType", params.format),
      }),
    }),
  }),
});

export const { useGetSalesByCardTypeReportQuery, useExportSalesByCardTypeReportMutation } = salesByCardTypeReportApi;
