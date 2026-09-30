import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { NotificationDto, NotificationRequest, MarkAsReadDto, UnreadCountResponse } from "../types/Notifications.types";

export const notificationApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<BaseListResponse<NotificationDto>, NotificationRequest>({
      query: (params) => ({
        url: "Notifications",
        params,
      }),
      providesTags: ["Notification"],
    }),
    getNotificationById: builder.query<NotificationDto, string>({
      query: (id) => `Notifications/${id}`,
      providesTags: ["Notification"],
    }),
    markAsRead: builder.mutation<void, MarkAsReadDto>({
      query: (body) => ({
        url: "Notifications/mark-as-read",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => "Notifications/unread-count",
      providesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationByIdQuery,
  useMarkAsReadMutation,
  useGetUnreadCountQuery,
} = notificationApi;
