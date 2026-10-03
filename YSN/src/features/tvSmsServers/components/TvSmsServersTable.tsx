import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import TvSmsServerStatusBadge from "./TvSmsServerStatusBadge";
import type { TvSmsServerListDto, TvSmsServerRequest } from "../types/TvSmsServers.types";

interface TvSmsServersTableProps {
  items: TvSmsServerListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: TvSmsServerRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  getActions: (server: TvSmsServerListDto) => ActionItem[];
}

const TvSmsServersTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  onPageChange,
  onPageSizeChange,
  onSort,
  getActions,
}: TvSmsServersTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("tvSmsServers.name"),
        sortable: true,
        render: (row: TvSmsServerListDto) => <span className="font-medium">{row.name}</span>,
      },
      {
        key: "baseUrl",
        header: t("tvSmsServers.baseUrl"),
        sortable: true,
        render: (row: TvSmsServerListDto) => <span dir="ltr">{row.baseUrl}</span>,
      },
      {
        key: "smsUserId",
        header: t("tvSmsServers.smsUserId"),
        sortable: true,
        width: "140px",
        render: (row: TvSmsServerListDto) => <span dir="ltr">{row.smsUserId}</span>,
      },
      {
        key: "citiesCount",
        header: t("tvSmsServers.cities"),
        sortable: true,
        width: "100px",
        render: (row: TvSmsServerListDto) => <span>{row.citiesCount}</span>,
      },
      {
        key: "isActive",
        header: t("common.status"),
        sortable: true,
        width: "110px",
        render: (row: TvSmsServerListDto) => <TvSmsServerStatusBadge server={row} />,
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "140px",
        render: (row: TvSmsServerListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: TvSmsServerListDto) => {
          const actions = getActions(row);
          return actions.length > 0 ? <TableActionDropdown size="sm" actions={actions} /> : null;
        },
      },
    ],
    [t, i18n.language, getActions]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("common.noData")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "name"}
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

export default TvSmsServersTable;
