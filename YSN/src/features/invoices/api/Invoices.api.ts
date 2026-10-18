import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import { ExportFormat, type ExportRequest } from "../../../shared/types/ExportFormat.types";
import type { InvoiceDto, InvoiceFilter, InvoiceListDto, InvoiceRequest, InvoiceStatsDto, DailyInvoiceTotalDto, TopCardTypeDto } from "../types/Invoices.types";

export const invoicesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<BaseListResponse<InvoiceListDto>, Partial<InvoiceRequest>>({
      query: (params) => ({ url: "Invoices", params }),
    }),
    getInvoiceStats: builder.query<InvoiceStatsDto, InvoiceFilter>({
      query: (params) => ({ url: "Invoices/stats", params }),
    }),
    getInvoice: builder.query<InvoiceDto, number>({
      query: (id) => `Invoices/${id}`,
    }),
    deleteInvoice: builder.mutation<boolean, { id: number; reason: string }>({
      query: ({ id, reason }) => ({ url: `Invoices/${id}`, method: "DELETE", body: { reason } }),
    }),
    printInvoice: builder.mutation<null, number>({
      query: (id) => ({ url: `Invoices/${id}/print`, method: "GET", responseHandler: exportResponseHandler("Invoice", ExportFormat.Print) }),
    }),
    exportInvoices: builder.mutation<null, InvoiceFilter & ExportRequest>({
      query: (params) => ({ url: "Invoices/export", method: "GET", params, responseHandler: exportResponseHandler("Invoices", params.format) }),
    }),
    getInvoiceDailyTotals: builder.query<DailyInvoiceTotalDto[], InvoiceFilter>({
      query: (params) => ({ url: "Invoices/stats/daily", params }),
    }),
    getTopCardTypes: builder.query<TopCardTypeDto[], InvoiceFilter>({
      query: (params) => ({ url: "Invoices/stats/top-card-types", params }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceStatsQuery,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
  useExportInvoicesMutation,
  usePrintInvoiceMutation,
  useGetInvoiceDailyTotalsQuery,
  useGetTopCardTypesQuery,
} = invoicesApi;
