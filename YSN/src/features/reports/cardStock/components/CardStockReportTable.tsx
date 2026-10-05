import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { cardKindKeys, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import type { CardStockReportRequest, CardStockReportRowDto } from "../types/CardStockReport.types";

interface CardStockReportTableProps {
  items: CardStockReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CardStockReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const CardStockReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: CardStockReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "cardTypeName",
        header: t("reports.cardStock.cardType"),
        sortable: true,
        render: (row: CardStockReportRowDto) => <span className="font-medium">{row.cardTypeName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.cardStock.cardCategory"),
        sortable: true,
        render: (row: CardStockReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.cardStock.city"),
        sortable: true,
        render: (row: CardStockReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "kind",
        header: t("reports.cardStock.kind"),
        sortable: true,
        width: "140px",
        render: (row: CardStockReportRowDto) =>
          cardKindKeys[row.kind as CardKindValue] ? (
            <Badge label={t(cardKindKeys[row.kind as CardKindValue])} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "isActive",
        header: t("reports.cardStock.isActive"),
        sortable: true,
        width: "110px",
        render: (row: CardStockReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "secondary"} size="sm" />
        ),
      },
      {
        key: "addedCount",
        header: t("reports.cardStock.addedCount"),
        sortable: true,
        width: "110px",
        render: (row: CardStockReportRowDto) => <span>{row.addedCount}</span>,
      },
      {
        key: "soldCount",
        header: t("reports.cardStock.soldCount"),
        sortable: true,
        width: "110px",
        render: (row: CardStockReportRowDto) => <span className="font-semibold text-success">{row.soldCount}</span>,
      },
      {
        key: "disabledCount",
        header: t("reports.cardStock.disabledCount"),
        sortable: true,
        width: "110px",
        render: (row: CardStockReportRowDto) => <span>{row.disabledCount}</span>,
      },
      {
        key: "deletedCount",
        header: t("reports.cardStock.deletedCount"),
        sortable: true,
        width: "110px",
        render: (row: CardStockReportRowDto) => <span className="text-danger">{row.deletedCount}</span>,
      },
      {
        key: "availableCount",
        header: t("reports.cardStock.availableCount"),
        sortable: true,
        width: "120px",
        render: (row: CardStockReportRowDto) => <span className="font-semibold">{row.availableCount}</span>,
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
      emptyMessage={t("reports.cardStock.noRows")}
      currentPage={filterValues.pageNumber}
      pageSize={filterValues.pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy}
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

export default CardStockReportTable;
