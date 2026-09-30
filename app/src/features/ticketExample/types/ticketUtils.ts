import type { TicketStatus, TicketPriority } from "./ticketData";

type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";

export const statusVariantMap: Record<TicketStatus, Variant> = {
  pending: "warning",
  "in-progress": "info",
  approved: "success",
  rejected: "danger",
  resolved: "primary",
  closed: "secondary",
};

export const priorityVariantMap: Record<TicketPriority, Variant> = {
  high: "danger",
  medium: "warning",
  low: "info",
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
