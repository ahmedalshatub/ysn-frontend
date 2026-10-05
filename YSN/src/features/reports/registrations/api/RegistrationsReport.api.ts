import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportRegistrationsReport: builder.mutation<null, RegistrationsReportFilter>({
      query: (params) => ({
        url: "Reports/registrations/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Registrations"),
      }),
    }),
  }),
});

export const { useGetRegistrationsReportQuery, useExportRegistrationsReportMutation } = registrationsReportApi;
