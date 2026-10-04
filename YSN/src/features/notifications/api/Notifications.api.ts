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
    getNotificationsFeed: builder.query<BaseListResponse<NotificationDto>, NotificationRequest>({
      query: (params) => ({
        url: "Notifications",
        params,
      }),
      serializeQueryArgs: ({ queryArgs }) => ({ isRead: queryArgs.isRead, pageSize: queryArgs.pageSize }),
      merge: (current, incoming, { arg }) => {
        if ((arg.pageNumber ?? 1) === 1) return incoming;
        const byId = new Map(current.items.map((item) => [item.id, item]));
        incoming.items.forEach((item) => byId.set(item.id, item));
        return { ...incoming, items: [...byId.values()] };
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.pageNumber !== previousArg?.pageNumber || currentArg?.isRead !== previousArg?.isRead,
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
  useGetNotificationsFeedQuery,
  useGetNotificationByIdQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationApi;
