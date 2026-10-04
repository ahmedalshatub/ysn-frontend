import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import EyeIcon from "../../../assets/icons/EyeIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import {
  TransactionStatus,
  TransactionType,
  transactionStatusKeys,
  transactionStatusVariants,
  transactionTypeVariants,
  transactionTypeKeys,
  type TransactionListDto,
  type TransactionRequest,
} from "../types/Transactions.types";

interface TransactionsTableProps {
  items: TransactionListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: TransactionRequest;
  customerId?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onView: (transaction: TransactionListDto) => void;
  onDelete: (transaction: TransactionListDto) => void;
  onRestore: (transaction: TransactionListDto) => void;
}

const isMoneyIn = (row: TransactionListDto, customerId?: number) => {
  if (row.type === TransactionType.Withdraw) return false;
  if (row.type === TransactionType.AgentTransfer) return customerId !== row.sourceCustomerId;
  return true;
};

const TransactionsTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  customerId,
  onPageChange,
  onPageSizeChange,
  onSort,
  onView,
  onDelete,
  onRestore,
}: TransactionsTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("transactions.id"),
        sortable: true,
        width: "80px",
        render: (row: TransactionListDto) => <span className="font-semibold">#{row.id}</span>,
      },
      {
        key: "type",
        header: t("transactions.type"),
        sortable: true,
        width: "140px",
        render: (row: TransactionListDto) => <Badge label={t(transactionTypeKeys[row.type])} variant={transactionTypeVariants[row.type]} size="sm" />,
      },
      {
        key: "status",
        header: t("transactions.status"),
        sortable: true,
        width: "120px",
        render: (row: TransactionListDto) => <Badge label={t(transactionStatusKeys[row.status])} variant={transactionStatusVariants[row.status]} size="sm" />,
      },
      {
        key: "amount",
        header: t("transactions.amount"),
        sortable: true,
        width: "140px",
        render: (row: TransactionListDto) => (
          <span className={isMoneyIn(row, customerId) ? "font-semibold text-green-600 dark:text-green-400" : "font-semibold text-red-600 dark:text-red-400"}>
            {formatCurrency(row.amount)}
          </span>
        ),
      },
      {
        key: "customerName",
        header: t("transactions.customer"),
        render: (row: TransactionListDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName ?? "-"}</span>
            {(row.customerPhone || row.customerCityName) && (
              <span className="text-xs ce-muted">
                <span dir="ltr">{row.customerPhone ?? ""}</span>
                {row.customerPhone && row.customerCityName ? " - " : ""}
                {row.customerCityName ?? ""}
              </span>
            )}
            {row.customerBalanceAfter !== null && (
              <span className="text-xs">
                {formatCurrency(row.customerBalanceBefore)} → {formatCurrency(row.customerBalanceAfter)}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "sourceCustomerName",
        header: t("transactions.source"),
        render: (row: TransactionListDto) =>
          row.sourceCustomerId ? (
            <div className="flex flex-col gap-1">
              <span className="font-medium">{row.sourceCustomerName}</span>
              {row.sourceBalanceAfter !== null && (
                <span className="text-xs">
                  {formatCurrency(row.sourceBalanceBefore)} → {formatCurrency(row.sourceBalanceAfter)}
                </span>
              )}
            </div>
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "description",
        header: t("transactions.description"),
        render: (row: TransactionListDto) => (
          <div className="flex flex-col gap-1">
            <span className="truncate">{row.description || "-"}</span>
            {row.maskedPan && <span className="text-xs ce-muted">{t("transactions.card")}: {row.maskedPan}</span>}
          </div>
        ),
      },
      {
        key: "createdAt",
        header: t("transactions.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: TransactionListDto) => (
          <div className="flex flex-col gap-1">
            <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>
            {row.creator && <span className="text-xs">{row.creator}</span>}
            {row.completedAt && row.completedAt !== row.createdAt && (
              <span className="text-xs ce-muted">
                {t("transactions.completedAt")}: {formatDate(row.completedAt, { locale: i18n.language })}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        width: "110px",
        render: (row: TransactionListDto) => (
          <Badge
            label={row.isDeleted ? t("common.deleted") : t("common.active")}
            variant={row.isDeleted ? "danger" : "success"}
            size="sm"
          />
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: TransactionListDto) => {
          const reversible = row.status !== TransactionStatus.Pending;
          const actions = [
            { label: t("transactions.view"), icon: <EyeIcon />, onClick: () => onView(row) },
            ...(reversible && row.isDeleted && can(Permission.TransactionsRestore)
              ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onRestore(row) }]
              : []),
            ...(reversible && !row.isDeleted && can(Permission.TransactionsDelete)
              ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDelete(row) }]
              : []),
          ];
          return (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          );
        },
      },
    ],
    [t, i18n.language, can, customerId, onView, onDelete, onRestore]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("transactions.noTransactions")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      onRowClick={(row) => onView(row)}
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

export default TransactionsTable;
