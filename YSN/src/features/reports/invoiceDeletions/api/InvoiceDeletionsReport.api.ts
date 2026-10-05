import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type {
  InvoiceDeletionsReportDto,
  InvoiceDeletionsReportFilter,
  InvoiceDeletionsReportRequest,
} from "../types/InvoiceDeletionsReport.types";

export const invoiceDeletionsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceDeletionsReport: builder.query<InvoiceDeletionsReportDto, InvoiceDeletionsReportRequest>({
      query: (params) => ({
        url: "Reports/invoice-deletions",
        params,
      }),
    }),
    exportInvoiceDeletionsReport: builder.mutation<null, InvoiceDeletionsReportFilter>({
      query: (params) => ({
        url: "Reports/invoice-deletions/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("InvoiceDeletions"),
      }),
    }),
  }),
});

export const { useGetInvoiceDeletionsReportQuery, useExportInvoiceDeletionsReportMutation } = invoiceDeletionsReportApi;
