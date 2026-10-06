import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import type { TvsByCityReportRowDto } from "../types/TvsByCityReport.types";

interface TvsByCityReportTableProps {
  items: TvsByCityReportRowDto[];
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

const TvsByCityReportTable = ({
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
}: TvsByCityReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "cityName",
        header: t("reports.tvsByCity.city"),
        sortable: true,
        render: (row: TvsByCityReportRowDto) => <span className="font-medium">{row.cityName || "-"}</span>,
      },
      {
        key: "tvsCount",
        header: t("reports.tvsByCity.tvsCount"),
        sortable: true,
        width: "100px",
        render: (row: TvsByCityReportRowDto) => <span className="font-semibold">{row.tvsCount}</span>,
      },
      {
        key: "linkedCount",
        header: t("reports.tvsByCity.linkedCount"),
        sortable: true,
        width: "110px",
        render: (row: TvsByCityReportRowDto) => <span>{row.linkedCount}</span>,
      },
      {
        key: "activeCount",
        header: t("reports.tvsByCity.activeCount"),
        sortable: true,
        width: "110px",
        render: (row: TvsByCityReportRowDto) => <span className="font-semibold text-success">{row.activeCount}</span>,
      },
      {
        key: "endedCount",
        header: t("reports.tvsByCity.endedCount"),
        sortable: true,
        width: "110px",
        render: (row: TvsByCityReportRowDto) => <span className="text-danger">{row.endedCount}</span>,
      },
      {
        key: "neverActivatedCount",
        header: t("reports.tvsByCity.neverActivatedCount"),
        sortable: true,
        width: "120px",
        render: (row: TvsByCityReportRowDto) => <span>{row.neverActivatedCount}</span>,
      },
      {
        key: "activationsCount",
        header: t("reports.tvsByCity.activationsCount"),
        sortable: true,
        width: "120px",
        render: (row: TvsByCityReportRowDto) => <span className="font-semibold">{row.activationsCount}</span>,
      },
      {
        key: "registrationsCount",
        header: t("reports.tvsByCity.registrationsCount"),
        sortable: true,
        width: "110px",
        render: (row: TvsByCityReportRowDto) => <span>{row.registrationsCount}</span>,
      },
      {
        key: "renewalsCount",
        header: t("reports.tvsByCity.renewalsCount"),
        sortable: true,
        width: "110px",
        render: (row: TvsByCityReportRowDto) => <span>{row.renewalsCount}</span>,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.cityId}
      loading={loading}
      emptyMessage={t("reports.tvsByCity.noRows")}
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

export default TvsByCityReportTable;
