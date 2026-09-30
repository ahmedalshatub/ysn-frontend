import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../../shared/components/cards/Card";
import DataTable from "../../../../shared/components/table/DataTable";
import type { Column } from "../../../../shared/components/table/DataTable";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import Button from "../../../../shared/components/buttons/Button";
import TableActionDropdown from "../../../../shared/components/table/TableActionDropdown";
import Badge from "../../../../shared/components/badges/Badge";
import { getStatusFilterOptions } from "../../../../shared/utils/constants";
import CategoryModal from "../../components/example1/CategoryModal";
import DeleteRestoreAlerts from "../../components/example1/DeleteRestoreAlerts";
import { useGetAllCategoriesQuery } from "../../api/Categories.api";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import type { CategoryDto, CategoryRequest } from "../../types/Categories.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import FolderIcon from "../../../../assets/icons/FolderIcon";
import EditIcon from "../../../../assets/icons/EditIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../../assets/icons/Undo2Icon";
import FileImage from "../../../../shared/components/media/FileImage";

const initialFilterValues: CategoryRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  name: "",
  isDeleted: false,
  createdBy: undefined,
};

const CategoriesExample1 = () => {
  const { t } = useTranslation();
  useTitle(t("categoriesExample1.pageTitle"));

  const [filterValues, setFilterValues] = useState(initialFilterValues);

  const { data: usersData } = useGetAllUsersQuery(
    { sortBy: "userName", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const creatorOptions = (usersData?.items ?? []).map((user) => ({
    value: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.userName,
  }));

  const [dialogs, setDialogs] = useState({
    addUpdateModal: false,
    alert: false,
    alertType: true,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetAllCategoriesQuery(
    {
      ...filterValues,
      name: filterValues.name || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      pageNumber: 1,
      [name]: name === "isDeleted" 
        ? (String(value) === "" ? undefined : String(value) === "true")
        : value,
    }));
  };

  const handleClearFilter = () => {
    setFilterValues({
      ...initialFilterValues,
      pageNumber: 1,
    });
  };

  const handleSearch = () => {
    refetch();
  };

  const handleSort = (column: string, direction: SortDirection) => {
    setFilterValues((prev) => ({
      ...prev,
      sortBy: column,
      isAscending: direction === "asc",
      pageNumber: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilterValues((prev) => ({
      ...prev,
      pageNumber: page,
    }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilterValues((prev) => ({
      ...prev,
      pageSize: size,
      pageNumber: 1,
    }));
  };

  const handleOpenAddModal = () => {
    setSelectedCategoryId(null);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenEditModal = (category: CategoryDto) => {
    setSelectedCategoryId(category.id);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenDeleteAlert = (category: CategoryDto, isDelete: boolean) => {
    setSelectedCategoryId(category.id);
    setDialogs((prev) => ({ ...prev, alert: true, alertType: isDelete }));
  };

  const handleCloseDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
    if (dialog === "addUpdateModal") {
      setSelectedCategoryId(null);
    }
    if (dialog === "alert") {
      setSelectedCategoryId(null);
    }
  };

  const loading = isLoading || isFetching;

  const columns = useMemo(
    () => [
      {
        key: "imageUrl",
        sortable: true,
        header: t("common.image"),
        render: (row: CategoryDto) => {
          if (!row.imageUrl) return "-";
          return (
            <FileImage
              path={row.imageUrl}
              alt=""
              width={40}
              height={40}
              className="rounded object-cover"
            />
          );
        },
      },
      {
        key: "name",
        header: t("common.name"),
        sortable: true,
        render: (row: CategoryDto) => (
          <span className="font-medium">{row.name}</span>
        ),
      },
      {
        key: "creator",
        header: t("common.createdBy"),
        sortable: true,
        render: (row: CategoryDto) => (
          <span>{row.creator}</span>
        ),
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        render: (row: CategoryDto) => {
          return row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-";
        },
      },
      {
        key: "isDeleted",
        sortable: true,
        header: t("common.status"),
        render: (row: CategoryDto) => {
          return (
            <Badge variant={row.isDeleted ? "danger" : "success"} pill>
              {row.isDeleted ? t("common.deleted") : t("common.active")}
            </Badge>
          );
        },
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CategoryDto) => (
          <TableActionDropdown
            size="sm"
            actions={
              !row.isDeleted
                ? [
                    {
                      label: t("common.edit"),
                      icon: <EditIcon />,
                      onClick: () => handleOpenEditModal(row),
                    },
                    {
                      label: t("common.delete"),
                      icon: <TrashIcon />,
                      variant: "danger",
                      onClick: () => handleOpenDeleteAlert(row, true),
                    },
                  ]
                : [
                    {
                      label: t("common.restore"),
                      icon: <Undo2Icon />,
                      onClick: () => handleOpenDeleteAlert(row, false),
                    },
                  ]
            }
          />
        ),
      },
    ] as Column<CategoryDto>[],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.categories") },
    { label: t("categoriesExample1.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("categoriesExample1.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FolderIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("categoriesExample1.addCategory")}
            onClick={handleOpenAddModal}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            className="font-bold"
          />
        }
      />
      <Card variant="elevated" padding="md">
        <FilterAccordion onSearch={handleSearch} onClear={handleClearFilter}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              label={t("common.name")}
              value={filterValues.name || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("common.searchByName")}
              size="md"
            />
            <Select
              name="isDeleted"
              label={t("common.status")}
              value={filterValues.isDeleted === undefined ? "" : String(filterValues.isDeleted)}
              onChange={(value) => handleFilterChange("isDeleted", value)}
              options={getStatusFilterOptions(t)}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Select
              name="createdBy"
              label={t("common.createdBy")}
              value={filterValues.createdBy === undefined ? "" : String(filterValues.createdBy)}
              onChange={(value) => handleFilterChange("createdBy", value === "" ? undefined : Number(value))}
              options={creatorOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
          </div>
        </FilterAccordion>
      </Card>

      <Card variant="elevated" padding="md">
        <div className="space-y-4">
          <DataTable
            title={t("categoriesExample1.pageTitle")}
            columns={columns}
            data={data?.items || []}
            rowKey={(row) => row.id}
            loading={loading}
            emptyMessage={t("common.noData")}
            currentPage={filterValues.pageNumber || 1}
            pageSize={filterValues.pageSize || 25}
            totalItems={data?.totalCount || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
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
        </div>
      </Card>

      {dialogs.addUpdateModal && (
        <CategoryModal
          open={dialogs.addUpdateModal}
          onClose={() => handleCloseDialog("addUpdateModal")}
          editingCategoryId={selectedCategoryId}
          onSuccess={refetch}
        />
      )}

      {dialogs.alert && (
        <DeleteRestoreAlerts
          open={dialogs.alert}
          onClose={() => handleCloseDialog("alert")}
          isDelete={dialogs.alertType}
          categoryId={selectedCategoryId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default CategoriesExample1;
