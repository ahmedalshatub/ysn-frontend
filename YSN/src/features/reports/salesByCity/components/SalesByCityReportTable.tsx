import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import type { SalesByCityReportRowDto } from "../types/SalesByCityReport.types";

interface SalesByCityReportTableProps {
  items: SalesByCityReportRowDto[];
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

const SalesByCityReportTable = ({
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
}: SalesByCityReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "cityName",
        header: t("reports.salesByCity.city"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span className="font-medium">{row.cityName || "-"}</span>,
      },
      {
        key: "customerRoleId",
        header: t("reports.salesByCity.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: SalesByCityReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "customersCount",
        header: t("reports.salesByCity.customersCount"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span>{row.customersCount}</span>,
      },
      {
        key: "invoicesCount",
        header: t("reports.salesByCity.invoicesCount"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "cardsCount",
        header: t("reports.salesByCity.cardsCount"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span>{row.cardsCount}</span>,
      },
      {
        key: "baseTotal",
        header: t("reports.salesByCity.baseTotal"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span>{formatCurrency(row.baseTotal)}</span>,
      },
      {
        key: "discountTotal",
        header: t("reports.salesByCity.discountTotal"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => (
          <span className="text-danger">{row.discountTotal > 0 ? formatCurrency(row.discountTotal) : "-"}</span>
        ),
      },
      {
        key: "salesTotal",
        header: t("reports.salesByCity.salesTotal"),
        sortable: true,
        render: (row: SalesByCityReportRowDto) => <span className="font-semibold">{formatCurrency(row.salesTotal)}</span>,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => `${row.cityId}-${row.customerRoleId}`}
      loading={loading}
      emptyMessage={t("reports.salesByCity.noRows")}
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

export default SalesByCityReportTable;
