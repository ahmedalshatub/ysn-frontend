import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { useExportRolesMutation, useGetRolesQuery } from "../api/Roles.api";
import RoleFilters from "../components/RoleFilters";
import RolesTable from "../components/RolesTable";
import DeleteRoleAlert from "../components/DeleteRoleAlert";
import RestoreRoleAlert from "../components/RestoreRoleAlert";
import type { RoleFilter, RoleListDto, RoleRequest } from "../types/Roles.types";

const initialFilterValues: RoleRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "name",
  isAscending: true,
  name: "",
  permissionId: undefined,
  isActive: undefined,
  isDeleted: false,
  fromDate: undefined,
  toDate: undefined,
};

type DialogName = "delete" | "restore";

const toQueryFilter = (values: RoleRequest): RoleFilter => ({
  name: values.name || undefined,
  permissionId: values.permissionId,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const RolesPage = () => {
  const { t } = useTranslation();
  useTitle(t("roles.pageTitle"));
  const { can } = usePermission();
  const navigate = useNavigate();

  const [filterValues, setFilterValues] = useState<RoleRequest>(initialFilterValues);
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleListDto | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetRolesQuery(
    {
      ...toQueryFilter(filterValues),
      pageSize: filterValues.pageSize,
      pageNumber: filterValues.pageNumber,
      sortBy: filterValues.sortBy,
      isAscending: filterValues.isAscending,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [exportRoles, { isLoading: isExporting }] = useExportRolesMutation();

  const handleFilterChange = (name: keyof RoleRequest, value: unknown) => {
    setFilterValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }));
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }));
  };

  const openDialog = useCallback((name: DialogName, role: RoleListDto) => {
    setSelectedRole(role);
    setDialog(name);
  }, []);

  const closeDialog = () => {
    setDialog(null);
    setSelectedRole(null);
  };

  const handleEdit = useCallback((role: RoleListDto) => navigate(`/roles/${role.id}`), [navigate]);
  const handleDelete = useCallback((role: RoleListDto) => openDialog("delete", role), [openDialog]);
  const handleRestore = useCallback((role: RoleListDto) => openDialog("restore", role), [openDialog]);

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("roles.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.administration") }, { label: t("roles.pageTitle") }]}
        variant="gradient"
        icon={<ShieldIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.RolesExport) && (
              <ExportButton loading={isExporting} onExport={(format) => exportRoles({ ...toQueryFilter(filterValues), format }).unwrap()} />
            )}
            {can(Permission.RolesCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("roles.addRole")}
                onClick={() => navigate("/roles/new")}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <RoleFilters
          values={filterValues}
          onChange={handleFilterChange}
          onSearch={refetch}
          onClear={() => setFilterValues(initialFilterValues)}
        />
      </Card>

      <Card variant="elevated" padding="md">
        <RolesTable
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
        />
      </Card>

      {dialog === "delete" && <DeleteRoleAlert open role={selectedRole} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "restore" && <RestoreRoleAlert open role={selectedRole} onClose={closeDialog} onSuccess={refetch} />}
    </div>
  );
};

export default RolesPage;
