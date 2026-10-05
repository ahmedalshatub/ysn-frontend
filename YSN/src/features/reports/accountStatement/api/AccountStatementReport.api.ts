import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportAccountStatementReport: builder.mutation<null, AccountStatementReportFilter>({
      query: (params) => ({
        url: "Reports/account-statement/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("AccountStatement"),
      }),
    }),
  }),
});

export const { useGetAccountStatementReportQuery, useExportAccountStatementReportMutation } = accountStatementReportApi;
