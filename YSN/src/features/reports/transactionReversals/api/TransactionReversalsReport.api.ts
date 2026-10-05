import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportTransactionReversalsReport: builder.mutation<null, TransactionReversalsReportFilter>({
      query: (params) => ({
        url: "Reports/transaction-reversals/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TransactionReversals"),
      }),
    }),
  }),
});

export const { useGetTransactionReversalsReportQuery, useExportTransactionReversalsReportMutation } = transactionReversalsReportApi;
