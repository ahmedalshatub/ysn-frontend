import PageActions from "../../../shared/components/navigation/PageActions";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import ListContainer from "../../../shared/components/cards/ListContainer";
import CardGrid from "../../../shared/components/cards/CardGrid";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import ViewModeSwitch from "../../../shared/components/navigation/ViewModeSwitch";
import useViewMode from "../../../shared/hooks/useViewMode";
import { ViewMode, type ViewModeType } from "../../../shared/types/ViewMode.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import PlusIcon from "../../../assets/icons/PlusIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import Dropdown from "../../../shared/components/navigation/Dropdown";
import { useExportCustomersMutation, useGetCustomersQuery } from "../api/Customers.api";
import useCustomerActions, { type CustomerDialogName } from "../hooks/useCustomerActions";
import useCustomerPermission from "../hooks/useCustomerPermission";
import CustomerFilters from "./CustomerFilters";
import CustomersTable from "./CustomersTable";
import CustomerCard from "./CustomerCard";
import CustomerDialogs from "./CustomerDialogs";
import AllSubAgentsEPaymentAlert from "./AllSubAgentsEPaymentAlert";
import {
  CustomerRole,
  customerRoleConfigs,
  type CustomerFilter,
  type CustomerListDto,
  type CustomerRequest,
  type CustomerRoleValue,
} from "../types/Customers.types";
import SortControl from "../../../shared/components/navigation/SortControl";
import PageSizeSelect from "../../../shared/components/navigation/PageSizeSelect";

const CARD_PAGE_SIZE = 24;
const TABLE_PAGE_SIZE = 25;

interface CustomersListProps {
  actionsTarget?: HTMLElement | null;
  customerType: CustomerRoleValue;
  viewKey: string;
  fixedFilter?: Partial<CustomerFilter>;
  initialFilter?: Partial<CustomerRequest>;
}

const emptyFilter: CustomerRequest = {
  sortBy: "firstName",
  isAscending: true,
  pageNumber: 1,
  pageSize: CARD_PAGE_SIZE,
  isDeleted: false,
};

const toQueryFilter = (values: CustomerRequest): CustomerFilter => ({
  name: values.name || undefined,
  phoneNumber: values.phoneNumber || undefined,
  countryId: values.countryId,
  email: values.email || undefined,
  cityId: values.cityId,
  parentAgentId: values.parentAgentId,
  parentAgentIsActive: values.parentAgentIsActive,
  registrationApp: values.registrationApp,
  registeredFromApp: values.registeredFromApp,
  isUnlimitedTvs: values.isUnlimitedTvs,
  maxTvCountFrom: values.maxTvCountFrom,
  maxTvCountTo: values.maxTvCountTo,
  balanceFrom: values.balanceFrom,
  balanceTo: values.balanceTo,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
  lastLoginFrom: values.lastLoginFrom,
  lastLoginTo: values.lastLoginTo,
});

const CustomersList = ({ actionsTarget, customerType, viewKey, fixedFilter, initialFilter }: CustomersListProps) => {
  const { t } = useTranslation();
  const sortOptions = [
    { value: "firstName", label: t("customers.name") },
    { value: "cityName", label: t("customers.city") },
    { value: "balance", label: t("customers.balance") },
    { value: "subAgentsCount", label: t("customers.subAgentsCount") },
    { value: "lastLoginAt", label: t("customers.lastLogin") },
    { value: "createdAt", label: t("common.createdAt") },
  ];
  const navigate = useNavigate();
  const canCustomer = useCustomerPermission();
  const config = customerRoleConfigs[customerType];

  const [viewMode, setViewMode] = useViewMode(viewKey);
  const pageSizeFor = (mode: ViewModeType) => (mode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE);
  const [initialValues] = useState<CustomerRequest>(() => ({ ...emptyFilter, ...initialFilter, ...fixedFilter, pageSize: pageSizeFor(viewMode) }));
  const [filterValues, setFilterValues] = useState<CustomerRequest>(initialValues);
  const [dialog, setDialog] = useState<CustomerDialogName | null>(null);
  const [selected, setSelected] = useState<CustomerListDto | null>(null);
  const [allEPayment, setAllEPayment] = useState<boolean | null>(null);

  const queryFilter = { ...toQueryFilter(filterValues), ...fixedFilter, roleId: customerType };
  const { data, isLoading, isFetching, refetch } = useGetCustomersQuery(
    {
      ...queryFilter,
      pageSize: filterValues.pageSize,
      pageNumber: filterValues.pageNumber,
      sortBy: filterValues.sortBy,
      isAscending: filterValues.isAscending,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [exportCustomers, { isLoading: isExporting }] = useExportCustomersMutation();

  const handleFilterChange = (name: keyof CustomerRequest, value: unknown) => {
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }));
  };

  const handleViewModeChange = (mode: ViewModeType) => {
    setViewMode(mode);
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, pageSize: pageSizeFor(mode) }));
  };

  const openDetails = useCallback((customer: CustomerListDto) => navigate(`/customers/${customer.id}`), [navigate]);
  const openDialog = useCallback((name: CustomerDialogName, customer: CustomerListDto | null) => {
    setSelected(customer);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };

  const getActions = useCustomerActions({ onOpen: openDetails, onDialog: openDialog });

  const items = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const loading = isLoading || isFetching;

  return (
    <div className="space-y-6">
      <Card variant="elevated" padding="md">
        <CustomerFilters
          customerType={customerType}
          values={filterValues}
          fixedParentAgent={fixedFilter?.parentAgentId !== undefined}
          onChange={handleFilterChange}
          onSearch={refetch}
          onClear={() => setFilterValues({ ...initialValues, pageSize: pageSizeFor(viewMode) })}
        />
      </Card>

      <ListContainer plain={viewMode === ViewMode.Cards}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t(config.pluralKey)} <span className="list-header-count">({totalCount})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
            {customerType === CustomerRole.SubAgent && canCustomer(customerType, "ManageEPayment") && !fixedFilter && (
              <Dropdown
                placement="bottom-end"
                trigger={
                  <Button
                    variant="light"
                    size="md"
                    label={t("customers.ePayment")}
                    icon={<ChevronDownIcon className="h-4 w-4" />}
                    iconPosition="right"
                  />
                }
                items={[
                  { key: "on", label: t("customers.ePaymentOnForAll"), icon: <WalletIcon /> },
                  { key: "off", label: t("customers.ePaymentOffForAll"), icon: <WalletIcon /> },
                ]}
                onSelect={(key) => setAllEPayment(key === "on")}
              />
            )}
            {canCustomer(customerType, "Export") && (
              <ExportButton
                loading={isExporting}
                onExport={(format) => exportCustomers({ ...queryFilter, format }).unwrap()}
              />
            )}
            {canCustomer(customerType, "Create") && !fixedFilter && (
              <Button
                variant="dark"
                size="md"
                label={t("customers.add", { type: t(config.labelKey) })}
                onClick={() => openDialog("form", null)}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
            </PageActions>
            {viewMode === ViewMode.Cards && (
              <>
                <SortControl
                  options={sortOptions}
                  sortBy={filterValues.sortBy ?? ""}
                  isAscending={!!filterValues.isAscending}
                  onChange={(sortBy, isAscending) => setFilterValues((previous) => ({ ...previous, sortBy, isAscending, pageNumber: 1 }))}
                />
                <PageSizeSelect
                  value={filterValues.pageSize || CARD_PAGE_SIZE}
                  onChange={(size) => setFilterValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
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
            pageNumber={filterValues.pageNumber || 1}
            pageSize={filterValues.pageSize || CARD_PAGE_SIZE}
            onPageChange={(page) => setFilterValues((previous) => ({ ...previous, pageNumber: page }))}
            rowKey={(customer) => customer.id}
            renderItem={(customer) => <CustomerCard customer={customer} actions={getActions(customer)} onOpen={openDetails} />}
          />
        ) : (
          <CustomersTable
            customerType={customerType}
            items={items}
            totalCount={totalCount}
            loading={loading}
            filterValues={filterValues}
            onPageChange={(page) => setFilterValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setFilterValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={handleSort}
            onOpen={openDetails}
            getActions={getActions}
          />
        )}
      </ListContainer>

      <CustomerDialogs
        dialog={dialog}
        customer={selected}
        createType={customerType}
        onClose={closeDialog}
        onSuccess={refetch}
      />
      {allEPayment !== null && (
        <AllSubAgentsEPaymentAlert open enabled={allEPayment} onClose={() => setAllEPayment(null)} onSuccess={refetch} />
      )}
    </div>
  );
};

export default CustomersList;
