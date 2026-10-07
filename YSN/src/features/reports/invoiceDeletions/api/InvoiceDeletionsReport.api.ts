import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
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
    exportInvoiceDeletionsReport: builder.mutation<null, InvoiceDeletionsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/invoice-deletions/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("InvoiceDeletions", params.format),
      }),
    }),
  }),
});

export const { useGetInvoiceDeletionsReportQuery, useExportInvoiceDeletionsReportMutation } = invoiceDeletionsReportApi;
