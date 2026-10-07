import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { CardImportsReportDto, CardImportsReportFilter, CardImportsReportRequest } from "../types/CardImportsReport.types";

export const cardImportsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCardImportsReport: builder.query<CardImportsReportDto, CardImportsReportRequest>({
      query: (params) => ({
        url: "Reports/card-imports",
        params,
      }),
    }),
    exportCardImportsReport: builder.mutation<null, CardImportsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/card-imports/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("CardImports", params.format),
      }),
    }),
  }),
});

export const { useGetCardImportsReportQuery, useExportCardImportsReportMutation } = cardImportsReportApi;
