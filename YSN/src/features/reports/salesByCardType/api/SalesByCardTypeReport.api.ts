import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportSalesByCardTypeReport: builder.mutation<null, SalesByCardTypeReportFilter>({
      query: (params) => ({
        url: "Reports/sales-by-card-type/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("SalesByCardType"),
      }),
    }),
  }),
});

export const { useGetSalesByCardTypeReportQuery, useExportSalesByCardTypeReportMutation } = salesByCardTypeReportApi;
