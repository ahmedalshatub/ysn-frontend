import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import type { AgentPerformanceReportRequest, AgentPerformanceReportRowDto } from "../types/AgentPerformanceReport.types";

interface AgentPerformanceReportTableProps {
  items: AgentPerformanceReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: AgentPerformanceReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const AgentPerformanceReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: AgentPerformanceReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "agentName",
        header: t("reports.agentPerformance.agent"),
        sortable: true,
        render: (row: AgentPerformanceReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.agentName}</span>
            {row.agentPhone && (
              <span dir="ltr" className="text-xs ce-muted">
                {row.agentPhone}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "cityName",
        header: t("reports.agentPerformance.city"),
        sortable: true,
        render: (row: AgentPerformanceReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "isActive",
        header: t("reports.agentPerformance.isActive"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "secondary"} size="sm" />
        ),
      },
      {
        key: "balance",
        header: t("reports.agentPerformance.balance"),
        sortable: true,
        width: "130px",
        render: (row: AgentPerformanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.balance)}</span>,
      },
      {
        key: "subAgentsCount",
        header: t("reports.agentPerformance.subAgentsCount"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => <span>{row.subAgentsCount}</span>,
      },
      {
        key: "agentInvoicesCount",
        header: t("reports.agentPerformance.agentInvoicesCount"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => <span>{row.agentInvoicesCount}</span>,
      },
      {
        key: "agentCardsCount",
        header: t("reports.agentPerformance.agentCardsCount"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => <span>{row.agentCardsCount}</span>,
      },
      {
        key: "agentPurchasesTotal",
        header: t("reports.agentPerformance.agentPurchasesTotal"),
        sortable: true,
        width: "140px",
        render: (row: AgentPerformanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.agentPurchasesTotal)}</span>,
      },
      {
        key: "subAgentsCardsCount",
        header: t("reports.agentPerformance.subAgentsCardsCount"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => <span>{row.subAgentsCardsCount}</span>,
      },
      {
        key: "subAgentsPurchasesTotal",
        header: t("reports.agentPerformance.subAgentsPurchasesTotal"),
        sortable: true,
        width: "140px",
        render: (row: AgentPerformanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.subAgentsPurchasesTotal)}</span>,
      },
      {
        key: "agentTransfersSentCount",
        header: t("reports.agentPerformance.agentTransfersSentCount"),
        sortable: true,
        width: "110px",
        render: (row: AgentPerformanceReportRowDto) => <span>{row.agentTransfersSentCount}</span>,
      },
      {
        key: "agentTransfersSentTotal",
        header: t("reports.agentPerformance.agentTransfersSentTotal"),
        sortable: true,
        width: "140px",
        render: (row: AgentPerformanceReportRowDto) => <span className="font-semibold">{formatCurrency(row.agentTransfersSentTotal)}</span>,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.agentId}
      loading={loading}
      emptyMessage={t("reports.agentPerformance.noRows")}
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

export default AgentPerformanceReportTable;
