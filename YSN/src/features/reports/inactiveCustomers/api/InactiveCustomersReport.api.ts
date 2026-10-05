import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportInactiveCustomersReport: builder.mutation<null, InactiveCustomersReportFilter>({
      query: (params) => ({
        url: "Reports/inactive-customers/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("InactiveCustomers"),
      }),
    }),
  }),
});

export const { useGetInactiveCustomersReportQuery, useExportInactiveCustomersReportMutation } = inactiveCustomersReportApi;
