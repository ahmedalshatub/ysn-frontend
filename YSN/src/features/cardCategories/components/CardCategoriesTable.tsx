import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import FileImage from "../../../shared/components/media/FileImage";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import ImageIcon from "../../../assets/icons/ImageIcon";
import type { CardCategoryListDto, CardCategoryRequest } from "../types/CardCategories.types";

interface CardCategoriesTableProps {
  items: CardCategoryListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CardCategoryRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onOpen: (category: CardCategoryListDto) => void;
  getActions: (category: CardCategoryListDto) => ActionItem[];
}

const CardCategoriesTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  onPageChange,
  onPageSizeChange,
  onSort,
  onOpen,
  getActions,
}: CardCategoriesTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("cardCategories.name"),
        sortable: true,
        render: (row: CardCategoryListDto) => (
          <div className="flex items-center gap-3">
            <div className="table-thumbnail">
              <FileImage path={row.imageUrl} alt={row.name} className="h-full w-full object-cover" fallback={<ImageIcon className="h-5 w-5" />} />
            </div>
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        key: "cityName",
        header: t("cardCategories.city"),
        sortable: true,
        width: "140px",
        render: (row: CardCategoryListDto) => <span>{row.cityName ?? "-"}</span>,
      },
      {
        key: "cardTypesCount",
        header: t("cardCategories.cardTypes"),
        sortable: true,
        width: "120px",
        render: (row: CardCategoryListDto) => <span>{row.cardTypesCount}</span>,
      },
      {
        key: "sortOrder",
        header: t("cardCategories.sortOrder"),
        sortable: true,
        width: "110px",
        render: (row: CardCategoryListDto) => <span>{row.sortOrder}</span>,
      },
      {
        key: "isActive",
        header: t("cardCategories.isActive"),
        sortable: true,
        width: "110px",
        render: (row: CardCategoryListDto) => (
          <Badge
            label={row.isActive ? t("common.active") : t("common.inactive")}
            variant={row.isActive ? "success" : "secondary"}
            size="sm"
          />
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "140px",
        render: (row: CardCategoryListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "creator",
        header: t("cardCategories.creator"),
        sortable: true,
        width: "120px",
        render: (row: CardCategoryListDto) => <span>{row.creator || "-"}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "110px",
        render: (row: CardCategoryListDto) => (
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
        render: (row: CardCategoryListDto) => {
          const actions = getActions(row);
          return actions.length > 0 ? (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          ) : null;
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
      sortColumn={filterValues.sortBy || "sortOrder"}
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

export default CardCategoriesTable;
