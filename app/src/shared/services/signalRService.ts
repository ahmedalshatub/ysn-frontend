import * as signalR from "@microsoft/signalr";
import { store, type RootState } from "../../app/store";
import { addNotification, updateNotificationCount } from "../../features/notifications/slices/notification.slice";
import type { NotificationDto } from "../../features/notifications/types/Notifications.types";

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnecting = false;

  private async requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  private showBrowserNotification(notification: NotificationDto) {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: `notification-${notification.id}`,
          requireInteraction: false,
        });
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(notification.title, {
              body: notification.message,
              icon: "/favicon.ico",
            });
          }
        });
      }
    }
  }

  async initialize() {
    const isEnabled = import.meta.env.VITE_ENABLE_SIGNALR === 'true';
    
    if (!isEnabled) {
      return;
    }
    
    if (this.connection) {
      return;
    }
    
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    await this.requestNotificationPermission();

    try {
      const state = store.getState() as RootState;
      const token = state.auth.jwtToken;

      if (!token) {
        console.warn("[SignalR] No token available");
        this.isConnecting = false;
        return;
      }

      const hubUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/notificationHub`
        : `${import.meta.env.VITE_API_ENDPOINTS_URL}/notificationHub`;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => {
            const currentToken = (store.getState() as RootState).auth.jwtToken;
            return currentToken || "";
          },
          skipNegotiation: false,
          transport: signalR.HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.elapsedMilliseconds < 60000) {
              return Math.random() * 10000;
            } else {
              return null;
            }
          },
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.registerHandlers();
      await this.connection.start();
      this.isConnecting = false;
    } catch (error) {
      console.error("[SignalR] Connection failed:", error);
      this.isConnecting = false;
      this.connection = null;
    }
  }

  private registerHandlers() {
    if (!this.connection) return;

    this.connection.on("ReceiveNotification", (notification: NotificationDto) => {
      store.dispatch(addNotification(notification));
      this.showBrowserNotification(notification);
    });

    this.connection.on("UpdateNotificationCount", (count: number) => {
      store.dispatch(updateNotificationCount(count));
    });

    this.connection.onreconnecting((error) => {
      console.warn("[SignalR] Connection lost, reconnecting...", error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log("[SignalR] Reconnected successfully, connection ID:", connectionId);
    });

    this.connection.onclose((error) => {
      console.error("[SignalR] Connection closed:", error);
      this.connection = null;
    });
  }

  async disconnect() {
    if (this.connection) {
      const currentState = this.connection.state;
      
      if (currentState === signalR.HubConnectionState.Connected || 
          currentState === signalR.HubConnectionState.Connecting) {
        try {
          await this.connection.stop();
        } catch (error) {
          console.warn("[SignalR] Error during disconnect:", error);
        } finally {
          this.connection = null;
          this.isConnecting = false;
        }
      } else {
        this.connection = null;
        this.isConnecting = false;
      }
    }
  }

  async sendMessage(methodName: string, ...args: any[]) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke(methodName, ...args);
      } catch {
      }
    }
  }

  getConnectionState(): signalR.HubConnectionState | null {
    return this.connection?.state ?? null;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export const signalRService = new SignalRService();
