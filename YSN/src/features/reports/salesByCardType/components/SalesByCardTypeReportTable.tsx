import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { cardKindKeys, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import type { SalesByCardTypeReportRowDto } from "../types/SalesByCardTypeReport.types";

interface SalesByCardTypeReportTableProps {
  items: SalesByCardTypeReportRowDto[];
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

const SalesByCardTypeReportTable = ({
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
}: SalesByCardTypeReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "cardTypeName",
        header: t("reports.salesByCardType.cardType"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span className="font-medium">{row.cardTypeName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.salesByCardType.cardCategory"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.salesByCardType.city"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "kind",
        header: t("reports.salesByCardType.kind"),
        sortable: true,
        width: "140px",
        render: (row: SalesByCardTypeReportRowDto) =>
          cardKindKeys[row.kind as CardKindValue] ? (
            <Badge label={t(cardKindKeys[row.kind as CardKindValue])} variant="secondary" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "invoicesCount",
        header: t("reports.salesByCardType.invoicesCount"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "cardsCount",
        header: t("reports.salesByCardType.cardsCount"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span>{row.cardsCount}</span>,
      },
      {
        key: "baseTotal",
        header: t("reports.salesByCardType.baseTotal"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span>{formatCurrency(row.baseTotal)}</span>,
      },
      {
        key: "discountTotal",
        header: t("reports.salesByCardType.discountTotal"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => (
          <span className="text-danger">{row.discountTotal > 0 ? formatCurrency(row.discountTotal) : "-"}</span>
        ),
      },
      {
        key: "salesTotal",
        header: t("reports.salesByCardType.salesTotal"),
        sortable: true,
        render: (row: SalesByCardTypeReportRowDto) => <span className="font-semibold">{formatCurrency(row.salesTotal)}</span>,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.cardTypeId}
      loading={loading}
      emptyMessage={t("reports.salesByCardType.noRows")}
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

export default SalesByCardTypeReportTable;
