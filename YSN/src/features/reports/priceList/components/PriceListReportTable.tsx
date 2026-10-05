import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { PriceListReportRowDto } from "../types/PriceListReport.types";

interface PriceListReportTableProps {
  items: PriceListReportRowDto[];
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

const PriceListReportTable = ({
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
}: PriceListReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "sortOrder",
        header: t("reports.priceList.sortOrder"),
        sortable: true,
        width: "80px",
        render: (row: PriceListReportRowDto) => <span>{row.sortOrder}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.priceList.cardType"),
        sortable: true,
        render: (row: PriceListReportRowDto) => <span className="font-medium">{row.cardTypeName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.priceList.cardCategory"),
        sortable: true,
        render: (row: PriceListReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.priceList.city"),
        sortable: true,
        render: (row: PriceListReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "kind",
        header: t("reports.priceList.kind"),
        sortable: true,
        width: "140px",
        render: (row: PriceListReportRowDto) => <Badge label={t(cardKindKeys[row.kind])} variant="info" size="sm" />,
      },
      {
        key: "durationMonths",
        header: t("reports.priceList.duration"),
        sortable: true,
        width: "120px",
        render: (row: PriceListReportRowDto) => (
          <span>{row.durationMonths === null ? "-" : t("reports.priceList.months", { count: row.durationMonths })}</span>
        ),
      },
      {
        key: "agentPrice",
        header: t("reports.priceList.agentPrice"),
        sortable: true,
        width: "130px",
        render: (row: PriceListReportRowDto) => <span className="font-semibold">{row.agentPrice === null ? "-" : formatCurrency(row.agentPrice)}</span>,
      },
      {
        key: "clientPrice",
        header: t("reports.priceList.clientPrice"),
        sortable: true,
        width: "130px",
        render: (row: PriceListReportRowDto) => <span className="font-semibold">{row.clientPrice === null ? "-" : formatCurrency(row.clientPrice)}</span>,
      },
      {
        key: "amount",
        header: t("reports.priceList.amount"),
        sortable: true,
        width: "130px",
        render: (row: PriceListReportRowDto) => <span>{formatCurrency(row.amount)}</span>,
      },
      {
        key: "isActive",
        header: t("reports.priceList.isActive"),
        sortable: true,
        width: "110px",
        render: (row: PriceListReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "danger"} size="sm" />
        ),
      },
      {
        key: "availableCount",
        header: t("reports.priceList.available"),
        sortable: true,
        width: "110px",
        render: (row: PriceListReportRowDto) => <span className="font-semibold">{row.availableCount}</span>,
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
      emptyMessage={t("reports.priceList.noRows")}
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

export default PriceListReportTable;
