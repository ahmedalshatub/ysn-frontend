import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportCardStockReport: builder.mutation<null, CardStockReportFilter>({
      query: (params) => ({
        url: "Reports/card-stock/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CardStock"),
      }),
    }),
  }),
});

export const { useGetCardStockReportQuery, useExportCardStockReportMutation } = cardStockReportApi;
