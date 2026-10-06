import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import {
  tvActivationsReportKindKeys,
  type TvActivationsReportKindValue,
  type TvActivationsReportRowDto,
} from "../types/TvActivationsReport.types";

interface TvActivationsReportTableProps {
  items: TvActivationsReportRowDto[];
  totalCount: number;
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const TvActivationsReportTable = ({
  items,
  totalCount,
  loading,
  pageNumber,
  pageSize,
  sortBy,
  isAscending,
  onPageChange,
  onPageSizeChange,
  onSort,
}: TvActivationsReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "cityName",
        header: t("reports.tvActivations.city"),
        sortable: true,
        render: (row: TvActivationsReportRowDto) => <span className="font-medium">{row.cityName || "-"}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.tvActivations.cardType"),
        sortable: true,
        render: (row: TvActivationsReportRowDto) =>
          row.cardTypeId === null ? (
            <Badge label={t("reports.tvActivations.typedCode")} variant="secondary" size="sm" />
          ) : (
            <span>{row.cardTypeName || "-"}</span>
          ),
      },
      {
        key: "kind",
        header: t("reports.tvActivations.kind"),
        sortable: true,
        width: "130px",
        render: (row: TvActivationsReportRowDto) =>
          tvActivationsReportKindKeys[row.kind as TvActivationsReportKindValue] ? (
            <Badge label={t(tvActivationsReportKindKeys[row.kind as TvActivationsReportKindValue])} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "activationsCount",
        header: t("reports.tvActivations.activationsCount"),
        sortable: true,
        width: "110px",
        render: (row: TvActivationsReportRowDto) => <span className="font-semibold">{row.activationsCount}</span>,
      },
      {
        key: "completedCount",
        header: t("reports.tvActivations.completedCount"),
        sortable: true,
        width: "110px",
        render: (row: TvActivationsReportRowDto) => <span className="font-semibold text-success">{row.completedCount}</span>,
      },
      {
        key: "failedCount",
        header: t("reports.tvActivations.failedCount"),
        sortable: true,
        width: "110px",
        render: (row: TvActivationsReportRowDto) => <span className="text-danger">{row.failedCount}</span>,
      },
      {
        key: "pendingCount",
        header: t("reports.tvActivations.pendingCount"),
        sortable: true,
        width: "110px",
        render: (row: TvActivationsReportRowDto) => <span>{row.pendingCount}</span>,
      },
      {
        key: "needsCheckingCount",
        header: t("reports.tvActivations.needsCheckingCount"),
        sortable: true,
        width: "120px",
        render: (row: TvActivationsReportRowDto) =>
          row.needsCheckingCount > 0 ? (
            <Badge label={String(row.needsCheckingCount)} variant="warning" size="sm" />
          ) : (
            <span>0</span>
          ),
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => `${row.cityId}-${row.cardTypeId ?? 0}-${row.kind}`}
      loading={loading}
      emptyMessage={t("reports.tvActivations.noRows")}
      currentPage={pageNumber}
      pageSize={pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={sortBy}
      sortDirection={isAscending ? "asc" : "desc"}
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

export default TvActivationsReportTable;
