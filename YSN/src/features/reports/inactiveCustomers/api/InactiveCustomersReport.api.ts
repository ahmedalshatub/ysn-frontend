import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  InactiveCustomersReportDto,
  InactiveCustomersReportFilter,
  InactiveCustomersReportRequest,
} from "../types/InactiveCustomersReport.types";

export const inactiveCustomersReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInactiveCustomersReport: builder.query<InactiveCustomersReportDto, InactiveCustomersReportRequest>({
      query: (params) => ({
        url: "Reports/inactive-customers",
        params,
      }),
    }),
    exportInactiveCustomersReport: builder.mutation<null, InactiveCustomersReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/inactive-customers/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("InactiveCustomers", params.format),
      }),
    }),
  }),
});

export const { useGetInactiveCustomersReportQuery, useExportInactiveCustomersReportMutation } = inactiveCustomersReportApi;
