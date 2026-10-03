import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddTransactionDto,
  TransactionDto,
  TransactionFilter,
  TransactionListDto,
  TransactionRequest,
  TransactionStatsDto,
  DailyTransactionTotalDto,
} from "../types/Transactions.types";

export const transactionsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<BaseListResponse<TransactionListDto>, Partial<TransactionRequest>>({
      query: (params) => ({
        url: "Transactions",
        params,
      }),
    }),
    getTransactionStats: builder.query<TransactionStatsDto, TransactionFilter>({
      query: (params) => ({
        url: "Transactions/stats",
        params,
      }),
    }),
    getTransaction: builder.query<TransactionDto, number>({
      query: (id) => `Transactions/${id}`,
    }),
    addTransaction: builder.mutation<TransactionDto, AddTransactionDto>({
      query: (body) => ({
        url: "Transactions",
        method: "POST",
        body,
      }),
    }),
    deleteTransaction: builder.mutation<TransactionDto, { id: number; reason?: string }>({
      query: ({ id, reason }) => ({
        url: `Transactions/${id}`,
        method: "DELETE",
        body: { reason: reason || null },
      }),
    }),
    restoreTransaction: builder.mutation<TransactionDto, number>({
      query: (id) => ({
        url: `Transactions/${id}/restore`,
        method: "POST",
      }),
    }),
    exportTransactions: builder.mutation<null, TransactionFilter>({
      query: (params) => ({
        url: "Transactions/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Transactions"),
      }),
    }),
    getTransactionDailyTotals: builder.query<DailyTransactionTotalDto[], TransactionFilter>({
      query: (params) => ({ url: "Transactions/stats/daily", params }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionStatsQuery,
  useGetTransactionQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useRestoreTransactionMutation,
  useExportTransactionsMutation,
  useGetTransactionDailyTotalsQuery,
} = transactionsApi;
