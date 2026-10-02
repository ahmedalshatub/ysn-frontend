import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { CityListDto, CityRequest } from "../types/Cities.types";

interface CitiesTableProps {
  items: CityListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CityRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onEdit: (city: CityListDto) => void;
  onDelete: (city: CityListDto) => void;
  onRestore: (city: CityListDto) => void;
}

const CitiesTable = ({
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
}: CitiesTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("cities.name"),
        sortable: true,
        render: (row: CityListDto) => <span className="font-medium">{row.name}</span>,
      },
      {
        key: "sortOrder",
        header: t("cities.sortOrder"),
        sortable: true,
        width: "120px",
        render: (row: CityListDto) => <span>{row.sortOrder}</span>,
      },
      {
        key: "customersCount",
        header: t("cities.customersCount"),
        sortable: true,
        width: "120px",
        render: (row: CityListDto) => <span>{row.customersCount}</span>,
      },
      {
        key: "isActive",
        header: t("cities.isActive"),
        sortable: true,
        width: "120px",
        render: (row: CityListDto) => (
          <Badge
            label={row.isActive ? t("common.yes") : t("common.no")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: CityListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "120px",
        render: (row: CityListDto) => (
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
        render: (row: CityListDto) => {
          const actions = row.isDeleted
            ? [
                ...(can(Permission.CitiesRestore)
                  ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onRestore(row) }]
                  : []),
              ]
            : [
                ...(can(Permission.CitiesUpdate)
                  ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onEdit(row) }]
                  : []),
                ...(can(Permission.CitiesDelete) && row.customersCount === 0
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
      title={t("cities.pageTitle")}
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
      sortColumn={filterValues.sortBy || "sortOrder"}
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

export default CitiesTable;
