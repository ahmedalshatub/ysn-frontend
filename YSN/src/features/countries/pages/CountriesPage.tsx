import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useExportCountriesMutation, useGetCountriesQuery, useSetDefaultCountryMutation, useChangeCountryStatusMutation } from "../api/Countries.api";
import CountryFilters from "../components/CountryFilters";
import CountriesTable from "../components/CountriesTable";
import CountryModal from "../components/CountryModal";
import DeleteCountryAlert from "../components/DeleteCountryAlert";
import RestoreCountryAlert from "../components/RestoreCountryAlert";
import type { CountryFilter, CountryListDto, CountryRequest } from "../types/Countries.types";

const initialFilterValues: CountryRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "name",
  isAscending: true,
  name: "",
  isoCode: "",
  phoneCode: "",
  isActive: undefined,
  isDefault: undefined,
  isDeleted: false,
  fromDate: undefined,
  toDate: undefined,
};

type DialogName = "form" | "delete" | "restore";

const toQueryFilter = (values: CountryRequest): CountryFilter => ({
  name: values.name || undefined,
  isoCode: values.isoCode || undefined,
  phoneCode: values.phoneCode || undefined,
  isActive: values.isActive,
  isDefault: values.isDefault,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const CountriesPage = () => {
  const { t } = useTranslation();
  useTitle(t("countries.pageTitle"));
  const { can } = usePermission();

  const [filterValues, setFilterValues] = useState<CountryRequest>(initialFilterValues);
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [setDefaultCountry] = useSetDefaultCountryMutation();
  const [changeCountryStatus] = useChangeCountryStatusMutation();
  const { data, isLoading, isFetching, refetch } = useGetCountriesQuery(
    {
      ...toQueryFilter(filterValues),
      pageSize: filterValues.pageSize,
      pageNumber: filterValues.pageNumber,
      sortBy: filterValues.sortBy,
      isAscending: filterValues.isAscending,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [exportCountries, { isLoading: isExporting }] = useExportCountriesMutation();

  const handleFilterChange = (name: keyof CountryRequest, value: unknown) => {
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }));
  };

  const openDialog = useCallback((name: DialogName, country?: CountryListDto) => {
    setSelectedId(country?.id ?? null);
    setDialog(name);
  }, []);

  const closeDialog = () => {
    setDialog(null);
    setSelectedId(null);
  };

  const handleSetDefault = async (country: CountryListDto) => {
    try {
      await setDefaultCountry(country.id).unwrap();
      showSuccess(t("countries.successDefault"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleToggleStatus = async (country: CountryListDto) => {
    try {
      await changeCountryStatus({ id: country.id, isActive: !country.isActive }).unwrap();
      showSuccess(t("countries.successStatus"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleEdit = useCallback((country: CountryListDto) => openDialog("form", country), [openDialog]);
  const handleDelete = useCallback((country: CountryListDto) => openDialog("delete", country), [openDialog]);
  const handleRestore = useCallback((country: CountryListDto) => openDialog("restore", country), [openDialog]);

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("countries.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.settings") }, { label: t("countries.pageTitle") }]}
        variant="gradient"
        icon={<GlobeIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.CountriesExport) && (
              <ExportButton
                loading={isExporting}
                onExport={(format) => exportCountries({ ...toQueryFilter(filterValues), format }).unwrap()}
              />
            )}
            {can(Permission.CountriesCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("countries.addCountry")}
                onClick={() => openDialog("form")}
                icon={<PlusIcon className="w-4 h-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <CountryFilters
          values={filterValues}
          onChange={handleFilterChange}
          onSearch={refetch}
          onClear={() => setFilterValues(initialFilterValues)}
        />
      </Card>

      <Card variant="elevated" padding="md">
        <CountriesTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={filterValues}
          onPageChange={(page) => setFilterValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setFilterValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={handleSort}
          onEdit={handleEdit}
          onSetDefault={handleSetDefault}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      </Card>

      {dialog === "form" && (
        <CountryModal open onClose={closeDialog} onSuccess={refetch} countryId={selectedId} />
      )}
      {dialog === "delete" && (
        <DeleteCountryAlert open onClose={closeDialog} onSuccess={refetch} countryId={selectedId} />
      )}
      {dialog === "restore" && (
        <RestoreCountryAlert open onClose={closeDialog} onSuccess={refetch} countryId={selectedId} />
      )}
    </div>
  );
};

export default CountriesPage;
