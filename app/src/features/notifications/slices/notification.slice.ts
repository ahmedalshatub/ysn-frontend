import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NotificationDto } from "../types/Notifications.types";

interface NotificationState {
  notifications: NotificationDto[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationDto>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    setNotifications: (state, action: PayloadAction<NotificationDto[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    updateNotificationCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addNotification,
  setNotifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
  updateNotificationCount,
  clearNotifications,
  setLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer;
