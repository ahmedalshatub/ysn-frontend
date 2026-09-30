import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../../shared/components/cards/Card";
import DataTable from "../../../../shared/components/table/DataTable";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import Button from "../../../../shared/components/buttons/Button";
import TableActionDropdown from "../../../../shared/components/table/TableActionDropdown";
import Badge from "../../../../shared/components/badges/Badge";
import { getStatusFilterOptions } from "../../../../shared/utils/constants";
import DeleteRestoreAlerts from "../../components/example3/DeleteRestoreAlerts";
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

const CategoriesExample3 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useTitle(t("categoriesExample3.pageTitle"));

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

  const handleOpenAddPage = () => {
    navigate("/categories-example-3/add");
  };

  const handleOpenEditPage = (id: number) => {
    navigate(`/categories-example-3/edit/${id}`);
  };

  const handleOpenDeleteAlert = (id: number) => {
    setSelectedCategoryId(id);
    setDialogs({ alert: true, alertType: true });
  };

  const handleOpenRestoreAlert = (id: number) => {
    setSelectedCategoryId(id);
    setDialogs({ alert: true, alertType: false });
  };

  const handleCloseDialog = () => {
    setDialogs({ alert: false, alertType: true });
    setSelectedCategoryId(null);
  };

  const handleSuccess = () => {
    refetch();
  };

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("common.id"),
        sortable: true,
        width: "100px",
      },
      {
        key: "name",
        header: t("common.name"),
        sortable: true,
        render: (row: CategoryDto) => (
          <div className="flex items-center gap-3">
            {row.imageUrl ? (
              <FileImage
                path={row.imageUrl}
                alt={row.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FolderIcon className="w-5 h-5 text-gray-400" />
              </div>
            )}
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "150px",
        render: (row: CategoryDto) => (
          <Badge variant={row.isDeleted ? "danger" : "success"} size="sm">
            {row.isDeleted ? t("common.deleted") : t("common.active")}
          </Badge>
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        width: "100px",
        render: (row: CategoryDto) => (
          <TableActionDropdown
            actions={
              !row.isDeleted
                ? [
                    {
                      label: t("common.edit"),
                      icon: <EditIcon />,
                      onClick: () => handleOpenEditPage(row.id),
                    },
                    {
                      label: t("common.delete"),
                      icon: <TrashIcon />,
                      variant: "danger",
                      onClick: () => handleOpenDeleteAlert(row.id),
                    },
                  ]
                : [
                    {
                      label: t("common.restore"),
                      icon: <Undo2Icon />,
                      onClick: () => handleOpenRestoreAlert(row.id),
                    },
                  ]
            }
          />
        ),
      },
    ],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.categories") },
    { label: t("categoriesExample3.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("categoriesExample3.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FolderIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            icon={<PlusIcon className="w-5 h-5" />}
            onClick={handleOpenAddPage}
            className="font-bold"
          >
            {t("categoriesExample3.addCategory")}
          </Button>
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
            title={t("categoriesExample3.pageTitle")}
            columns={columns as any}
            data={data?.items || []}
            rowKey={(row) => row.id}
            loading={isLoading || isFetching}
            sortColumn={filterValues.sortBy || "id"}
            sortDirection={filterValues.isAscending ? "asc" : "desc"}
            onSort={handleSort}
            totalItems={data?.totalCount || 0}
            currentPage={filterValues.pageNumber || 1}
            pageSize={filterValues.pageSize || 25}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </Card>

      {dialogs.alert && (
        <DeleteRestoreAlerts
          open={dialogs.alert}
          onClose={handleCloseDialog}
          categoryId={selectedCategoryId}
          type={dialogs.alertType ? "delete" : "restore"}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default CategoriesExample3;
