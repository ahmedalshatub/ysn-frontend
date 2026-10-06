import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../../shared/components/table/TableActionDropdown";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, type CustomerRoleValue } from "../../../customers/types/Customers.types";
import useTvActions from "../../hooks/useTvActions";
import SubscriptionBadge from "./SubscriptionBadge";
import { tvPhone, type CustomerTvListDto, type CustomerTvRequest, type TvActionName } from "../../types/Tvs.types";

interface TvsTableProps {
  items: CustomerTvListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CustomerTvRequest;
  showCustomer: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onAction: (name: TvActionName, tv: CustomerTvListDto) => void;
}

const TvsTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  showCustomer,
  onPageChange,
  onPageSizeChange,
  onSort,
  onAction,
}: TvsTableProps) => {
  const { t, i18n } = useTranslation();
  const getActions = useTvActions(onAction);
  const columns = useMemo(() => {
    const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");
    return [
      {
        key: "tvNumber",
        header: t("tvs.tvNumber"),
        sortable: true,
        render: (row: CustomerTvListDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-mono font-medium">{row.tvNumber}</span>
            {row.nickname && <span className="text-xs">{row.nickname}</span>}
          </div>
        ),
      },
      {
        key: "cityName",
        header: t("tvs.city"),
        sortable: true,
        width: "120px",
        render: (row: CustomerTvListDto) => <span>{row.cityName || "-"}</span>,
      },
      ...(showCustomer
        ? [{
            key: "customerName",
            header: t("tvs.customer"),
            sortable: true,
            width: "200px",
            render: (row: CustomerTvListDto) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.customerName}</span>
                <span className="text-xs">
                  {customerRoleConfigs[row.customerRoleId as CustomerRoleValue]
                    ? t(customerRoleConfigs[row.customerRoleId as CustomerRoleValue].labelKey)
                    : ""}
                  {tvPhone(row) ? ` - ${tvPhone(row)}` : ""}
                </span>
              </div>
            ),
          }]
        : []),
      {
        key: "subscriptionEndsAt",
        header: t("tvs.endsAt"),
        sortable: true,
        width: "200px",
        render: (row: CustomerTvListDto) => (
          <div className="flex flex-col gap-1">
            <span>{date(row.subscriptionEndsAt)}</span>
            <SubscriptionBadge tv={row} />
          </div>
        ),
      },
      {
        key: "activationsCount",
        header: t("tvs.activationsCount"),
        sortable: true,
        width: "110px",
        render: (row: CustomerTvListDto) => <span>{row.activationsCount}</span>,
      },
      {
        key: "createdAt",
        header: t("tvs.addedAt"),
        sortable: true,
        width: "150px",
        render: (row: CustomerTvListDto) => (
          <div className="flex flex-col gap-1">
            <span>{date(row.createdAt)}</span>
            {row.creator && <span className="text-xs">{row.creator}</span>}
          </div>
        ),
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "120px",
        render: (row: CustomerTvListDto) => (
          <div className="flex flex-col gap-1">
            <Badge
              label={row.isDeleted ? t("tvs.removed") : t("tvs.linked")}
              variant={row.isDeleted ? "danger" : "success"}
              size="sm"
            />
            {row.isDeleted && row.deletedAt && <span className="text-xs">{date(row.deletedAt)}</span>}
          </div>
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CustomerTvListDto) => (
          <div onClick={(event) => event.stopPropagation()}>
            <TableActionDropdown size="sm" actions={getActions(row)} />
          </div>
        ),
      },
    ];
  }, [t, i18n.language, showCustomer, getActions]);

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("tvs.noTvs")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      onRowClick={(row) => onAction("view", row)}
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

export default TvsTable;
