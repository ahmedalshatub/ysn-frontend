import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportEPaymentsReport: builder.mutation<null, EPaymentsReportFilter>({
      query: (params) => ({
        url: "Reports/e-payments/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("EPayments"),
      }),
    }),
  }),
});

export const { useGetEPaymentsReportQuery, useExportEPaymentsReportMutation } = ePaymentsReportApi;
