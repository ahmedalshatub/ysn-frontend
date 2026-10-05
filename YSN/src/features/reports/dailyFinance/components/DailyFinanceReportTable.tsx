import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import type { DailyFinanceReportRowDto } from "../types/DailyFinanceReport.types";

interface DailyFinanceReportTableProps {
  items: DailyFinanceReportRowDto[];
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

const DailyFinanceReportTable = ({
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
}: DailyFinanceReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "day",
        header: t("reports.dailyFinance.day"),
        sortable: true,
        width: "140px",
        render: (row: DailyFinanceReportRowDto) => <span>{formatDate(row.day, { locale: i18n.language, includeTime: false })}</span>,
      },
      {
        key: "transactionsCount",
        header: t("reports.dailyFinance.transactionsCount"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span>{row.transactionsCount}</span>,
      },
      {
        key: "invoicesCount",
        header: t("reports.dailyFinance.invoicesCount"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "depositsTotal",
        header: t("reports.dailyFinance.depositsTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold text-success">{formatCurrency(row.depositsTotal)}</span>,
      },
      {
        key: "withdrawsTotal",
        header: t("reports.dailyFinance.withdrawsTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold text-danger">{formatCurrency(row.withdrawsTotal)}</span>,
      },
      {
        key: "ePaymentsTotal",
        header: t("reports.dailyFinance.ePaymentsTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.ePaymentsTotal)}</span>,
      },
      {
        key: "agentTransfersTotal",
        header: t("reports.dailyFinance.agentTransfersTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.agentTransfersTotal)}</span>,
      },
      {
        key: "salesTotal",
        header: t("reports.dailyFinance.salesTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.salesTotal)}</span>,
      },
      {
        key: "netTotal",
        header: t("reports.dailyFinance.netTotal"),
        sortable: true,
        render: (row: DailyFinanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.netTotal)}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.day}
      loading={loading}
      emptyMessage={t("reports.dailyFinance.noRows")}
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

export default DailyFinanceReportTable;
