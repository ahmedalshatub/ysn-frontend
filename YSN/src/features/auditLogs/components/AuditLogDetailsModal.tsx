import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import Badge from "../../../shared/components/badges/Badge";
import type { AuditLog } from "../types/AuditLogs.types";

interface AuditLogDetailsModalProps {
  log: AuditLog | null;
  onClose: () => void;
}

const parse = (raw?: string): Record<string, unknown> | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

const asText = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const AuditLogDetailsModal = ({ log, onClose }: AuditLogDetailsModalProps) => {
  const { t } = useTranslation();

  if (!log) return null;

  const before = parse(log.oldValues);
  const after = parse(log.newValues);
  const fields = [...new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})])];

  const meta = [
    { label: t("auditLogsPage.action"), value: log.action },
    { label: t("auditLogsPage.tableName"), value: log.tableName },
    { label: t("auditLogsPage.recordId"), value: log.recordId ?? "-" },
    { label: t("common.createdBy"), value: log.userName || "-" },
    {
      label: t("common.createdAt"),
      value: log.createdAt ? new Date(log.createdAt).toLocaleString("en-GB") : "-",
    },
    { label: t("auditLogsPage.ipAddress"), value: log.ipAddress || "-" },
  ];

  return (
    <FormModal open onClose={onClose} title={t("auditLogsPage.details")} size="xl" showFooter={false}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label} className="profile-surface rounded-lg border px-3 py-2">
              <p className="profile-field-label text-xs font-medium uppercase tracking-wide">
                {item.label}
              </p>
              <p className="profile-field-value mt-1 text-sm font-semibold break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {log.userAgent && (
          <div>
            <p className="profile-field-label mb-1 text-xs font-medium uppercase tracking-wide">
              {t("auditLogsPage.userAgent")}
            </p>
            <p className="break-words font-mono text-xs ce-muted">{log.userAgent}</p>
          </div>
        )}

        {fields.length === 0 ? (
          <p className="py-6 text-center text-sm ce-muted">{t("auditLogsPage.noChanges")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="profile-field-label text-start text-xs uppercase tracking-wide">
                  <th className="px-3 py-2 text-start font-medium">{t("common.name")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("auditLogsPage.oldValues")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("auditLogsPage.newValues")}</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => {
                  const oldValue = asText(before?.[field]);
                  const newValue = asText(after?.[field]);
                  const changed = oldValue !== newValue;
                  return (
                    <tr key={field} className="profile-surface border-t">
                      <td className="px-3 py-2 font-mono text-xs profile-field-value">{field}</td>
                      <td className="px-3 py-2 break-words ce-muted">{oldValue}</td>
                      <td className="px-3 py-2 break-words">
                        {changed ? (
                          <Badge variant="success">{newValue}</Badge>
                        ) : (
                          <span className="ce-muted">{newValue}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FormModal>
  );
};

export default AuditLogDetailsModal;
