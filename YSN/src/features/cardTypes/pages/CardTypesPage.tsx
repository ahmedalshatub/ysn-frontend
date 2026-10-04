import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import useViewMode from "../../../shared/hooks/useViewMode";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import ViewModeSwitch from "../../../shared/components/navigation/ViewModeSwitch";
import Card from "../../../shared/components/cards/Card";
import ListContainer from "../../../shared/components/cards/ListContainer";
import CardGrid from "../../../shared/components/cards/CardGrid";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import { Permission } from "../../../shared/types/Permissions.types";
import { ViewMode, type ViewModeType } from "../../../shared/types/ViewMode.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import PlusIcon from "../../../assets/icons/PlusIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import { useExportCardTypesMutation, useGetCardTypesQuery } from "../api/CardTypes.api";
import CardsModal from "../../cards/components/CardsModal";
import useCardTypeActions, { type CardTypeDialogName } from "../hooks/useCardTypeActions";
import CardTypeFilters from "../components/CardTypeFilters";
import CardTypeCard from "../components/CardTypeCard";
import CardTypesTable from "../components/CardTypesTable";
import CardTypeModal from "../components/CardTypeModal";
import DeleteCardTypeAlert from "../components/DeleteCardTypeAlert";
import RestoreCardTypeAlert from "../components/RestoreCardTypeAlert";
import type { CardTypeFilter, CardTypeListDto, CardTypeRequest } from "../types/CardTypes.types";

const CARD_PAGE_SIZE = 24;
const TABLE_PAGE_SIZE = 25;

const toQueryFilter = (values: CardTypeRequest): CardTypeFilter => ({
  name: values.name || undefined,
  cardCategoryId: values.cardCategoryId,
  cityId: values.cityId,
  kind: values.kind,
  targetRoleId: values.targetRoleId,
  durationMonthsFrom: values.durationMonthsFrom,
  durationMonthsTo: values.durationMonthsTo,
  agentPriceFrom: values.agentPriceFrom,
  agentPriceTo: values.agentPriceTo,
  clientPriceFrom: values.clientPriceFrom,
  clientPriceTo: values.clientPriceTo,
  amountFrom: values.amountFrom,
  amountTo: values.amountTo,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const CardTypesPage = () => {
  const { t } = useTranslation();
  useTitle(t("cardTypes.pageTitle"));
  const { can } = usePermission();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("cardCategoryId");

  const [viewMode, setViewMode] = useViewMode("cardTypes");
  const pageSizeFor = (mode: ViewModeType) => (mode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE);
  const emptyFilter = (): CardTypeRequest => ({
    pageNumber: 1,
    pageSize: pageSizeFor(viewMode),
    sortBy: "sortOrder",
    isAscending: true,
    isDeleted: false,
  });
  const [values, setValues] = useState<CardTypeRequest>(() => ({
    ...emptyFilter(),
    cardCategoryId: categoryFromUrl ? Number(categoryFromUrl) : undefined,
  }));
  const [dialog, setDialog] = useState<CardTypeDialogName | null>(null);
  const [selected, setSelected] = useState<CardTypeListDto | null>(null);

  const queryFilter = toQueryFilter(values);
  const { data, isLoading, isFetching, refetch } = useGetCardTypesQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportCardTypes, { isLoading: isExporting }] = useExportCardTypesMutation();

  const openDialog = useCallback((name: CardTypeDialogName, cardType: CardTypeListDto | null) => {
    setSelected(cardType);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };
  const getActions = useCardTypeActions(openDialog);

  const handleViewModeChange = (mode: ViewModeType) => {
    setViewMode(mode);
    setValues((previous) => ({ ...previous, pageNumber: 1, pageSize: pageSizeFor(mode) }));
  };

  const items = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const loading = isLoading || isFetching;

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("cardTypes.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.cards") }, { label: t("cardTypes.pageTitle") }]}
        variant="gradient"
        icon={<PackageIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.CardTypesExport) && (
              <ExportButton loading={isExporting} onExport={() => exportCardTypes(queryFilter).unwrap()} />
            )}
            {can(Permission.CardTypesCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("cardTypes.addCardType")}
                onClick={() => openDialog("form", null)}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <CardTypeFilters
          values={values}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={refetch}
          onClear={() => setValues(emptyFilter())}
        />
      </Card>

      <ListContainer plain={viewMode === ViewMode.Cards}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("cardTypes.pageTitle")} <span className="list-header-count">({totalCount})</span>
          </h3>
          <ViewModeSwitch value={viewMode} onChange={handleViewModeChange} />
        </div>
        {viewMode === ViewMode.Cards ? (
          <CardGrid
            items={items}
            totalCount={totalCount}
            loading={loading}
            pageNumber={values.pageNumber || 1}
            pageSize={values.pageSize || CARD_PAGE_SIZE}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            rowKey={(cardType) => cardType.id}
            renderItem={(cardType) => <CardTypeCard cardType={cardType} actions={getActions(cardType)} />}
          />
        ) : (
          <CardTypesTable
            items={items}
            totalCount={totalCount}
            loading={loading}
            filterValues={values}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={(column: string, direction: SortDirection) =>
              setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
            }
            getActions={getActions}
          />
        )}
      </ListContainer>

      {dialog === "form" && (
        <CardTypeModal
          open
          cardTypeId={selected?.id ?? null}
          defaultCategoryId={values.cardCategoryId}
          onClose={closeDialog}
          onSuccess={refetch}
        />
      )}
      {dialog === "cards" && selected && (
        <CardsModal open title={`${t("cards.pageTitle")} - ${selected.name}`} fixedFilter={{ cardTypeId: selected.id }} onClose={closeDialog} />
      )}
      {dialog === "delete" && selected && <DeleteCardTypeAlert open cardType={selected} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "restore" && selected && <RestoreCardTypeAlert open cardType={selected} onClose={closeDialog} onSuccess={refetch} />}
    </div>
  );
};

export default CardTypesPage;
