import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { CardImportsReportDto, CardImportsReportFilter, CardImportsReportRequest } from "../types/CardImportsReport.types";

export const cardImportsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardImportsReport: builder.query<CardImportsReportDto, CardImportsReportRequest>({
      query: (params) => ({
        url: "Reports/card-imports",
        params,
      }),
    }),
    exportCardImportsReport: builder.mutation<null, CardImportsReportFilter>({
      query: (params) => ({
        url: "Reports/card-imports/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("CardImports"),
      }),
    }),
  }),
});

export const { useGetCardImportsReportQuery, useExportCardImportsReportMutation } = cardImportsReportApi;
