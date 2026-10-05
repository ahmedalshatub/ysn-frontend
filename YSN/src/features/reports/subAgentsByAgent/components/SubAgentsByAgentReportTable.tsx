import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import type { SubAgentsByAgentReportRowDto } from "../types/SubAgentsByAgentReport.types";

interface SubAgentsByAgentReportTableProps {
  items: SubAgentsByAgentReportRowDto[];
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

const SubAgentsByAgentReportTable = ({
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
}: SubAgentsByAgentReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "agentName",
        header: t("reports.subAgentsByAgent.agent"),
        sortable: true,
        render: (row: SubAgentsByAgentReportRowDto) => <span className="font-medium">{row.agentName}</span>,
      },
      {
        key: "subAgentName",
        header: t("reports.subAgentsByAgent.subAgent"),
        sortable: true,
        render: (row: SubAgentsByAgentReportRowDto) => <span className="font-medium">{row.subAgentName}</span>,
      },
      {
        key: "subAgentPhone",
        header: t("reports.subAgentsByAgent.subAgentPhone"),
        sortable: true,
        render: (row: SubAgentsByAgentReportRowDto) => <span dir="ltr">{row.subAgentPhone || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("reports.subAgentsByAgent.city"),
        sortable: true,
        render: (row: SubAgentsByAgentReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "isActive",
        header: t("reports.subAgentsByAgent.isActive"),
        sortable: true,
        width: "110px",
        render: (row: SubAgentsByAgentReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "danger"} size="sm" />
        ),
      },
      {
        key: "balance",
        header: t("reports.subAgentsByAgent.balance"),
        sortable: true,
        width: "140px",
        render: (row: SubAgentsByAgentReportRowDto) => <span className="font-semibold">{formatCurrency(row.balance)}</span>,
      },
      {
        key: "invoicesCount",
        header: t("reports.subAgentsByAgent.invoicesCount"),
        sortable: true,
        width: "100px",
        render: (row: SubAgentsByAgentReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "cardsCount",
        header: t("reports.subAgentsByAgent.cardsCount"),
        sortable: true,
        width: "100px",
        render: (row: SubAgentsByAgentReportRowDto) => <span>{row.cardsCount}</span>,
      },
      {
        key: "purchasesTotal",
        header: t("reports.subAgentsByAgent.purchases"),
        sortable: true,
        width: "140px",
        render: (row: SubAgentsByAgentReportRowDto) => <span className="font-semibold">{formatCurrency(row.purchasesTotal)}</span>,
      },
      {
        key: "agentTransfersReceivedCount",
        header: t("reports.subAgentsByAgent.transfersReceivedCount"),
        sortable: true,
        width: "120px",
        render: (row: SubAgentsByAgentReportRowDto) => <span>{row.agentTransfersReceivedCount}</span>,
      },
      {
        key: "agentTransfersReceivedTotal",
        header: t("reports.subAgentsByAgent.transfersReceivedTotal"),
        sortable: true,
        width: "150px",
        render: (row: SubAgentsByAgentReportRowDto) => (
          <span className="font-semibold text-success">{formatCurrency(row.agentTransfersReceivedTotal)}</span>
        ),
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.subAgentId}
      loading={loading}
      emptyMessage={t("reports.subAgentsByAgent.noRows")}
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

export default SubAgentsByAgentReportTable;
