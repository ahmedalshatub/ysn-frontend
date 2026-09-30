import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import Avatar from "../../../shared/components/media/Avatar";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import UserModal from "../components/UserModal";
import ResetPasswordModal from "../components/ResetPasswordModal";
import DeleteRestoreAlerts from "../components/DeleteRestoreAlerts";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import { useGetAllUsersQuery } from "../api/Users.api";
import { UserRole } from "../../auth/types/Roles.types";
import type { User, UserRequest } from "../types/Users.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import HomeIcon from "../../../assets/icons/HomeIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LockIcon from "../../../assets/icons/LockIcon";

const initialFilterValues: UserRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  userName: "",
  email: "",
  roleId: undefined,
  isActive: undefined,
  isDeleted: false,
};

const UserRow = ({ user }: { user: User }) => {
  const src = useFileSrc(user.profileImage);
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return (
    <div className="flex items-center gap-3">
      <Avatar src={src || undefined} name={name || user.userName} alt={user.userName} size="sm" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium ce-heading">{name || user.userName}</p>
        <p className="truncate text-xs ce-muted">{user.email}</p>
      </div>
    </div>
  );
};

const Users = () => {
  const { t } = useTranslation();
  useTitle(t("usersPage.pageTitle"));

  const [filterValues, setFilterValues] = useState(initialFilterValues);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogs, setDialogs] = useState({
    addUpdate: false,
    resetPassword: false,
    alert: false,
    isDelete: true,
  });

  const { data, isLoading, isFetching, refetch } = useGetAllUsersQuery(
    {
      ...filterValues,
      userName: filterValues.userName || undefined,
      email: filterValues.email || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const loading = isLoading || isFetching;
  const items = useMemo(() => data?.items ?? [], [data]);


  const roleOptions = [
    { value: UserRole.SuperAdmin, name: t("roles.superAdmin") },
    { value: UserRole.Admin, name: t("roles.admin") },
    { value: UserRole.User, name: t("roles.user") },
  ];

  const handleClearFilter = () => {
    setFilterValues({
      ...initialFilterValues,
      pageNumber: 1,
    });
  };

  const handleSearch = () => {
    refetch();
  };

  const handleFilterChange = (name: string, value: unknown) => {
    setFilterValues((prev) => ({ ...prev, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((prev) => ({ ...prev, sortBy: column, isAscending: direction === "asc" }));
  };

  const openEdit = (user: User) => {
    setSelectedId(user.id);
    setDialogs((prev) => ({ ...prev, addUpdate: true }));
  };

  const columns = useMemo(
    () => [
      {
        key: "userName",
        sortable: true,
        header: t("usersPage.pageTitle"),
        minWidth: "220px",
        render: (row: User) => <UserRow user={row} />,
      },
      {
        key: "phone",
        sortable: true,
        header: t("common.phone"),
        render: (row: User) => row.phone || "-",
      },
      {
        key: "roleName",
        sortable: true,
        header: t("profile.role"),
        render: (row: User) => <Badge variant="info">{row.roleName}</Badge>,
      },
      {
        key: "isActive",
        sortable: true,
        header: t("common.status"),
        render: (row: User) =>
          row.isDeleted ? (
            <Badge variant="danger">{t("common.deleted")}</Badge>
          ) : (
            <Badge variant={row.isActive ? "success" : "secondary"}>
              {row.isActive ? t("common.active") : t("common.inactive")}
            </Badge>
          ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        render: (row: User) =>
          row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-GB") : "-",
      },
      {
        key: "actions",
        header: t("common.actions"),
        width: "90px",
        align: "center" as const,
        render: (row: User) => (
          <TableActionDropdown
            size="sm"
            actions={
              row.isDeleted
                ? [
                    {
                      label: t("common.restore"),
                      icon: <Undo2Icon className="h-4 w-4" />,
                      onClick: () => {
                        setSelectedId(row.id);
                        setDialogs((prev) => ({ ...prev, alert: true, isDelete: false }));
                      },
                    },
                  ]
                : [
                    {
                      label: t("common.edit"),
                      icon: <EditIcon className="h-4 w-4" />,
                      onClick: () => openEdit(row),
                    },
                    {
                      label: t("usersPage.resetPassword"),
                      icon: <LockIcon className="h-4 w-4" />,
                      onClick: () => {
                        setSelectedUser(row);
                        setDialogs((prev) => ({ ...prev, resetPassword: true }));
                      },
                    },
                    {
                      label: t("common.delete"),
                      icon: <TrashIcon className="h-4 w-4" />,
                      variant: "danger" as const,
                      onClick: () => {
                        setSelectedId(row.id);
                        setDialogs((prev) => ({ ...prev, alert: true, isDelete: true }));
                      },
                    },
                  ]
            }
          />
        ),
      },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("usersPage.pageTitle")}
        subtitle={t("usersPage.subtitle")}
        items={[{ label: t("sidebar.homePage"), icon: <HomeIcon /> }, { label: t("usersPage.pageTitle") }]}
        variant="gradient"
        icon={<UsersIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("usersPage.addUser")}
            onClick={() => {
              setSelectedId(null);
              setDialogs((prev) => ({ ...prev, addUpdate: true }));
            }}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            className="font-bold"
          />
        }
      />


      <Card variant="elevated" padding="md">
        <FilterAccordion onSearch={handleSearch} onClear={handleClearFilter}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input
              name="userName"
              label={t("profile.userName")}
              value={filterValues.userName || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("usersPage.searchByUserName")}
              size="md"
            />
            <Input
              name="email"
              label={t("common.email")}
              value={filterValues.email || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              size="md"
            />
            <Select
              name="roleId"
              label={t("profile.role")}
              value={filterValues.roleId === undefined ? "" : String(filterValues.roleId)}
              onChange={(value) =>
                handleFilterChange("roleId", value === "" ? undefined : Number(value))
              }
              options={roleOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Select
              name="isDeleted"
              label={t("common.status")}
              value={filterValues.isDeleted === undefined ? "" : String(filterValues.isDeleted)}
              onChange={(value) =>
                handleFilterChange("isDeleted", value === "" ? undefined : value === "true")
              }
              options={getStatusFilterOptions(t)}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
          </div>
        </FilterAccordion>
      </Card>

      <Card variant="elevated" padding="md">
        <DataTable
          title={t("usersPage.pageTitle")}
          columns={columns}
          data={items}
          rowKey={(row) => row.id}
          loading={loading}
          emptyMessage={t("common.noData")}
          currentPage={filterValues.pageNumber || 1}
          pageSize={filterValues.pageSize || 25}
          totalItems={data?.totalCount || 0}
          onPageChange={(page) => setFilterValues((prev) => ({ ...prev, pageNumber: page }))}
          onPageSizeChange={(size) =>
            setFilterValues((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }))
          }
          sortColumn={filterValues.sortBy || "id"}
          sortDirection={filterValues.isAscending ? "asc" : "desc"}
          onSort={handleSort}
          pageSizeOptions={[
            { label: "10", value: 10 },
            { label: "25", value: 25 },
            { label: "50", value: 50 },
            { label: "100", value: 100 },
          ]}
          hoverable
          striped
          borderless
        />
      </Card>

      {dialogs.addUpdate && (
        <UserModal
          open={dialogs.addUpdate}
          userId={selectedId}
          onClose={() => setDialogs((prev) => ({ ...prev, addUpdate: false }))}
          onSuccess={refetch}
        />
      )}

      <ResetPasswordModal
        open={dialogs.resetPassword}
        user={selectedUser}
        onClose={() => setDialogs((prev) => ({ ...prev, resetPassword: false }))}
      />

      <DeleteRestoreAlerts
        open={dialogs.alert}
        isDelete={dialogs.isDelete}
        userId={selectedId}
        onClose={() => setDialogs((prev) => ({ ...prev, alert: false }))}
        onSuccess={refetch}
      />
    </div>
  );
};

export default Users;
