import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { useExportCitiesMutation, useGetCitiesQuery, useLazyGetCitiesQuery, useReorderCitiesMutation } from "../api/Cities.api";
import CityFilters from "../components/CityFilters";
import CitiesTable from "../components/CitiesTable";
import CityModal from "../components/CityModal";
import DeleteCityAlert from "../components/DeleteCityAlert";
import RestoreCityAlert from "../components/RestoreCityAlert";
import type { CityFilter, CityListDto, CityRequest } from "../types/Cities.types";
import useOrderMode from "../../../shared/hooks/useOrderMode";
import SortableCardGrid from "../../../shared/components/cards/SortableCardGrid";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import CheckIcon from "../../../assets/icons/CheckIcon";
import XIcon from "../../../assets/icons/XIcon";
import ArrowUpDownIcon from "../../../assets/icons/ArrowUpDownIcon";
import CityOrderCard from "../components/CityOrderCard";
import CityEPaymentAlert from "../components/CityEPaymentAlert";
import AllCitiesEPaymentAlert from "../components/AllCitiesEPaymentAlert";
import PermanentDeleteCityModal from "../components/PermanentDeleteCityModal";
import WalletIcon from "../../../assets/icons/WalletIcon";

const initialFilterValues: CityRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "sortOrder",
  isAscending: true,
  name: "",
  isActive: undefined,
  isDeleted: false,
  fromDate: undefined,
  toDate: undefined,
};

type DialogName = "form" | "delete" | "restore" | "ePayment" | "ePaymentAllOn" | "ePaymentAllOff" | "permanentDelete";

const toQueryFilter = (values: CityRequest): CityFilter => ({
  name: values.name || undefined,
  hasTvSmsApi: values.hasTvSmsApi,
  ePaymentEnabled: values.ePaymentEnabled,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const CitiesPage = () => {
  const { t } = useTranslation();
  useTitle(t("cities.pageTitle"));
  const { can } = usePermission();

  const [filterValues, setFilterValues] = useState<CityRequest>(initialFilterValues);
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityListDto | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetCitiesQuery(
    {
      ...toQueryFilter(filterValues),
      pageSize: filterValues.pageSize,
      pageNumber: filterValues.pageNumber,
      sortBy: filterValues.sortBy,
      isAscending: filterValues.isAscending,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [exportCities, { isLoading: isExporting }] = useExportCitiesMutation();
  const order = useOrderMode<CityListDto>();
  const [loadOrder, { isFetching: loadingOrder }] = useLazyGetCitiesQuery();
  const [saveOrder, { isLoading: savingOrder }] = useReorderCitiesMutation();

  const startOrdering = async () => {
    try {
      const result = await loadOrder({ isDeleted: false, sortBy: "sortOrder", isAscending: true, pageNumber: 1, pageSize: 100 }).unwrap();
      order.start(result.items);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const submitOrder = async () => {
    try {
      await saveOrder({ ids: order.items.map((item) => item.id) }).unwrap();
      showSuccess(t("cities.successReorder"));
      order.stop();
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleFilterChange = (name: keyof CityRequest, value: unknown) => {
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }));
  };

  const openDialog = useCallback((name: DialogName, city?: CityListDto) => {
    setSelectedId(city?.id ?? null);
    setSelectedCity(city ?? null);
    setDialog(name);
  }, []);

  const closeDialog = () => {
    setDialog(null);
    setSelectedId(null);
    setSelectedCity(null);
  };

  const handleEdit = useCallback((city: CityListDto) => openDialog("form", city), [openDialog]);
  const handleDelete = useCallback((city: CityListDto) => openDialog("delete", city), [openDialog]);
  const handleRestore = useCallback((city: CityListDto) => openDialog("restore", city), [openDialog]);
  const handleEPayment = useCallback((city: CityListDto) => openDialog("ePayment", city), [openDialog]);
  const handlePermanentDelete = useCallback((city: CityListDto) => openDialog("permanentDelete", city), [openDialog]);

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("cities.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.settings") }, { label: t("cities.pageTitle") }]}
        variant="gradient"
        icon={<MapPinIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.CitiesUpdate) && !order.ordering && (
              <Button
                variant="light"
                size="md"
                label={t("common.order")}
                onClick={startOrdering}
                icon={<ArrowUpDownIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
            {can(Permission.CitiesManageEPayment) && !order.ordering && (
              <>
                <Button
                  variant="light"
                  size="md"
                  label={t("cities.ePaymentOnForAll")}
                  onClick={() => openDialog("ePaymentAllOn")}
                  icon={<WalletIcon className="h-4 w-4" />}
                  iconPosition="left"
                />
                <Button
                  variant="light"
                  size="md"
                  label={t("cities.ePaymentOffForAll")}
                  onClick={() => openDialog("ePaymentAllOff")}
                  icon={<WalletIcon className="h-4 w-4" />}
                  iconPosition="left"
                />
              </>
            )}
            {can(Permission.CitiesExport) && (
              <ExportButton loading={isExporting} onExport={() => exportCities(toQueryFilter(filterValues)).unwrap()} />
            )}
            {can(Permission.CitiesCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("cities.addCity")}
                onClick={() => openDialog("form")}
                icon={<PlusIcon className="w-4 h-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <CityFilters
          values={filterValues}
          onChange={handleFilterChange}
          onSearch={refetch}
          onClear={() => setFilterValues(initialFilterValues)}
        />
      </Card>

      {order.ordering ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="list-header-title">{t("cities.pageTitle")}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm ce-muted">{t("common.dragToReorder")}</span>
              <Button variant="secondary" outline size="md" label={t("common.cancel")} icon={<XIcon className="h-4 w-4" />} iconPosition="left" onClick={order.stop} />
              <Button variant="primary" size="md" label={t("common.saveOrder")} icon={<CheckIcon className="h-4 w-4" />} iconPosition="left" loading={savingOrder} onClick={submitOrder} />
            </div>
          </div>
          <SortableCardGrid items={order.items} loading={loadingOrder} rowKey={(city) => city.id} renderItem={(city) => <CityOrderCard city={city} />} onMove={order.move} />
        </div>
      ) : (
        <Card variant="elevated" padding="md">
          <CitiesTable
            items={data?.items || []}
            totalCount={data?.totalCount || 0}
            loading={isLoading || isFetching}
            filterValues={filterValues}
            onPageChange={(page) => setFilterValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setFilterValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onEPayment={handleEPayment}
            onPermanentDelete={handlePermanentDelete}
          />
        </Card>
      )}

      {dialog === "form" && <CityModal open onClose={closeDialog} onSuccess={refetch} cityId={selectedId} />}
      {dialog === "delete" && <DeleteCityAlert open onClose={closeDialog} onSuccess={refetch} cityId={selectedId} />}
      {dialog === "restore" && <RestoreCityAlert open onClose={closeDialog} onSuccess={refetch} cityId={selectedId} />}
      {dialog === "ePayment" && <CityEPaymentAlert open onClose={closeDialog} onSuccess={refetch} city={selectedCity} />}
      {dialog === "ePaymentAllOn" && <AllCitiesEPaymentAlert open enabled onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "ePaymentAllOff" && <AllCitiesEPaymentAlert open enabled={false} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "permanentDelete" && selectedCity && (
        <PermanentDeleteCityModal open onClose={closeDialog} onSuccess={refetch} city={selectedCity} />
      )}
    </div>
  );
};

export default CitiesPage;
