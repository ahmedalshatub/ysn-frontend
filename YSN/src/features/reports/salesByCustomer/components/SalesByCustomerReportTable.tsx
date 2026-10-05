import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import type { SalesByCustomerReportRowDto } from "../types/SalesByCustomerReport.types";

interface SalesByCustomerReportTableProps {
  items: SalesByCustomerReportRowDto[];
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

const SalesByCustomerReportTable = ({
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
}: SalesByCustomerReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "customerName",
        header: t("reports.salesByCustomer.customer"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName}</span>
            {row.customerPhone && (
              <span className="text-xs ce-muted" dir="ltr">
                {row.customerPhone}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "customerRoleId",
        header: t("reports.salesByCustomer.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: SalesByCustomerReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.salesByCustomer.city"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "parentAgentName",
        header: t("reports.salesByCustomer.parentAgent"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span>{row.parentAgentName || "-"}</span>,
      },
      {
        key: "invoicesCount",
        header: t("reports.salesByCustomer.invoicesCount"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "cardsCount",
        header: t("reports.salesByCustomer.cardsCount"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span>{row.cardsCount}</span>,
      },
      {
        key: "baseTotal",
        header: t("reports.salesByCustomer.baseTotal"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span>{formatCurrency(row.baseTotal)}</span>,
      },
      {
        key: "discountTotal",
        header: t("reports.salesByCustomer.discountTotal"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => (
          <span className="text-danger">{row.discountTotal > 0 ? formatCurrency(row.discountTotal) : "-"}</span>
        ),
      },
      {
        key: "salesTotal",
        header: t("reports.salesByCustomer.salesTotal"),
        sortable: true,
        render: (row: SalesByCustomerReportRowDto) => <span className="font-semibold">{formatCurrency(row.salesTotal)}</span>,
      },
      {
        key: "lastPurchaseAt",
        header: t("reports.salesByCustomer.lastPurchase"),
        sortable: true,
        width: "160px",
        render: (row: SalesByCustomerReportRowDto) => <span>{formatDate(row.lastPurchaseAt, { locale: i18n.language })}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.customerId}
      loading={loading}
      emptyMessage={t("reports.salesByCustomer.noRows")}
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

export default SalesByCustomerReportTable;
