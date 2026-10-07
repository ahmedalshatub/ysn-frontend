import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../shared/types/ExportFormat.types";
import type {
  MessageDto,
  MessageFilter,
  MessageListDto,
  MessageRequest,
  SendMessageDto,
  SendMessageResultDto,
} from "../types/Messages.types";

export const messagesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<BaseListResponse<MessageListDto>, Partial<MessageRequest>>({
      query: (params) => ({
        url: "Messages",
        params,
      }),
    }),
    getMessage: builder.query<MessageDto, number>({
      query: (id) => `Messages/${id}`,
    }),
    sendMessage: builder.mutation<SendMessageResultDto, SendMessageDto>({
      query: (data) => ({
        url: "Messages",
        method: "POST",
        body: data,
      }),
    }),
    deleteMessage: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Messages/${id}`,
        method: "DELETE",
      }),
    }),
    restoreMessage: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Messages/${id}/restore`,
        method: "POST",
      }),
    }),
    exportMessages: builder.mutation<null, MessageFilter & ExportRequest>({
      query: (params) => ({
        url: "Messages/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("Messages", params.format),
      }),
    }),
    getMessagesCount: builder.query<number, Partial<MessageRequest>>({
      query: (params) => ({ url: "Messages/count", params }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useRestoreMessageMutation,
  useExportMessagesMutation,
  useGetMessagesCountQuery,
} = messagesApi;
