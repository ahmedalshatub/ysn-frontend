import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type {
  MarkAsReadDto,
  NotificationDto,
  NotificationRequest,
  NotificationSettingDto,
  UpdateNotificationSettingsDto,
} from "../types/Notifications.types";

export const notificationApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<BaseListResponse<NotificationDto>, NotificationRequest>({
      query: (params) => ({
        url: "Notifications",
        params,
      }),
      providesTags: ["Notification"],
    }),
    getNotificationById: builder.query<NotificationDto, number>({
      query: (id) => `Notifications/${id}`,
      providesTags: ["Notification"],
    }),
    getUnreadCount: builder.query<number, void>({
      query: () => "Notifications/unread-count",
      providesTags: ["Notification"],
    }),
    markAsRead: builder.mutation<boolean, MarkAsReadDto>({
      query: (body) => ({
        url: "Notifications/mark-as-read",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation<number, void>({
      query: () => ({
        url: "Notifications/mark-all-as-read",
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotificationSettings: builder.query<NotificationSettingDto[], void>({
      query: () => "Notifications/settings",
    }),
    updateNotificationSettings: builder.mutation<boolean, UpdateNotificationSettingsDto>({
      query: (body) => ({
        url: "Notifications/settings",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationByIdQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationApi;
