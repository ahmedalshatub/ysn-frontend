import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import {
  CustomerType,
  customerFullName,
  customerPhone,
  type CustomerListDto,
  type CustomerRequest,
  type CustomerTypeValue,
} from "../types/Customers.types";

interface CustomersTableProps {
  customerType: CustomerTypeValue;
  items: CustomerListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CustomerRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onOpen: (customer: CustomerListDto) => void;
  getActions: (customer: CustomerListDto) => ActionItem[];
}

const CustomersTable = ({
  customerType,
  items,
  totalCount,
  loading,
  filterValues,
  onPageChange,
  onPageSizeChange,
  onSort,
  onOpen,
  getActions,
}: CustomersTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "firstName",
        header: t("customers.name"),
        sortable: true,
        render: (row: CustomerListDto) => (
          <div className="flex items-center gap-3">
            <ProfileAvatar name={customerFullName(row)} imagePath={row.profileImage} size="sm" />
            <span className="font-medium">{customerFullName(row)}</span>
          </div>
        ),
      },
      {
        key: "phoneNumber",
        header: t("customers.phoneNumber"),
        sortable: true,
        width: "150px",
        render: (row: CustomerListDto) => <span dir="ltr">{customerPhone(row) || "-"}</span>,
      },
      {
        key: "cityName",
        header: t("customers.city"),
        sortable: true,
        width: "130px",
        render: (row: CustomerListDto) => <span>{row.cityName ?? "-"}</span>,
      },
      ...(customerType === CustomerType.SubAgent
        ? [{
            key: "parentAgentName",
            header: t("customers.parentAgent"),
            sortable: true,
            render: (row: CustomerListDto) => (
              <div className="flex flex-wrap items-center gap-1.5">
                <span>{row.parentAgentName ?? "-"}</span>
                {!row.parentAgentIsActive && <Badge label={t("customers.agentNotActive")} variant="warning" size="sm" />}
              </div>
            ),
          }]
        : []),
      ...(customerType === CustomerType.Agent
        ? [{
            key: "subAgentsCount",
            header: t("customers.subAgentsCount"),
            sortable: true,
            width: "120px",
            render: (row: CustomerListDto) => <span>{row.subAgentsCount}</span>,
          }]
        : []),
      {
        key: "balance",
        header: t("customers.balance"),
        sortable: true,
        width: "140px",
        render: (row: CustomerListDto) => <span>{formatCurrency(row.balance)}</span>,
      },
      {
        key: "maxTvCount",
        header: t("customers.maxTvCount"),
        sortable: true,
        width: "110px",
        render: (row: CustomerListDto) => <span>{row.isUnlimitedTvs ? t("customers.unlimited") : row.maxTvCount}</span>,
      },
      {
        key: "isActive",
        header: t("customers.isActive"),
        sortable: true,
        width: "110px",
        render: (row: CustomerListDto) => (
          <Badge
            label={row.isActive ? t("common.active") : t("customers.disabled")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "lastLoginAt",
        header: t("customers.lastLogin"),
        sortable: true,
        width: "140px",
        render: (row: CustomerListDto) => (
          <span>{row.lastLoginAt ? formatDate(row.lastLoginAt, { locale: i18n.language }) : t("customers.never")}</span>
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "140px",
        render: (row: CustomerListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "creator",
        header: t("customers.creator"),
        sortable: true,
        width: "120px",
        render: (row: CustomerListDto) => <span>{row.creator || t("customers.selfRegistered")}</span>,
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CustomerListDto) => {
          const actions = getActions(row);
          return actions.length > 0 ? (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          ) : null;
        },
      },
    ],
    [t, i18n.language, customerType, getActions]
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
      sortColumn={filterValues.sortBy || "firstName"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      onRowClick={(row) => onOpen(row)}
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

export default CustomersTable;
