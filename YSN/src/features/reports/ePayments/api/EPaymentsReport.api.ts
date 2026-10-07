import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  EPaymentsReportDto,
  EPaymentsReportFilter,
  EPaymentsReportRequest,
} from "../types/EPaymentsReport.types";

export const ePaymentsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getEPaymentsReport: builder.query<EPaymentsReportDto, EPaymentsReportRequest>({
      query: (params) => ({
        url: "Reports/e-payments",
        params,
      }),
    }),
    exportEPaymentsReport: builder.mutation<null, EPaymentsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/e-payments/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("EPayments", params.format),
      }),
    }),
  }),
});

export const { useGetEPaymentsReportQuery, useExportEPaymentsReportMutation } = ePaymentsReportApi;
