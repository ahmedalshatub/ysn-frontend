import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import type { CustomerBalancesReportRowDto } from "../types/CustomerBalancesReport.types";

interface CustomerBalancesReportTableProps {
  items: CustomerBalancesReportRowDto[];
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

const CustomerBalancesReportTable = ({
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
}: CustomerBalancesReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "customerName",
        header: t("reports.customerBalances.customer"),
        sortable: true,
        render: (row: CustomerBalancesReportRowDto) => (
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
        header: t("reports.customerBalances.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: CustomerBalancesReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.customerBalances.city"),
        sortable: true,
        render: (row: CustomerBalancesReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "parentAgentName",
        header: t("reports.customerBalances.parentAgent"),
        sortable: true,
        render: (row: CustomerBalancesReportRowDto) => <span>{row.parentAgentName || "-"}</span>,
      },
      {
        key: "balance",
        header: t("reports.customerBalances.balance"),
        sortable: true,
        width: "140px",
        render: (row: CustomerBalancesReportRowDto) => <span className="font-semibold">{formatCurrency(row.balance)}</span>,
      },
      {
        key: "periodCredit",
        header: t("reports.customerBalances.periodCredit"),
        sortable: true,
        width: "140px",
        render: (row: CustomerBalancesReportRowDto) => (
          <span className="font-semibold text-success">{row.periodCredit > 0 ? formatCurrency(row.periodCredit) : "-"}</span>
        ),
      },
      {
        key: "periodDebit",
        header: t("reports.customerBalances.periodDebit"),
        sortable: true,
        width: "140px",
        render: (row: CustomerBalancesReportRowDto) => (
          <span className="font-semibold text-danger">{row.periodDebit > 0 ? formatCurrency(row.periodDebit) : "-"}</span>
        ),
      },
      {
        key: "lastMovementAt",
        header: t("reports.customerBalances.lastMovement"),
        sortable: true,
        width: "160px",
        render: (row: CustomerBalancesReportRowDto) => (
          <span>{row.lastMovementAt ? formatDate(row.lastMovementAt, { locale: i18n.language }) : "-"}</span>
        ),
      },
      {
        key: "isActive",
        header: t("reports.customerBalances.isActive"),
        sortable: true,
        width: "110px",
        render: (row: CustomerBalancesReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "secondary"} size="sm" />
        ),
      },
      {
        key: "isDeleted",
        header: t("reports.customerBalances.isDeleted"),
        sortable: true,
        width: "110px",
        render: (row: CustomerBalancesReportRowDto) => (
          <Badge label={row.isDeleted ? t("common.deleted") : t("common.active")} variant={row.isDeleted ? "danger" : "success"} size="sm" />
        ),
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
      emptyMessage={t("reports.customerBalances.noRows")}
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

export default CustomerBalancesReportTable;
