import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { CardsSoldReportDto, CardsSoldReportFilter, CardsSoldReportRequest } from "../types/CardsSoldReport.types";

export const cardsSoldReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardsSoldReport: builder.query<CardsSoldReportDto, CardsSoldReportRequest>({
      query: (params) => ({
        url: "Reports/cards-sold",
        params,
      }),
    }),
    exportCardsSoldReport: builder.mutation<null, CardsSoldReportFilter>({
      query: (params) => ({
        url: "Reports/cards-sold/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CardsSold"),
      }),
    }),
  }),
});

export const { useGetCardsSoldReportQuery, useExportCardsSoldReportMutation } = cardsSoldReportApi;
