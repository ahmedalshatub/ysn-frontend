import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import EditIcon from "../../../assets/icons/EditIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LockIcon from "../../../assets/icons/LockIcon";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { isLockedRole, type RoleListDto, type RoleRequest } from "../types/Roles.types";

interface RolesTableProps {
  items: RoleListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: RoleRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onEdit: (role: RoleListDto) => void;
  onDelete: (role: RoleListDto) => void;
  onRestore: (role: RoleListDto) => void;
}

const RolesTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  onPageChange,
  onPageSizeChange,
  onSort,
  onEdit,
  onDelete,
  onRestore,
}: RolesTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("roles.name"),
        sortable: true,
        render: (row: RoleListDto) => (
          <div className="flex items-center gap-2">
            {isLockedRole(row) && <LockIcon className="h-4 w-4 text-primary" />}
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        key: "permissionsCount",
        header: t("roles.permissionsCount"),
        sortable: true,
        width: "140px",
        render: (row: RoleListDto) => <span>{row.permissionsCount}</span>,
      },
      {
        key: "usersCount",
        header: t("roles.usersCount"),
        sortable: true,
        width: "130px",
        render: (row: RoleListDto) => <span>{row.usersCount}</span>,
      },
      {
        key: "isActive",
        header: t("roles.isActive"),
        sortable: true,
        width: "110px",
        render: (row: RoleListDto) => (
          <Badge
            label={row.isActive ? t("common.active") : t("common.inactive")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "isSystem",
        header: t("roles.isSystem"),
        sortable: true,
        width: "110px",
        render: (row: RoleListDto) =>
          isLockedRole(row) ? <Badge label={t("roles.locked")} variant="primary" size="sm" /> : <span>-</span>,
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: RoleListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "110px",
        render: (row: RoleListDto) => (
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
        render: (row: RoleListDto) => {
          const actions = row.isDeleted
            ? [
                ...(can(Permission.RolesRestore)
                  ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onRestore(row) }]
                  : []),
              ]
            : [
                ...(can(Permission.RolesUpdate)
                  ? [{
                      label: isLockedRole(row) ? t("common.view") : t("common.edit"),
                      icon: isLockedRole(row) ? <EyeIcon /> : <EditIcon />,
                      onClick: () => onEdit(row),
                    }]
                  : []),
                ...(can(Permission.RolesDelete) && !isLockedRole(row) && row.usersCount === 0
                  ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDelete(row) }]
                  : []),
              ];
          return actions.length > 0 ? <TableActionDropdown size="sm" actions={actions} /> : null;
        },
      },
    ],
    [t, i18n.language, can, onEdit, onDelete, onRestore]
  );

  return (
    <DataTable
      title={t("roles.pageTitle")}
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

export default RolesTable;
