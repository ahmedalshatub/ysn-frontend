import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import LayersIcon from "../../../assets/icons/LayersIcon";
import { useExportCardCategoriesMutation, useGetCardCategoriesQuery } from "../api/CardCategories.api";
import useCardCategoryActions, { type CardCategoryDialogName } from "../hooks/useCardCategoryActions";
import CardCategoryFilters from "../components/CardCategoryFilters";
import CardCategoryCard from "../components/CardCategoryCard";
import CardCategoriesTable from "../components/CardCategoriesTable";
import CardCategoryModal from "../components/CardCategoryModal";
import CardsModal from "../../cards/components/CardsModal";
import DeleteCardCategoryAlert from "../components/DeleteCardCategoryAlert";
import RestoreCardCategoryAlert from "../components/RestoreCardCategoryAlert";
import type { CardCategoryFilter, CardCategoryListDto, CardCategoryRequest } from "../types/CardCategories.types";
import SortControl from "../../../shared/components/navigation/SortControl";
import PageSizeSelect from "../../../shared/components/navigation/PageSizeSelect";

const CARD_PAGE_SIZE = 24;
const TABLE_PAGE_SIZE = 25;

const emptyFilter: CardCategoryRequest = {
  pageNumber: 1,
  pageSize: CARD_PAGE_SIZE,
  sortBy: "sortOrder",
  isAscending: true,
  isDeleted: false,
};

const toQueryFilter = (values: CardCategoryRequest): CardCategoryFilter => ({
  name: values.name || undefined,
  cityId: values.cityId,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const CardCategoriesPage = () => {
  const { t } = useTranslation();
  const sortOptions = [
    { value: "name", label: t("cardCategories.name") },
    { value: "cityName", label: t("cardCategories.city") },
    { value: "cardTypesCount", label: t("cardCategories.cardTypes") },
    { value: "sortOrder", label: t("cardCategories.sortOrder") },
    { value: "createdAt", label: t("common.createdAt") },
  ];
  useTitle(t("cardCategories.pageTitle"));
  const navigate = useNavigate();
  const { can } = usePermission();

  const [viewMode, setViewMode] = useViewMode("cardCategories");
  const pageSizeFor = (mode: ViewModeType) => (mode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE);
  const [values, setValues] = useState<CardCategoryRequest>(() => ({ ...emptyFilter, pageSize: pageSizeFor(viewMode) }));
  const [dialog, setDialog] = useState<CardCategoryDialogName | null>(null);
  const [selected, setSelected] = useState<CardCategoryListDto | null>(null);

  const queryFilter = toQueryFilter(values);
  const { data, isLoading, isFetching, refetch } = useGetCardCategoriesQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportCategories, { isLoading: isExporting }] = useExportCardCategoriesMutation();

  const openTypes = useCallback(
    (category: CardCategoryListDto) => navigate(`/card-types?cardCategoryId=${category.id}`),
    [navigate]
  );
  const openDialog = useCallback((name: CardCategoryDialogName, category: CardCategoryListDto | null) => {
    setSelected(category);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };
  const handlers = useMemo(() => ({ onOpenTypes: openTypes, onDialog: openDialog }), [openTypes, openDialog]);
  const getActions = useCardCategoryActions(handlers);

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
        title={t("cardCategories.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.cards") }, { label: t("cardCategories.pageTitle") }]}
        variant="gradient"
        icon={<LayersIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.CardCategoriesExport) && (
              <ExportButton loading={isExporting} onExport={() => exportCategories(queryFilter).unwrap()} />
            )}
            {can(Permission.CardCategoriesCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("cardCategories.addCategory")}
                onClick={() => openDialog("form", null)}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <CardCategoryFilters
          values={values}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={refetch}
          onClear={() => setValues({ ...emptyFilter, pageSize: pageSizeFor(viewMode) })}
        />
      </Card>

      <ListContainer plain={viewMode === ViewMode.Cards}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("cardCategories.pageTitle")} <span className="list-header-count">({totalCount})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {viewMode === ViewMode.Cards && (
              <>
                <SortControl
                  options={sortOptions}
                  sortBy={values.sortBy ?? ""}
                  isAscending={!!values.isAscending}
                  onChange={(sortBy, isAscending) => setValues((previous) => ({ ...previous, sortBy, isAscending, pageNumber: 1 }))}
                />
                <PageSizeSelect
                  value={values.pageSize || CARD_PAGE_SIZE}
                  onChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
                />
              </>
            )}
            <ViewModeSwitch value={viewMode} onChange={handleViewModeChange} />
          </div>
        </div>
        {viewMode === ViewMode.Cards ? (
          <CardGrid
            items={items}
            totalCount={totalCount}
            loading={loading}
            pageNumber={values.pageNumber || 1}
            pageSize={values.pageSize || CARD_PAGE_SIZE}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            rowKey={(category) => category.id}
            renderItem={(category) => <CardCategoryCard category={category} actions={getActions(category)} onOpen={openTypes} />}
          />
        ) : (
          <CardCategoriesTable
            items={items}
            totalCount={totalCount}
            loading={loading}
            filterValues={values}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={(column: string, direction: SortDirection) =>
              setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
            }
            onOpen={openTypes}
            getActions={getActions}
          />
        )}
      </ListContainer>

      {dialog === "form" && <CardCategoryModal open categoryId={selected?.id ?? null} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "cards" && selected && (
        <CardsModal open title={`${t("cards.pageTitle")} - ${selected.name}`} fixedFilter={{ cardCategoryId: selected.id }} onClose={closeDialog} />
      )}
      {dialog === "delete" && selected && (
        <DeleteCardCategoryAlert open category={selected} onClose={closeDialog} onSuccess={refetch} />
      )}
      {dialog === "restore" && selected && (
        <RestoreCardCategoryAlert open category={selected} onClose={closeDialog} onSuccess={refetch} />
      )}
    </div>
  );
};

export default CardCategoriesPage;
