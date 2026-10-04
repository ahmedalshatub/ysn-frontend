import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import type { BaseListResponse } from "../../../../shared/types/base";
import type { ReportTableState } from "../../hooks/useReportState";
import { reportPageSizeOptions, type ReportColumn } from "../../types/Report.types";

interface ReportDataTableProps<TRow> {
  columns: ReportColumn<TRow>[];
  rows?: BaseListResponse<TRow>;
  rowKey: (row: TRow, index: number) => string | number;
  loading: boolean;
  table: ReportTableState;
}

const ReportDataTable = <TRow,>({ columns, rows, rowKey, loading, table }: ReportDataTableProps<TRow>) => {
  const { t } = useTranslation();

  return (
    <DataTable
      columns={columns}
      data={rows?.items ?? []}
      rowKey={rowKey}
      loading={loading}
      emptyMessage={t("reports.common.noRows")}
      currentPage={table.paging.pageNumber}
      pageSize={table.paging.pageSize}
      totalItems={rows?.totalCount ?? 0}
      onPageChange={table.onPageChange}
      onPageSizeChange={table.onPageSizeChange}
      sortColumn={table.paging.sortBy}
      sortDirection={table.paging.isAscending ? "asc" : "desc"}
      onSort={table.onSort}
      pageSizeOptions={reportPageSizeOptions}
      hoverable
      striped
      borderless
    />
  );
};

export default ReportDataTable;
