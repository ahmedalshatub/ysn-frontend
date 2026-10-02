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
import { countryFlagEmoji, type CountryListDto, type CountryRequest } from "../types/Countries.types";

interface CountriesTableProps {
  items: CountryListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CountryRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onEdit: (country: CountryListDto) => void;
  onDelete: (country: CountryListDto) => void;
  onRestore: (country: CountryListDto) => void;
}

const CountriesTable = ({
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
}: CountriesTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("countries.name"),
        sortable: true,
        render: (row: CountryListDto) => (
          <span className="font-medium">
            <span className="me-2">{countryFlagEmoji(row.isoCode)}</span>
            {row.name}
          </span>
        ),
      },
      {
        key: "isoCode",
        header: t("countries.isoCode"),
        sortable: true,
        width: "110px",
        render: (row: CountryListDto) => <span>{row.isoCode}</span>,
      },
      {
        key: "phoneCode",
        header: t("countries.phoneCode"),
        sortable: true,
        width: "130px",
        render: (row: CountryListDto) => <span dir="ltr">{row.phoneCode}</span>,
      },
      {
        key: "phoneNumberLength",
        header: t("countries.phoneNumberLength"),
        sortable: true,
        width: "140px",
        render: (row: CountryListDto) => <span>{row.phoneNumberLength ?? "-"}</span>,
      },
      {
        key: "isActive",
        header: t("countries.isActive"),
        sortable: true,
        width: "120px",
        render: (row: CountryListDto) => (
          <Badge
            label={row.isActive ? t("common.yes") : t("common.no")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "isDefault",
        header: t("countries.isDefault"),
        sortable: true,
        width: "120px",
        render: (row: CountryListDto) =>
          row.isDefault ? <Badge label={t("countries.default")} variant="primary" size="sm" /> : <span>-</span>,
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: CountryListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "120px",
        render: (row: CountryListDto) => (
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
        render: (row: CountryListDto) => {
          const actions = row.isDeleted
            ? [
                ...(can(Permission.CountriesRestore)
                  ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onRestore(row) }]
                  : []),
              ]
            : [
                ...(can(Permission.CountriesUpdate)
                  ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onEdit(row) }]
                  : []),
                ...(can(Permission.CountriesDelete) && !row.isDefault
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
      title={t("countries.pageTitle")}
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

export default CountriesTable;
