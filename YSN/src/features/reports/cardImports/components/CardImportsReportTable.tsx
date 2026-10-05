import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { cardSourceKeys } from "../../../cards/types/Cards.types";
import type { CardImportsReportRowDto } from "../types/CardImportsReport.types";

interface CardImportsReportTableProps {
  items: CardImportsReportRowDto[];
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

const CardImportsReportTable = ({
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
}: CardImportsReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "createdAt",
        header: t("reports.cardImports.date"),
        sortable: true,
        width: "160px",
        render: (row: CardImportsReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "importBatchId",
        header: t("reports.cardImports.batch"),
        sortable: true,
        render: (row: CardImportsReportRowDto) => <span dir="ltr" className="text-xs break-all">{row.importBatchId || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.cardImports.cardCategory"),
        sortable: true,
        render: (row: CardImportsReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.cardImports.cardType"),
        sortable: true,
        render: (row: CardImportsReportRowDto) => <span>{row.cardTypeName || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.cardImports.city"),
        sortable: true,
        render: (row: CardImportsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "source",
        header: t("reports.cardImports.source"),
        sortable: true,
        width: "130px",
        render: (row: CardImportsReportRowDto) => <Badge label={t(cardSourceKeys[row.source])} variant="info" size="sm" />,
      },
      {
        key: "createdByName",
        header: t("reports.cardImports.createdBy"),
        sortable: true,
        render: (row: CardImportsReportRowDto) => <span>{row.createdByName || "-"}</span>,
      },
      {
        key: "addedCount",
        header: t("reports.cardImports.added"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span className="font-semibold">{row.addedCount}</span>,
      },
      {
        key: "skippedCount",
        header: t("reports.cardImports.skipped"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span>{row.skippedCount}</span>,
      },
      {
        key: "soldCount",
        header: t("reports.cardImports.sold"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span className="text-success">{row.soldCount}</span>,
      },
      {
        key: "disabledCount",
        header: t("reports.cardImports.disabled"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span>{row.disabledCount}</span>,
      },
      {
        key: "deletedCount",
        header: t("reports.cardImports.deleted"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span className="text-danger">{row.deletedCount}</span>,
      },
      {
        key: "availableCount",
        header: t("reports.cardImports.available"),
        sortable: true,
        width: "100px",
        render: (row: CardImportsReportRowDto) => <span className="font-semibold">{row.availableCount}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.firstCardId}
      loading={loading}
      emptyMessage={t("reports.cardImports.noRows")}
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

export default CardImportsReportTable;
