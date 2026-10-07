import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  AccountStatementReportDto,
  AccountStatementReportFilter,
  AccountStatementReportRequest,
} from "../types/AccountStatementReport.types";

export const accountStatementReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountStatementReport: builder.query<AccountStatementReportDto, AccountStatementReportRequest>({
      query: (params) => ({
        url: "Reports/account-statement",
        params,
      }),
    }),
    exportAccountStatementReport: builder.mutation<null, AccountStatementReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/account-statement/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("AccountStatement", params.format),
      }),
    }),
  }),
});

export const { useGetAccountStatementReportQuery, useExportAccountStatementReportMutation } = accountStatementReportApi;
