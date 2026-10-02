import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { fullName, fullPhone, type UserListDto, type UserRequest } from "../types/Users.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";

interface UsersTableProps {
  items: UserListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: UserRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  getActions: (user: UserListDto) => ActionItem[];
}

const UsersTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  onPageChange,
  onPageSizeChange,
  onSort,
  getActions,
}: UsersTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "firstName",
        header: t("users.name"),
        sortable: true,
        render: (row: UserListDto) => (
          <div className="flex items-center gap-3">
            <ProfileAvatar name={fullName(row)} imagePath={row.profileImage} size="sm" />
            <span className="font-medium">{fullName(row)}</span>
          </div>
        ),
      },
      {
        key: "email",
        header: t("users.email"),
        sortable: true,
        render: (row: UserListDto) => <span dir="ltr">{row.email ?? "-"}</span>,
      },
      {
        key: "phoneNumber",
        header: t("users.phoneNumber"),
        sortable: true,
        width: "150px",
        render: (row: UserListDto) => <span dir="ltr">{fullPhone(row) || "-"}</span>,
      },
      {
        key: "roleName",
        header: t("users.role"),
        sortable: true,
        width: "150px",
        render: (row: UserListDto) => (
          <Badge label={row.roleName ?? "-"} variant={row.isSuperAdmin ? "primary" : "info"} size="sm" />
        ),
      },
      {
        key: "isActive",
        header: t("users.isActive"),
        sortable: true,
        width: "110px",
        render: (row: UserListDto) => (
          <Badge
            label={row.isActive ? t("common.active") : t("common.inactive")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "lastLoginAt",
        header: t("users.lastLogin"),
        sortable: true,
        width: "150px",
        render: (row: UserListDto) => (
          <span>{row.lastLoginAt ? formatDate(row.lastLoginAt, { locale: i18n.language }) : t("users.never")}</span>
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: UserListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "110px",
        render: (row: UserListDto) => (
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
        render: (row: UserListDto) => {
          const actions = getActions(row);
          return actions.length > 0 ? <TableActionDropdown size="sm" actions={actions} /> : null;
        },
      },
    ],
    [t, i18n.language, getActions]
  );

  return (
    <DataTable
      title={t("users.pageTitle")}
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

export default UsersTable;
