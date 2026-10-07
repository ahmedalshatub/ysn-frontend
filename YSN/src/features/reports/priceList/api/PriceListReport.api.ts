import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { PriceListReportDto, PriceListReportFilter, PriceListReportRequest } from "../types/PriceListReport.types";

export const priceListReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getPriceListReport: builder.query<PriceListReportDto, PriceListReportRequest>({
      query: (params) => ({
        url: "Reports/price-list",
        params,
      }),
    }),
    exportPriceListReport: builder.mutation<null, PriceListReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/price-list/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("PriceList", params.format),
      }),
    }),
  }),
});

export const { useGetPriceListReportQuery, useExportPriceListReportMutation } = priceListReportApi;
