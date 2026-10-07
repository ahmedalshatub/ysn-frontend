import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  RegistrationsReportDto,
  RegistrationsReportFilter,
  RegistrationsReportRequest,
} from "../types/RegistrationsReport.types";

export const registrationsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegistrationsReport: builder.query<RegistrationsReportDto, RegistrationsReportRequest>({
      query: (params) => ({
        url: "Reports/registrations",
        params,
      }),
    }),
    exportRegistrationsReport: builder.mutation<null, RegistrationsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/registrations/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("Registrations", params.format),
      }),
    }),
  }),
});

export const { useGetRegistrationsReportQuery, useExportRegistrationsReportMutation } = registrationsReportApi;
