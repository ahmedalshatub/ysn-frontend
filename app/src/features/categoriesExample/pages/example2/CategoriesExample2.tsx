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
import Badge from "../../../../shared/components/badges/Badge";
import PopConfirm from "../../../../shared/components/buttons/PopConfirm";
import { getStatusFilterOptions } from "../../../../shared/utils/constants";
import CategoryDrawer from "../../components/example2/CategoryDrawer";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} from "../../api/Categories.api";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import type { CategoryDto, CategoryRequest } from "../../types/Categories.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
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

const CategoriesExample2 = () => {
  const { t } = useTranslation();
  useTitle(t("categoriesExample2.pageTitle"));

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
    drawer: false,
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

  const handleOpenAddDrawer = () => {
    setSelectedCategoryId(null);
    setDialogs((prev) => ({ ...prev, drawer: true }));
  };

  const handleOpenEditDrawer = (category: CategoryDto) => {
    setSelectedCategoryId(category.id);
    setDialogs((prev) => ({ ...prev, drawer: true }));
  };

  const handleCloseDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
    if (dialog === "drawer") {
      setSelectedCategoryId(null);
    }
  };

  const [deleteCategory] = useDeleteCategoryMutation();
  const [restoreCategory] = useRestoreCategoryMutation();

  const handleDelete = async (category: CategoryDto) => {
    try {
      await deleteCategory(category.id).unwrap();
      showSuccess(t("categoriesExample2.successDelete"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleRestore = async (category: CategoryDto) => {
    try {
      await restoreCategory(category.id).unwrap();
      showSuccess(t("categoriesExample2.successRestore"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
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
          <div className="flex items-center gap-1 justify-center">
            {!row.isDeleted && (
              <button
                onClick={() => handleOpenEditDrawer(row)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors"
                title={t("common.edit")}
              >
                <EditIcon className="w-4 h-4" />
              </button>
            )}
            <PopConfirm
              title={!row.isDeleted ? t("messages.confirmDelete") : t("messages.confirmRestore")}
              description={
                !row.isDeleted
                  ? t("categoriesExample2.deleteMessage")
                  : t("categoriesExample2.restoreMessage")
              }
              confirmText={!row.isDeleted ? t("common.delete") : t("common.restore")}
              cancelText={t("common.cancel")}
              confirmVariant={!row.isDeleted ? "danger" : "warning"}
              onConfirm={() => (!row.isDeleted ? handleDelete(row) : handleRestore(row))}
              placement="top"
            >
              <button
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                  !row.isDeleted
                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }`}
                title={!row.isDeleted ? t("common.delete") : t("common.restore")}
              >
                {!row.isDeleted ? <TrashIcon className="w-4 h-4" /> : <Undo2Icon className="w-4 h-4" />}
              </button>
            </PopConfirm>
          </div>
        ),
      },
    ] as Column<CategoryDto>[],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.categories") },
    { label: t("categoriesExample2.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("categoriesExample2.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FolderIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("categoriesExample2.addCategory")}
            onClick={handleOpenAddDrawer}
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
            title={t("categoriesExample2.pageTitle")}
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

      {dialogs.drawer && (
        <CategoryDrawer
          open={dialogs.drawer}
          onClose={() => handleCloseDialog("drawer")}
          editingCategoryId={selectedCategoryId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default CategoriesExample2;
