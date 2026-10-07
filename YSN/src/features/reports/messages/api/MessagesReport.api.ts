import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { MessagesReportDto, MessagesReportFilter, MessagesReportRequest } from "../types/MessagesReport.types";

export const messagesReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessagesReport: builder.query<MessagesReportDto, MessagesReportRequest>({
      query: (params) => ({
        url: "Reports/messages",
        params,
      }),
    }),
    exportMessagesReport: builder.mutation<null, MessagesReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/messages/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("Messages", params.format),
      }),
    }),
  }),
});

export const { useGetMessagesReportQuery, useExportMessagesReportMutation } = messagesReportApi;
