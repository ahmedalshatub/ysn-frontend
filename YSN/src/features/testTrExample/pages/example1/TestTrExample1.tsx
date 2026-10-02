import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../../shared/components/cards/Card";
import DataTable from "../../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../../shared/components/table/TableActionDropdown";
import Button from "../../../../shared/components/buttons/Button";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import TestTrModal from "../../components/example1/TestTrModal";
import DeleteRestoreAlerts from "../../components/example1/DeleteRestoreAlerts";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import EditIcon from "../../../../assets/icons/EditIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../../assets/icons/Undo2Icon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import Badge from "../../../../shared/components/badges/Badge";
import { useGetAllTestTrsQuery } from "../../api/TestTr.api";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import { getStatusFilterOptions } from "../../../../shared/utils/constants";
import type { TestTrListDto, TestTrRequest } from "../../types/TestTr.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";

const initialFilterValues: TestTrRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  name: "",
  isDeleted: false,
  createdBy: undefined,
};

const TestTrExample1 = () => {
  const { t } = useTranslation();
  useTitle(t("testTrExample1.pageTitle"));

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
  const [selectedTestTrId, setSelectedTestTrId] = useState<number | null>(null);

  const { data: testTrData, isLoading, isFetching, refetch } = useGetAllTestTrsQuery(
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
    setSelectedTestTrId(null);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenEditModal = (testTr: TestTrListDto) => {
    setSelectedTestTrId(testTr.id);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenDeleteAlert = (testTr: TestTrListDto) => {
    setSelectedTestTrId(testTr.id);
    setDialogs({ alert: true, alertType: true, addUpdateModal: false });
  };

  const handleOpenRestoreAlert = (testTr: TestTrListDto) => {
    setSelectedTestTrId(testTr.id);
    setDialogs({ alert: true, alertType: false, addUpdateModal: false });
  };

  const handleCloseDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
    if (dialog === "addUpdateModal" || dialog === "alert") {
      setSelectedTestTrId(null);
    }
  };

  const loading = isLoading || isFetching;

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("common.id"),
        sortable: true,
        width: "100px",
        render: (row: TestTrListDto) => (
          <span className="font-medium">#{row.id}</span>
        ),
      },
      {
        key: "name",
        header: t("testTrExample1.name"),
        sortable: true,
        render: (row: TestTrListDto) => (
          <span className="font-medium">{row.name}</span>
        ),
      },
      {
        key: "range",
        header: t("testTrExample1.range"),
        sortable: true,
        render: (row: TestTrListDto) => (
          <span>{row.range}</span>
        ),
      },
      {
        key: "size",
        header: t("testTrExample1.size"),
        sortable: true,
        render: (row: TestTrListDto) => (
          <span>{row.size}</span>
        ),
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "120px",
        render: (row: TestTrListDto) => (
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
        render: (row: TestTrListDto) => (
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
    ],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage") },
    { label: t("testTrExample1.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("testTrExample1.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("testTrExample1.addTestTr")}
            onClick={handleOpenAddModal}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
          />
        }
      />
      <Card variant="elevated" padding="md">
        <FilterAccordion
          onSearch={handleSearch}
          onClear={handleClearFilter}
        >
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
            title={t("testTrExample1.pageTitle")}
            columns={columns}
            data={testTrData?.items || []}
            rowKey={(row) => row.id}
            loading={loading}
            emptyMessage={t("common.noData")}
            currentPage={filterValues.pageNumber || 1}
            pageSize={filterValues.pageSize || 25}
            totalItems={testTrData?.totalCount || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            sortColumn={filterValues.sortBy || "id"}
            sortDirection={filterValues.isAscending ? "asc" : "desc"}
            onSort={handleSort}
            pageSizeOptions={[
              { label: "25", value: 25 },
              { label: "30", value: 30 },
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
        <TestTrModal
          open={dialogs.addUpdateModal}
          onClose={() => handleCloseDialog("addUpdateModal")}
          testTrId={selectedTestTrId}
        />
      )}

      {dialogs.alert && (
        <DeleteRestoreAlerts
          open={dialogs.alert}
          onClose={() => handleCloseDialog("alert")}
          isDelete={dialogs.alertType}
          testTrId={selectedTestTrId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default TestTrExample1;
