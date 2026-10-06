import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import useProviderMessage from "../../hooks/useProviderMessage";
import { tvSmsApiCallKeys, type TvSmsApiLogDto, type TvSmsApiLogRequest } from "../../types/TvSmsApiLogs.types";

interface TvSmsApiLogsTableProps {
  items: TvSmsApiLogDto[];
  totalCount: number;
  loading: boolean;
  filterValues: TvSmsApiLogRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const TvSmsApiLogsTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: TvSmsApiLogsTableProps) => {
  const { t, i18n } = useTranslation();
  const providerMessage = useProviderMessage();

  const columns = useMemo(
    () => [
      {
        key: "createdAt",
        header: t("tvSmsApiLogs.createdAt"),
        sortable: true,
        width: "170px",
        render: (row: TvSmsApiLogDto) => (
          <div className="flex flex-col gap-1">
            <span>{formatDate(row.createdAt, { locale: i18n.language, includeTime: true })}</span>
            {row.creator && <span className="text-xs">{row.creator}</span>}
          </div>
        ),
      },
      {
        key: "cityName",
        header: t("tvs.city"),
        sortable: true,
        width: "160px",
        render: (row: TvSmsApiLogDto) => (
          <div className="flex flex-col gap-1">
            <span>{row.cityName || "-"}</span>
            <span dir="ltr" className="text-xs break-all">{row.baseUrl}</span>
          </div>
        ),
      },
      {
        key: "call",
        header: t("tvSmsApiLogs.call"),
        width: "160px",
        render: (row: TvSmsApiLogDto) => <span>{t(tvSmsApiCallKeys[row.call] ?? "")}</span>,
      },
      {
        key: "tvNumber",
        header: t("tvs.tvNumber"),
        sortable: true,
        width: "150px",
        render: (row: TvSmsApiLogDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-mono">{row.tvNumber || "-"}</span>
            {row.tvActivationId && <span className="text-xs">{t("tvActivations.activationTitle", { id: row.tvActivationId })}</span>}
          </div>
        ),
      },
      {
        key: "succeeded",
        header: t("tvSmsApiLogs.result"),
        sortable: true,
        width: "140px",
        render: (row: TvSmsApiLogDto) => (
          <div className="flex flex-col gap-1">
            <Badge
              label={row.succeeded ? t("tvSmsApiLogs.succeeded") : t("tvSmsApiLogs.failed")}
              variant={row.succeeded ? "success" : "danger"}
              size="sm"
            />
            <span className="text-xs" dir="ltr">
              {`HTTP ${row.httpStatus ?? "-"} / ${row.providerStatusCode ?? "-"}`}
            </span>
          </div>
        ),
      },
      {
        key: "providerMessage",
        header: t("tvActivations.providerMessage"),
        render: (row: TvSmsApiLogDto) => <span className="text-xs">{providerMessage(row.providerMessage)}</span>,
      },
      {
        key: "durationMs",
        header: t("tvSmsApiLogs.duration"),
        sortable: true,
        width: "110px",
        render: (row: TvSmsApiLogDto) => <span>{row.durationMs}</span>,
      },
    ],
    [t, i18n.language, providerMessage]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("tvSmsApiLogs.noLogs")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      pageSizeOptions={[
        { label: "25", value: 25 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
      ]}
      hoverable
      striped
      borderless
    />
  );
};

export default TvSmsApiLogsTable;
