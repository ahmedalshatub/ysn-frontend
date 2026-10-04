import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import ViewModeSwitch from "../../../shared/components/navigation/ViewModeSwitch";
import Card from "../../../shared/components/cards/Card";
import ListContainer from "../../../shared/components/cards/ListContainer";
import CardGrid from "../../../shared/components/cards/CardGrid";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import { Permission } from "../../../shared/types/Permissions.types";
import { ViewMode, type ViewModeType } from "../../../shared/types/ViewMode.types";
import useViewMode from "../../../shared/hooks/useViewMode";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { useExportUsersMutation, useGetAllUsersQuery } from "../api/Users.api";
import useUserActions from "../hooks/useUserActions";
import UserFilters from "../components/UserFilters";
import UsersTable from "../components/UsersTable";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import ChangeUserStatusAlert from "../components/ChangeUserStatusAlert";
import ResetUserPasswordAlert from "../components/ResetUserPasswordAlert";
import DeleteUserAlert from "../components/DeleteUserAlert";
import RestoreUserAlert from "../components/RestoreUserAlert";
import type { UserFilter, UserListDto, UserRequest } from "../types/Users.types";
import SortControl from "../../../shared/components/navigation/SortControl";
import PageSizeSelect from "../../../shared/components/navigation/PageSizeSelect";

const CARD_PAGE_SIZE = 24;
const TABLE_PAGE_SIZE = 25;

const initialFilterValues: UserRequest = {
  pageSize: CARD_PAGE_SIZE,
  pageNumber: 1,
  sortBy: "firstName",
  isAscending: true,
  name: "",
  email: "",
  phoneNumber: "",
  roleId: undefined,
  cityId: undefined,
  hasAllCities: undefined,
  isActive: undefined,
  isDeleted: false,
  fromDate: undefined,
  toDate: undefined,
  lastLoginFrom: undefined,
  lastLoginTo: undefined,
};

type DialogName = "form" | "status" | "resetPassword" | "delete" | "restore";

const toQueryFilter = (values: UserRequest): UserFilter => ({
  name: values.name || undefined,
  email: values.email || undefined,
  phoneNumber: values.phoneNumber || undefined,
  roleId: values.roleId,
  cityId: values.cityId,
  hasAllCities: values.hasAllCities,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
  lastLoginFrom: values.lastLoginFrom,
  lastLoginTo: values.lastLoginTo,
});

const UsersPage = () => {
  const { t } = useTranslation();
  const sortOptions = [
    { value: "firstName", label: t("users.name") },
    { value: "email", label: t("users.email") },
    { value: "roleName", label: t("users.role") },
    { value: "lastLoginAt", label: t("users.lastLogin") },
    { value: "createdAt", label: t("common.createdAt") },
  ];
  useTitle(t("users.pageTitle"));
  const { can } = usePermission();

  const [viewMode, setViewMode] = useViewMode("users");
  const [filterValues, setFilterValues] = useState<UserRequest>(() => ({
    ...initialFilterValues,
    pageSize: viewMode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE,
  }));
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserListDto | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetAllUsersQuery(
    {
      ...toQueryFilter(filterValues),
      pageSize: filterValues.pageSize,
      pageNumber: filterValues.pageNumber,
      sortBy: filterValues.sortBy,
      isAscending: filterValues.isAscending,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [exportUsers, { isLoading: isExporting }] = useExportUsersMutation();

  const handleFilterChange = (name: keyof UserRequest, value: unknown) => {
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }));
  };

  const handleViewModeChange = (mode: ViewModeType) => {
    setViewMode(mode);
    setFilterValues((previous) => ({
      ...previous,
      pageNumber: 1,
      pageSize: mode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE,
    }));
  };

  const openDialog = useCallback((name: DialogName, user?: UserListDto) => {
    setSelectedUser(user ?? null);
    setDialog(name);
  }, []);

  const closeDialog = () => {
    setDialog(null);
    setSelectedUser(null);
  };

  const handlers = useMemo(
    () => ({
      onEdit: (user: UserListDto) => openDialog("form", user),
      onChangeStatus: (user: UserListDto) => openDialog("status", user),
      onResetPassword: (user: UserListDto) => openDialog("resetPassword", user),
      onDelete: (user: UserListDto) => openDialog("delete", user),
      onRestore: (user: UserListDto) => openDialog("restore", user),
    }),
    [openDialog]
  );
  const getActions = useUserActions(handlers);

  const items = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const loading = isLoading || isFetching;

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("users.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.administration") }, { label: t("users.pageTitle") }]}
        variant="gradient"
        icon={<UsersIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.UsersExport) && (
              <ExportButton loading={isExporting} onExport={() => exportUsers(toQueryFilter(filterValues)).unwrap()} />
            )}
            {can(Permission.UsersCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("users.addUser")}
                onClick={() => openDialog("form")}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <UserFilters
          values={filterValues}
          onChange={handleFilterChange}
          onSearch={refetch}
          onClear={() =>
            setFilterValues({
              ...initialFilterValues,
              pageSize: viewMode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE,
            })
          }
        />
      </Card>

      <ListContainer plain={viewMode === ViewMode.Cards}>
        <div className="mb-4 flex justify-end">
          <div className="flex flex-wrap items-center gap-2">
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
            rowKey={(user) => user.id}
            renderItem={(user) => <UserCard user={user} actions={getActions(user)} />}
          />
        ) : (
          <UsersTable
            items={items}
            totalCount={totalCount}
            loading={loading}
            filterValues={filterValues}
            onPageChange={(page) => setFilterValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setFilterValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={handleSort}
            getActions={getActions}
          />
        )}
      </ListContainer>

      {dialog === "form" && (
        <UserModal open userId={selectedUser?.id ?? null} onClose={closeDialog} onSuccess={refetch} />
      )}
      {dialog === "status" && <ChangeUserStatusAlert open user={selectedUser} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "resetPassword" && (
        <ResetUserPasswordAlert open user={selectedUser} onClose={closeDialog} onSuccess={refetch} />
      )}
      {dialog === "delete" && <DeleteUserAlert open user={selectedUser} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "restore" && <RestoreUserAlert open user={selectedUser} onClose={closeDialog} onSuccess={refetch} />}
    </div>
  );
};

export default UsersPage;
