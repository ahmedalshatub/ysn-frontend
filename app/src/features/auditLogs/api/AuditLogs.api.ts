import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { AuditLog, AuditLogRequest } from "../types/AuditLogs.types";

export const auditLogApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAuditLogs: builder.query<BaseListResponse<AuditLog>, AuditLogRequest>({
      query: (params) => ({
        url: "AuditLogs",
        params,
      }),
    }),
    getAuditLogById: builder.query<AuditLog, string>({
      query: (id) => `AuditLogs/${id}`,
    }),
    getAuditLogsCount: builder.query<number, void>({
      query: () => "AuditLogs/count",
    }),
  }),
});

export const {
  useGetAllAuditLogsQuery,
  useGetAuditLogByIdQuery,
  useGetAuditLogsCountQuery,
} = auditLogApi;
