import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import {
  transactionStatusKeys,
  transactionStatusVariants,
  transactionTypeKeys,
  transactionTypeVariants,
} from "../../../transactions/types/Transactions.types";
import type { TransactionReversalsReportRequest, TransactionReversalsReportRowDto } from "../types/TransactionReversalsReport.types";

interface TransactionReversalsReportTableProps {
  items: TransactionReversalsReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: TransactionReversalsReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const TransactionReversalsReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: TransactionReversalsReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("reports.transactionReversals.id"),
        sortable: true,
        width: "80px",
        render: (row: TransactionReversalsReportRowDto) => <span className="font-semibold">#{row.id}</span>,
      },
      {
        key: "type",
        header: t("reports.transactionReversals.type"),
        sortable: true,
        width: "140px",
        render: (row: TransactionReversalsReportRowDto) =>
          transactionTypeKeys[row.type] ? (
            <Badge label={t(transactionTypeKeys[row.type])} variant={transactionTypeVariants[row.type]} size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "status",
        header: t("reports.transactionReversals.status"),
        sortable: true,
        width: "120px",
        render: (row: TransactionReversalsReportRowDto) =>
          transactionStatusKeys[row.status] ? (
            <Badge label={t(transactionStatusKeys[row.status])} variant={transactionStatusVariants[row.status]} size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "amount",
        header: t("reports.transactionReversals.amount"),
        sortable: true,
        width: "140px",
        render: (row: TransactionReversalsReportRowDto) => <span className="font-semibold">{formatCurrency(row.amount)}</span>,
      },
      {
        key: "customerName",
        header: t("reports.transactionReversals.customer"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName}</span>
            {row.customerPhone && (
              <span dir="ltr" className="text-xs ce-muted">
                {row.customerPhone}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "customerRoleId",
        header: t("reports.transactionReversals.customerType"),
        sortable: true,
        width: "120px",
        render: (row: TransactionReversalsReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.transactionReversals.city"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "sourceCustomerName",
        header: t("reports.transactionReversals.source"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span>{row.sourceCustomerName || "-"}</span>,
      },
      {
        key: "description",
        header: t("reports.transactionReversals.description"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span className="truncate">{row.description || "-"}</span>,
      },
      {
        key: "createdAt",
        header: t("reports.transactionReversals.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: TransactionReversalsReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "createdByName",
        header: t("reports.transactionReversals.createdBy"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span>{row.createdByName || "-"}</span>,
      },
      {
        key: "deletedAt",
        header: t("reports.transactionReversals.deletedAt"),
        sortable: true,
        width: "150px",
        render: (row: TransactionReversalsReportRowDto) => <span>{row.deletedAt ? formatDate(row.deletedAt, { locale: i18n.language }) : "-"}</span>,
      },
      {
        key: "deletedByName",
        header: t("reports.transactionReversals.deletedBy"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span>{row.deletedByName || "-"}</span>,
      },
      {
        key: "deleteReason",
        header: t("reports.transactionReversals.deleteReason"),
        sortable: true,
        render: (row: TransactionReversalsReportRowDto) => <span className="truncate">{row.deleteReason || "-"}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("reports.transactionReversals.noRows")}
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

export default TransactionReversalsReportTable;
