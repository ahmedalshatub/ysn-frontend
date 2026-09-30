import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BellIcon from "../../../assets/icons/BellIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
}

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  unreadCount?: number;
  title?: string;
  emptyText?: string;
  onMarkAllRead?: () => void;
  onClear?: () => void;
  onViewAll?: () => void;
  onNotificationClick?: (id: string) => void;
}

const typeIconClass: Record<string, string> = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
};

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  unreadCount = 0,
  title = "Notifications",
  emptyText = "No notifications",
  onMarkAllRead,
  onClear,
  onViewAll,
  onNotificationClick,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const updatePos = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 360;
    let left = rect.right - menuWidth + window.scrollX;
    if (left < 8) left = 8;
    setPos({ top: rect.bottom + window.scrollY + 6, left });
  };

  const handleToggle = () => {
    updatePos();
    setOpen((prev) => !prev);
  };

  const menu = open
    ? ReactDOM.createPortal(
        <div
          ref={menuRef}
          style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999, width: 360 }}
          className="rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">
              {title}
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-primary text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {onMarkAllRead && unreadCount > 0 && (
                <button
                  onClick={() => { onMarkAllRead(); }}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <CheckIcon className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              {onClear && notifications.length > 0 && (
                <button
                  onClick={() => { onClear(); }}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
                <BellIcon className="w-8 h-8 mb-2 opacity-40" />
                <span className="text-sm">{emptyText}</span>
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => {
                    onNotificationClick?.(notif.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 ${
                    !notif.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      typeIconClass[notif.type || "info"]
                    }`}
                  >
                    <BellIcon className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-medium truncate ${!notif.read ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}>
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{notif.message}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{notif.time}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {onViewAll && (
            <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5">
              <button
                onClick={() => { onViewAll(); setOpen(false); }}
                className="w-full text-center text-xs text-primary hover:underline font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {menu}
    </>
  );
};

export default NotificationDropdown;
