import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import DeleteRestoreAlerts from "../../components/example3/DeleteRestoreAlerts";
import { useGetAllTestTrsQuery } from "../../api/TestTr.api";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import type { TestTrListDto, TestTrRequest } from "../../types/TestTr.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import EditIcon from "../../../../assets/icons/EditIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../../assets/icons/Undo2Icon";

const initialFilterValues: TestTrRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  name: "",
  isDeleted: false,
  createdBy: undefined,
};

const TestTrExample3 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useTitle(t("testTrExample3.pageTitle"));

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
    setFilterValues((prev) => ({ ...prev, pageNumber: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilterValues((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  const handleOpenAddPage = () => {
    navigate("/test-tr-example-3/add");
  };

  const handleOpenEditPage = (id: number) => {
    navigate(`/test-tr-example-3/edit/${id}`);
  };

  const handleOpenDeleteAlert = (testTr: TestTrListDto) => {
    setSelectedTestTrId(testTr.id);
    setDialogs({ alert: true, alertType: true });
  };

  const handleOpenRestoreAlert = (testTr: TestTrListDto) => {
    setSelectedTestTrId(testTr.id);
    setDialogs({ alert: true, alertType: false });
  };

  const handleCloseDialog = () => {
    setDialogs({ alert: false, alertType: true });
    setSelectedTestTrId(null);
  };

  const loading = isLoading || isFetching;

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: t("common.id"),
        sortable: true,
        width: "100px",
        render: (row: TestTrListDto) => <span className="font-medium">#{row.id}</span>,
      },
      {
        key: "name",
        header: t("testTrExample3.name"),
        sortable: true,
        render: (row: TestTrListDto) => <span className="font-medium">{row.name}</span>,
      },
      {
        key: "range",
        header: t("testTrExample3.range"),
        sortable: true,
        render: (row: TestTrListDto) => <span>{row.range}</span>,
      },
      {
        key: "size",
        header: t("testTrExample3.size"),
        sortable: true,
        render: (row: TestTrListDto) => <span>{row.size}</span>,
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
                      onClick: () => handleOpenEditPage(row.id),
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
    ] as Column<TestTrListDto>[],
    [t]
  );

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.testTr") },
    { label: t("testTrExample3.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("testTrExample3.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("testTrExample3.addTestTr")}
            onClick={handleOpenAddPage}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
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
            title={t("testTrExample3.pageTitle")}
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

      {dialogs.alert && (
        <DeleteRestoreAlerts
          open={dialogs.alert}
          onClose={handleCloseDialog}
          isDelete={dialogs.alertType}
          testTrId={selectedTestTrId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default TestTrExample3;
