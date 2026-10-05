import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { MessagesReportDto, MessagesReportFilter, MessagesReportRequest } from "../types/MessagesReport.types";

export const messagesReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessagesReport: builder.query<MessagesReportDto, MessagesReportRequest>({
      query: (params) => ({
        url: "Reports/messages",
        params,
      }),
    }),
    exportMessagesReport: builder.mutation<null, MessagesReportFilter>({
      query: (params) => ({
        url: "Reports/messages/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Messages"),
      }),
    }),
  }),
});

export const { useGetMessagesReportQuery, useExportMessagesReportMutation } = messagesReportApi;
