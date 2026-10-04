import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import { cardSourceKeys, cardStatusKeys, cardStatusVariants, type CardListDto, type CardRequest } from "../types/Cards.types";

interface CardsTableProps {
  items: CardListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CardRequest;
  selectable: boolean;
  selectedRows: Set<string | number>;
  onSelectionChange: (selected: Set<string | number>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  getActions: (card: CardListDto) => ActionItem[];
}

const CardsTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  selectable,
  selectedRows,
  onSelectionChange,
  onPageChange,
  onPageSizeChange,
  onSort,
  getActions,
}: CardsTableProps) => {
  const { t, i18n } = useTranslation();


  const columns = useMemo(() => {
    const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : "-");
    return [
      {
        key: "id",
        header: t("cards.id"),
        sortable: true,
        width: "80px",
        render: (row: CardListDto) => <span className="font-semibold">#{row.id}</span>,
      },
      {
        key: "serialNumber",
        header: t("cards.serialNumber"),
        sortable: true,
        render: (row: CardListDto) => <span className="font-mono">{row.serialNumber}</span>,
      },
      {
        key: "cardTypeName",
        header: t("cards.cardType"),
        render: (row: CardListDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.cardTypeName}</span>
            <span className="text-xs">{row.cardCategoryName} - {row.cityName}</span>
          </div>
        ),
      },
      {
        key: "status",
        header: t("cards.status"),
        width: "130px",
        render: (row: CardListDto) => (
          <div className="flex flex-col gap-1">
            <Badge label={t(cardStatusKeys[row.status])} variant={cardStatusVariants[row.status]} size="sm" />
            {row.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
          </div>
        ),
      },
      {
        key: "takenByName",
        header: t("cards.takenBy"),
        render: (row: CardListDto) =>
          row.isTaken ? (
            <div className="flex flex-col gap-1">
              <span>{row.takenByName}</span>
              <span className="text-xs">{date(row.takenAt)}</span>
            </div>
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "source",
        header: t("cards.source"),
        width: "110px",
        render: (row: CardListDto) => <span>{t(cardSourceKeys[row.source])}</span>,
      },
      {
        key: "createdAt",
        header: t("cards.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: CardListDto) => (
          <div className="flex flex-col gap-1">
            <span>{date(row.createdAt)}</span>
            {row.creator && <span className="text-xs">{row.creator}</span>}
          </div>
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CardListDto) => {
          const actions = getActions(row);
          if (actions.length === 0) return null;
          return (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          );
        },
      },
    ];
  }, [t, i18n.language, getActions]);

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("cards.noCards")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      selectable={selectable}
      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}
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

export default CardsTable;
