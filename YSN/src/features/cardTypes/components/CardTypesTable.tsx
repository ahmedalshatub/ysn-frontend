import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import FileImage from "../../../shared/components/media/FileImage";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatAmount } from "../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import ImageIcon from "../../../assets/icons/ImageIcon";
import { customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { cardKindKeys, type CardTypeListDto, type CardTypeRequest } from "../types/CardTypes.types";

interface CardTypesTableProps {
  items: CardTypeListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CardTypeRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  getActions: (cardType: CardTypeListDto) => ActionItem[];
  onRowReorder?: (fromIndex: number, toIndex: number) => void;
}

const formatPrice = (value: number | null) => (value === null ? "-" : formatAmount(value));

const CardTypesTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort, getActions, onRowReorder }: CardTypesTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("cardTypes.name"),
        sortable: true,
        render: (row: CardTypeListDto) => (
          <div className="flex items-center gap-3">
            <div className="table-thumbnail">
              <FileImage path={row.imageUrl} alt={row.name} className="h-full w-full object-cover" fallback={<ImageIcon className="h-5 w-5" />} />
            </div>
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        key: "cardCategoryName",
        header: t("cardTypes.category"),
        sortable: true,
        render: (row: CardTypeListDto) => (
          <div className="flex flex-col">
            <span>{row.cardCategoryName ?? "-"}</span>
            <span className="text-xs">{row.cityName ?? ""}</span>
          </div>
        ),
      },
      {
        key: "kind",
        header: t("cardTypes.kind"),
        sortable: true,
        width: "150px",
        render: (row: CardTypeListDto) => (
          <div className="flex flex-col gap-1">
            <Badge label={t(cardKindKeys[row.kind])} variant="info" size="sm" />
            {row.durationMonths !== null && <span className="text-xs">{t("cardTypes.months", { count: row.durationMonths })}</span>}
          </div>
        ),
      },
      { key: "agentPrice", header: t("cardTypes.agentPrice"), sortable: true, width: "120px", render: (row: CardTypeListDto) => <span dir="ltr">{formatPrice(row.agentPrice)}</span> },
      { key: "clientPrice", header: t("cardTypes.clientPrice"), sortable: true, width: "120px", render: (row: CardTypeListDto) => <span dir="ltr">{formatPrice(row.clientPrice)}</span> },
      { key: "amount", header: t("cardTypes.amount"), sortable: true, width: "120px", render: (row: CardTypeListDto) => <span dir="ltr">{formatPrice(row.amount)}</span> },
      {
        key: "targets",
        header: t("cardTypes.targets"),
        width: "170px",
        render: (row: CardTypeListDto) => (
          <div className="flex flex-wrap gap-1">
            {row.targetRoleIds.map((roleId) => (
              <Badge key={roleId} label={t(customerRoleConfigs[roleId as CustomerRoleValue].labelKey)} variant="secondary" size="sm" />
            ))}
          </div>
        ),
      },
      {
        key: "isActive",
        header: t("cardTypes.isActive"),
        sortable: true,
        width: "100px",
        render: (row: CardTypeListDto) => (
          <Badge label={row.isActive ? t("common.active") : t("common.inactive")} variant={row.isActive ? "success" : "secondary"} size="sm" />
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        width: "130px",
        render: (row: CardTypeListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "100px",
        render: (row: CardTypeListDto) => (
          <Badge label={row.isDeleted ? t("common.deleted") : t("common.active")} variant={row.isDeleted ? "danger" : "success"} size="sm" />
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CardTypeListDto) => {
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
      onPageChange={onRowReorder ? undefined : onPageChange}
      onPageSizeChange={onRowReorder ? undefined : onPageSizeChange}
      onRowReorder={onRowReorder}
      sortColumn={filterValues.sortBy || "sortOrder"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onRowReorder ? undefined : onSort}
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

export default CardTypesTable;
