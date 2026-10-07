import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  TransactionReversalsReportDto,
  TransactionReversalsReportFilter,
  TransactionReversalsReportRequest,
} from "../types/TransactionReversalsReport.types";

export const transactionReversalsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionReversalsReport: builder.query<TransactionReversalsReportDto, TransactionReversalsReportRequest>({
      query: (params) => ({
        url: "Reports/transaction-reversals",
        params,
      }),
    }),
    exportTransactionReversalsReport: builder.mutation<null, TransactionReversalsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/transaction-reversals/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TransactionReversals", params.format),
      }),
    }),
  }),
});

export const { useGetTransactionReversalsReportQuery, useExportTransactionReversalsReportMutation } = transactionReversalsReportApi;
