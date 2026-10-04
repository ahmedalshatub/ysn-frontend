import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import { useExportCardsMutation, useGetCardsQuery, useLazyGetCardsCountQuery } from "../api/Cards.api";
import CardFilters from "./CardFilters";
import CardStatsCards from "./CardStatsCards";
import CardsTable from "./CardsTable";
import CardsSelectionBar from "./CardsSelectionBar";
import AddCardsModal from "./AddCardsModal";
import CardModal from "./CardModal";
import ChangeCardStatusAlert from "./ChangeCardStatusAlert";
import DeleteCardAlert from "./DeleteCardAlert";
import RestoreCardAlert from "./RestoreCardAlert";
import BulkCardActionModal from "./BulkCardActionModal";
import SelectCardsByTypeModal from "./SelectCardsByTypeModal";
import type { BulkCardActionValue, CardFilter, CardListDto, CardRequest, CardSelection } from "../types/Cards.types";
import PageActions from "../../../shared/components/navigation/PageActions";
import ListContainer from "../../../shared/components/cards/ListContainer";

interface CardsViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  fixedFilter?: CardFilter;
  initialFilter?: CardFilter;
}

type DialogName = "add" | "edit" | "status" | "delete" | "restore" | "bulk" | "byType" | "byCategory";

const initialValues: CardRequest = { pageNumber: 1, pageSize: 25, sortBy: "createdAt", isAscending: false, isDeleted: false };

const toQueryFilter = (values: CardRequest, fixedFilter?: CardFilter): CardFilter => ({
  serialNumber: values.serialNumber || undefined,
  cardTypeId: values.cardTypeId,
  cardCategoryId: values.cardCategoryId,
  status: values.status,
  source: values.source,
  importBatchId: values.importBatchId,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
  ...fixedFilter,
});

const CardsView = ({ framed, actionsTarget, fixedFilter, initialFilter }: CardsViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<CardRequest>(() => ({ ...initialValues, ...initialFilter }));
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selected, setSelected] = useState<CardListDto | null>(null);
  const [bulkAction, setBulkAction] = useState<BulkCardActionValue | null>(null);
  const [selection, setSelection] = useState<CardSelection>({ mode: "ids", ids: new Set() });
  const [refreshKey, setRefreshKey] = useState(0);
  const [countCards] = useLazyGetCardsCountQuery();

  const queryFilter = toQueryFilter(values, fixedFilter);
  const { data, isLoading, isFetching, refetch } = useGetCardsQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportCards, { isLoading: isExporting }] = useExportCardsMutation();
  const canBulk = can(Permission.CardsUpdate) || can(Permission.CardsChangeStatus) || can(Permission.CardsDelete);
  const selectedCount = selection.mode === "ids" ? selection.ids.size : selection.count;

  const reload = () => {
    refetch();
    setRefreshKey((key) => key + 1);
    setSelection({ mode: "ids", ids: new Set() });
  };
  const open = useCallback((name: DialogName, card: CardListDto | null) => {
    setSelected(card);
    setDialog(name);
  }, []);
  const close = () => {
    setDialog(null);
    setSelected(null);
  };

  const selectByFilter = async (filter: CardFilter) => {
    const count = await countCards(filter).unwrap();
    setSelection({ mode: "filter", filter, count });
  };

  const getActions = useCallback(
    (card: CardListDto): ActionItem[] => {
      if (card.isTaken) return [];
      if (card.isDeleted)
        return can(Permission.CardsRestore) ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => open("restore", card) }] : [];

      return [
        ...(can(Permission.CardsUpdate) ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => open("edit", card) }] : []),
        ...(can(Permission.CardsChangeStatus)
          ? [{ label: card.isDisabled ? t("cards.enable") : t("cards.disable"), icon: <RefreshCwIcon />, onClick: () => open("status", card) }]
          : []),
        ...(can(Permission.CardsDelete)
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => open("delete", card) }]
          : []),
      ];
    },
    [t, can, open]
  );

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <CardFilters
          values={values}
          fixedFilter={fixedFilter}
          onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
          onSearch={reload}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("cards.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
            {can(Permission.CardsExport) && <ExportButton loading={isExporting} onExport={() => exportCards(queryFilter).unwrap()} />}
            {can(Permission.CardsCreate) && fixedFilter?.takenBy === undefined && (
              <Button
                variant="dark"
                size="md"
                label={t("cards.addCards")}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => open("add", null)}
              />
            )}
            </PageActions>
          </div>
        </div>
        {canBulk && (
          <CardsSelectionBar
            selectedCount={selectedCount}
            totalCount={data?.totalCount ?? 0}
            allSelected={selection.mode === "filter"}
            onSelectAll={() => selectByFilter(queryFilter)}
            onSelectByType={() => open("byType", null)}
            onSelectByCategory={() => open("byCategory", null)}
            onClear={() => setSelection({ mode: "ids", ids: new Set() })}
            onAction={(action) => {
              setBulkAction(action);
              open("bulk", null);
            }}
          />
        )}
        <CardsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={values}
          selectable={canBulk && selection.mode === "ids"}
          selectedRows={selection.mode === "ids" ? selection.ids : new Set()}
          onSelectionChange={(ids) => setSelection({ mode: "ids", ids })}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
          getActions={getActions}
        />
      </ListContainer>
      <CardStatsCards filter={queryFilter} refreshKey={refreshKey} />

      {dialog === "add" && <AddCardsModal open fixedFilter={fixedFilter} onClose={close} onSuccess={reload} />}
      {dialog === "edit" && selected && <CardModal open card={selected} onClose={close} onSuccess={reload} />}
      {dialog === "status" && selected && <ChangeCardStatusAlert open card={selected} onClose={close} onSuccess={reload} />}
      {dialog === "delete" && selected && <DeleteCardAlert open card={selected} onClose={close} onSuccess={reload} />}
      {dialog === "restore" && selected && <RestoreCardAlert open card={selected} onClose={close} onSuccess={reload} />}
      {dialog === "bulk" && bulkAction && (
        <BulkCardActionModal open action={bulkAction} selection={selection} selectedCount={selectedCount} onClose={close} onSuccess={reload} />
      )}
      {(dialog === "byType" || dialog === "byCategory") && (
        <SelectCardsByTypeModal
          open
          byCategory={dialog === "byCategory"}
          onClose={close}
          onSelect={(filter) => selectByFilter({ ...filter, isDeleted: false })}
        />
      )}
    </div>
  );
};

export default CardsView;
