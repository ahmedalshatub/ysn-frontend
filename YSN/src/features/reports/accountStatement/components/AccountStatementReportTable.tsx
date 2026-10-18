import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import {
  transactionStatusKeys,
  transactionTypeKeys,
  transactionTypeVariants,
  type TransactionStatusValue,
  type TransactionTypeValue,
} from "../../../transactions/types/Transactions.types";
import type { AccountStatementReportRowDto } from "../types/AccountStatementReport.types";

interface AccountStatementReportTableProps {
  items: AccountStatementReportRowDto[];
  totalCount: number;
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const AccountStatementReportTable = ({ items, totalCount, loading, pageNumber, pageSize, onPageChange, onPageSizeChange }: AccountStatementReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "date",
        header: t("reports.accountStatement.date"),
        width: "160px",
        render: (row: AccountStatementReportRowDto) => <span>{formatDate(row.date, { locale: i18n.language })}</span>,
      },
      {
        key: "type",
        header: t("reports.accountStatement.type"),
        width: "150px",
        render: (row: AccountStatementReportRowDto) =>
          row.invoiceId ? (
            <Badge label={`${t("reports.accountStatement.invoice")} #${row.invoiceId}`} variant="warning" size="sm" />
          ) : row.type ? (
            <Badge label={t(transactionTypeKeys[row.type as TransactionTypeValue])} variant={transactionTypeVariants[row.type as TransactionTypeValue]} size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "description",
        header: t("reports.accountStatement.description"),
        render: (row: AccountStatementReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="truncate">{row.description || "-"}</span>
            {!row.isApplied && row.status && (
              <span className="text-xs ce-muted">
                {t("reports.accountStatement.notApplied")}: {t(transactionStatusKeys[row.status as TransactionStatusValue])}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "otherPartyName",
        header: t("reports.accountStatement.otherParty"),
        render: (row: AccountStatementReportRowDto) => <span>{row.otherPartyName || "-"}</span>,
      },
      {
        key: "createdByName",
        header: t("reports.accountStatement.createdBy"),
        render: (row: AccountStatementReportRowDto) => <span>{row.createdByName || "-"}</span>,
      },
      {
        key: "balanceBefore",
        header: t("reports.accountStatement.balanceBefore"),
        width: "140px",
        render: (row: AccountStatementReportRowDto) => <span>{row.balanceBefore === null ? "-" : formatCurrency(row.balanceBefore)}</span>,
      },
      {
        key: "amount",
        header: t("reports.accountStatement.amount"),
        width: "140px",
        render: (row: AccountStatementReportRowDto) => (
          <span className={`font-semibold ${row.amount > 0 ? "text-success" : "text-danger"}`}>
            {row.amount > 0 ? "+" : ""}{formatCurrency(row.amount)}
          </span>
        ),
      },
      {
        key: "action",
        header: t("reports.accountStatement.action"),
        width: "110px",
        render: (row: AccountStatementReportRowDto) =>
          row.amount === 0 ? (
            <span>-</span>
          ) : (
            <Badge
              label={t(row.amount > 0 ? "reports.accountStatement.increase" : "reports.accountStatement.decrease")}
              variant={row.amount > 0 ? "success" : "danger"}
              size="sm"
            />
          ),
      },
      {
        key: "balanceAfter",
        header: t("reports.accountStatement.runningBalance"),
        width: "140px",
        render: (row: AccountStatementReportRowDto) => <span className="font-semibold">{row.balanceAfter === null ? "-" : formatCurrency(row.balanceAfter)}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => `${row.invoiceId ? "invoice" : "transaction"}-${row.id}`}
      loading={loading}
      emptyMessage={t("reports.accountStatement.noRows")}
      currentPage={pageNumber}
      pageSize={pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
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

export default AccountStatementReportTable;
