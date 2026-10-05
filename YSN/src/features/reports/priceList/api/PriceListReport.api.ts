import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { PriceListReportDto, PriceListReportFilter, PriceListReportRequest } from "../types/PriceListReport.types";

export const priceListReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceListReport: builder.query<PriceListReportDto, PriceListReportRequest>({
      query: (params) => ({
        url: "Reports/price-list",
        params,
      }),
    }),
    exportPriceListReport: builder.mutation<null, PriceListReportFilter>({
      query: (params) => ({
        url: "Reports/price-list/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("PriceList"),
      }),
    }),
  }),
});

export const { useGetPriceListReportQuery, useExportPriceListReportMutation } = priceListReportApi;
