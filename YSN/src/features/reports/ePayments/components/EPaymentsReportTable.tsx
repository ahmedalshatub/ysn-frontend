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
  type TransactionStatusValue,
} from "../../../transactions/types/Transactions.types";
import type { EPaymentsReportRowDto } from "../types/EPaymentsReport.types";

interface EPaymentsReportTableProps {
  items: EPaymentsReportRowDto[];
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

const EPaymentsReportTable = ({
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
}: EPaymentsReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("reports.ePayments.id"),
        sortable: true,
        width: "80px",
        render: (row: EPaymentsReportRowDto) => <span className="font-semibold">#{row.id}</span>,
      },
      {
        key: "createdAt",
        header: t("reports.ePayments.createdAt"),
        sortable: true,
        width: "160px",
        render: (row: EPaymentsReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>
            {row.completedAt && row.completedAt !== row.createdAt && (
              <span className="text-xs ce-muted">
                {t("reports.ePayments.completedAt")}: {formatDate(row.completedAt, { locale: i18n.language })}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "customerName",
        header: t("reports.ePayments.customer"),
        sortable: true,
        render: (row: EPaymentsReportRowDto) => (
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
        header: t("reports.ePayments.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: EPaymentsReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.ePayments.city"),
        sortable: true,
        render: (row: EPaymentsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "amount",
        header: t("reports.ePayments.amount"),
        sortable: true,
        width: "140px",
        render: (row: EPaymentsReportRowDto) => <span className="font-semibold">{formatCurrency(row.amount)}</span>,
      },
      {
        key: "status",
        header: t("reports.ePayments.status"),
        sortable: true,
        width: "120px",
        render: (row: EPaymentsReportRowDto) =>
          transactionStatusKeys[row.status as TransactionStatusValue] ? (
            <Badge
              label={t(transactionStatusKeys[row.status as TransactionStatusValue])}
              variant={transactionStatusVariants[row.status as TransactionStatusValue]}
              size="sm"
            />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "maskedPan",
        header: t("reports.ePayments.maskedPan"),
        sortable: true,
        render: (row: EPaymentsReportRowDto) => <span dir="ltr">{row.maskedPan || "-"}</span>,
      },
      {
        key: "requestId",
        header: t("reports.ePayments.requestId"),
        sortable: true,
        render: (row: EPaymentsReportRowDto) => (
          <span dir="ltr" className="text-xs break-all">
            {row.requestId || "-"}
          </span>
        ),
      },
      {
        key: "referenceId",
        header: t("reports.ePayments.referenceId"),
        sortable: true,
        render: (row: EPaymentsReportRowDto) => (
          <span dir="ltr" className="text-xs break-all">
            {row.referenceId || "-"}
          </span>
        ),
      },
      {
        key: "longitude",
        header: t("reports.ePayments.longitude"),
        render: (row: EPaymentsReportRowDto) => <span dir="ltr">{row.longitude ?? "-"}</span>,
      },
      {
        key: "latitude",
        header: t("reports.ePayments.latitude"),
        render: (row: EPaymentsReportRowDto) => <span dir="ltr">{row.latitude ?? "-"}</span>,
      },
      {
        key: "isDeleted",
        header: t("reports.ePayments.isDeleted"),
        sortable: true,
        width: "110px",
        render: (row: EPaymentsReportRowDto) => (
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
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("reports.ePayments.noRows")}
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

export default EPaymentsReportTable;
