import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs } from "../../../customers/types/Customers.types";
import type { InactiveCustomersReportRowDto } from "../types/InactiveCustomersReport.types";

interface InactiveCustomersReportTableProps {
  items: InactiveCustomersReportRowDto[];
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

const InactiveCustomersReportTable = ({
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
}: InactiveCustomersReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "customerName",
        header: t("reports.inactiveCustomers.customerName"),
        sortable: true,
        render: (row: InactiveCustomersReportRowDto) => <span className="font-medium">{row.customerName}</span>,
      },
      {
        key: "customerRoleId",
        header: t("reports.inactiveCustomers.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: InactiveCustomersReportRowDto) => (
          <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="primary" size="sm" />
        ),
      },
      {
        key: "customerPhone",
        header: t("reports.inactiveCustomers.customerPhone"),
        sortable: true,
        render: (row: InactiveCustomersReportRowDto) => <span dir="ltr">{row.customerPhone || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.inactiveCustomers.city"),
        sortable: true,
        render: (row: InactiveCustomersReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "parentAgentName",
        header: t("reports.inactiveCustomers.parentAgent"),
        sortable: true,
        render: (row: InactiveCustomersReportRowDto) => <span>{row.parentAgentName || "-"}</span>,
      },
      {
        key: "isActive",
        header: t("reports.inactiveCustomers.isActive"),
        sortable: true,
        width: "110px",
        render: (row: InactiveCustomersReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "danger"} size="sm" />
        ),
      },
      {
        key: "balance",
        header: t("reports.inactiveCustomers.balance"),
        sortable: true,
        width: "140px",
        render: (row: InactiveCustomersReportRowDto) => <span className="font-semibold">{formatCurrency(row.balance)}</span>,
      },
      {
        key: "lastPurchaseAt",
        header: t("reports.inactiveCustomers.lastPurchase"),
        sortable: true,
        width: "160px",
        render: (row: InactiveCustomersReportRowDto) =>
          row.lastPurchaseAt ? (
            <span>{formatDate(row.lastPurchaseAt, { locale: i18n.language })}</span>
          ) : (
            <span className="ce-muted">{t("reports.inactiveCustomers.neverPurchased")}</span>
          ),
      },
      {
        key: "lastSignInAt",
        header: t("reports.inactiveCustomers.lastSignIn"),
        sortable: true,
        width: "160px",
        render: (row: InactiveCustomersReportRowDto) =>
          row.lastSignInAt ? (
            <span>{formatDate(row.lastSignInAt, { locale: i18n.language })}</span>
          ) : (
            <span className="ce-muted">{t("reports.inactiveCustomers.neverSignedIn")}</span>
          ),
      },
      {
        key: "createdAt",
        header: t("reports.inactiveCustomers.createdAt"),
        sortable: true,
        width: "160px",
        render: (row: InactiveCustomersReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
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
      emptyMessage={t("reports.inactiveCustomers.noRows")}
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

export default InactiveCustomersReportTable;
