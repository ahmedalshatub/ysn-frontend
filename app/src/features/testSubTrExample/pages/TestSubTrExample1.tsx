import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import TestSubTrModal from "../components/TestSubTrModal";
import DeleteRestoreAlerts from "../components/DeleteRestoreAlerts";
import { useGetAllTestSubTrsQuery } from "../api/TestSubTr.api";
import { useGetAllUsersQuery } from "../../users/api/Users.api";
import type { TestSubTrListDto, TestSubTrRequest } from "../types/TestSubTr.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import PlusIcon from "../../../assets/icons/PlusIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import FileImage from "../../../shared/components/media/FileImage";

const initialFilterValues: TestSubTrRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  name: "",
  isDeleted: false,
  createdBy: undefined,
};

const TestSubTrExample1 = () => {
  const { t } = useTranslation();
  useTitle(t("testSubTrs.pageTitle"));

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
  const [selectedTestSubTrId, setSelectedTestSubTrId] = useState<number | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetAllTestSubTrsQuery(
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
      [name]: name === "isDeleted" ? (value === "" ? undefined : value === "true") : value,
    }));
  };

  const handleClearFilter = () => {
    setFilterValues({ ...initialFilterValues, pageNumber: 1 });
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
    setFilterValues((prev) => ({ ...prev, pageNumber: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilterValues((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  const handleOpenAddModal = () => {
    setSelectedTestSubTrId(null);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenEditModal = (row: TestSubTrListDto) => {
    setSelectedTestSubTrId(row.id);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenDeleteAlert = (row: TestSubTrListDto) => {
    setSelectedTestSubTrId(row.id);
    setDialogs({ alert: true, alertType: true, addUpdateModal: false });
  };

  const handleOpenRestoreAlert = (row: TestSubTrListDto) => {
    setSelectedTestSubTrId(row.id);
    setDialogs({ alert: true, alertType: false, addUpdateModal: false });
  };

  const handleCloseDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
    if (dialog === "addUpdateModal" || dialog === "alert") {
      setSelectedTestSubTrId(null);
    }
  };

  const loading = isLoading || isFetching;

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("common.id"),
        sortable: true,
        width: "80px",
        render: (row: TestSubTrListDto) => <span className="font-medium">#{row.id}</span>,
      },
      {
        key: "imageUrl",
        sortable: true,
        header: t("testSubTrs.image"),
        render: (row: TestSubTrListDto) => {
          if (!row.imageUrl) return <span className="text-gray-400">-</span>;
          return (
            <FileImage
              path={row.imageUrl}
              alt=""
              className="w-10 h-10 rounded-lg object-cover"
            />
          );
        },
      },
      {
        key: "name",
        header: t("common.name"),
        sortable: true,
        render: (row: TestSubTrListDto) => <span className="font-medium">{row.name}</span>,
      },
      {
        key: "clientName",
        header: t("testSubTrs.client"),
        sortable: true,
        render: (row: TestSubTrListDto) => <span>{row.clientName}</span>,
      },
      {
        key: "amount",
        header: t("testSubTrs.amount"),
        sortable: true,
        render: (row: TestSubTrListDto) => <span>{row.amount}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "120px",
        render: (row: TestSubTrListDto) => (
          <Badge
            label={row.isDeleted ? t("common.deleted") : t("common.active")}
            variant={row.isDeleted ? "danger" : "success"}
            size="sm"
          />
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: TestSubTrListDto) => (
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
                      onClick: () => handleOpenDeleteAlert(row),
                    },
                  ]
                : [
                    {
                      label: t("common.restore"),
                      icon: <Undo2Icon />,
                      onClick: () => handleOpenRestoreAlert(row),
                    },
                  ]
            }
          />
        ),
      },
    ] as Column<TestSubTrListDto>[],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.testSubTrs") },
    { label: t("testSubTrs.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("testSubTrs.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("testSubTrs.addTestSubTr")}
            onClick={handleOpenAddModal}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
          />
        }
      />

      <Card variant="elevated" padding="md">
        <FilterAccordion onSearch={handleSearch} onClear={handleClearFilter}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="name"
              label={t("common.name")}
              value={filterValues.name || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("common.searchByName")}
              size="md"
            />
            <Input
              name="minAmount"
              label={t("testSubTrs.minAmount")}
              type="number"
              value={filterValues.minAmount ?? ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value ? Number(e.target.value) : undefined)}
              placeholder={t("testSubTrs.minAmount")}
              size="md"
            />
            <Input
              name="maxAmount"
              label={t("testSubTrs.maxAmount")}
              type="number"
              value={filterValues.maxAmount ?? ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value ? Number(e.target.value) : undefined)}
              placeholder={t("testSubTrs.maxAmount")}
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
            title={t("testSubTrs.pageTitle")}
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
        <TestSubTrModal
          open={dialogs.addUpdateModal}
          onClose={() => handleCloseDialog("addUpdateModal")}
          testSubTrId={selectedTestSubTrId}
          onSuccess={refetch}
        />
      )}

      {dialogs.alert && (
        <DeleteRestoreAlerts
          open={dialogs.alert}
          onClose={() => handleCloseDialog("alert")}
          isDelete={dialogs.alertType}
          testSubTrId={selectedTestSubTrId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default TestSubTrExample1;
