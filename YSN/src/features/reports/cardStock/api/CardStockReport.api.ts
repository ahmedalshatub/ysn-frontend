import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  CardStockReportDto,
  CardStockReportFilter,
  CardStockReportRequest,
} from "../types/CardStockReport.types";

export const cardStockReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardStockReport: builder.query<CardStockReportDto, CardStockReportRequest>({
      query: (params) => ({
        url: "Reports/card-stock",
        params,
      }),
    }),
    exportCardStockReport: builder.mutation<null, CardStockReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/card-stock/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("CardStock", params.format),
      }),
    }),
  }),
});

export const { useGetCardStockReportQuery, useExportCardStockReportMutation } = cardStockReportApi;
