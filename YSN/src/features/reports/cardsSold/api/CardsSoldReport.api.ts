import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { CardsSoldReportDto, CardsSoldReportFilter, CardsSoldReportRequest } from "../types/CardsSoldReport.types";

export const cardsSoldReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardsSoldReport: builder.query<CardsSoldReportDto, CardsSoldReportRequest>({
      query: (params) => ({
        url: "Reports/cards-sold",
        params,
      }),
    }),
    exportCardsSoldReport: builder.mutation<null, CardsSoldReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/cards-sold/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("CardsSold", params.format),
      }),
    }),
  }),
});

export const { useGetCardsSoldReportQuery, useExportCardsSoldReportMutation } = cardsSoldReportApi;
