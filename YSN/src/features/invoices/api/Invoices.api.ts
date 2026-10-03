import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { InvoiceDto, InvoiceFilter, InvoiceListDto, InvoiceRequest, InvoiceStatsDto } from "../types/Invoices.types";

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
    exportInvoices: builder.mutation<null, InvoiceFilter>({
      query: (params) => ({ url: "Invoices/export", method: "GET", params, responseHandler: excelResponseHandler("Invoices") }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceStatsQuery,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
  useExportInvoicesMutation,
} = invoicesApi;
