import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import EyeIcon from "../../../assets/icons/EyeIcon";
import AuditLogDetailsModal from "../components/AuditLogDetailsModal";
import { useGetAllAuditLogsQuery } from "../api/AuditLogs.api";
import type { AuditLog, AuditLogRequest } from "../types/AuditLogs.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";

const initialFilterValues: AuditLogRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  userName: "",
  action: "",
  tableName: "",
  fromDate: "",
  toDate: "",
};

const actionVariant = (action: string) => {
  const value = action?.toLowerCase() ?? "";
  if (value.includes("create") || value.includes("insert") || value.includes("add")) return "success";
  if (value.includes("delete") || value.includes("remove")) return "danger";
  if (value.includes("update") || value.includes("edit")) return "warning";
  if (value.includes("restore")) return "info";
  return "secondary";
};

const AuditLogs = () => {
  const { t } = useTranslation();
  useTitle(t("auditLogsPage.pageTitle"));

  const [filterValues, setFilterValues] = useState(initialFilterValues);
  const [selected, setSelected] = useState<AuditLog | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetAllAuditLogsQuery(
    {
      ...filterValues,
      userName: filterValues.userName || undefined,
      action: filterValues.action || undefined,
      tableName: filterValues.tableName || undefined,
      fromDate: filterValues.fromDate || undefined,
      toDate: filterValues.toDate || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const loading = isLoading || isFetching;

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

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "#",
        width: "80px",
        sortable: true,
        render: (row: AuditLog) => <span className="font-mono text-xs ce-muted">{row.id}</span>,
      },
      {
        key: "userName",
        sortable: true,
        header: t("common.createdBy"),
        render: (row: AuditLog) => row.userName || "-",
      },
      {
        key: "action",
        sortable: true,
        header: t("auditLogsPage.action"),
        render: (row: AuditLog) => (
          <Badge variant={actionVariant(row.action)}>{row.action}</Badge>
        ),
      },
      {
        key: "tableName",
        sortable: true,
        header: t("auditLogsPage.tableName"),
        render: (row: AuditLog) => <span className="font-mono text-xs">{row.tableName}</span>,
      },
      {
        key: "recordId",
        sortable: true,
        header: t("auditLogsPage.recordId"),
        render: (row: AuditLog) => row.recordId ?? "-",
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        render: (row: AuditLog) =>
          row.createdAt ? new Date(row.createdAt).toLocaleString("en-GB") : "-",
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: AuditLog) => (
          <TableActionDropdown
            size="sm"
            actions={[
              {
                label: t("auditLogsPage.viewDetails"),
                icon: <EyeIcon />,
                onClick: () => setSelected(row),
              },
            ]}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("auditLogsPage.pageTitle")}
        subtitle={t("auditLogsPage.subtitle")}
        items={[{ label: t("sidebar.homePage"), icon: <HomeIcon /> }, { label: t("auditLogsPage.pageTitle") }]}
        variant="gradient"
        icon={<ShieldIcon />}
        showDate
        animated
      />

      <Card variant="elevated" padding="md">
        <FilterAccordion onSearch={handleSearch} onClear={handleClearFilter}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              name="userName"
              label={t("common.createdBy")}
              value={filterValues.userName || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("auditLogsPage.searchByUser")}
              size="md"
            />
            <Input
              name="action"
              label={t("auditLogsPage.action")}
              value={filterValues.action || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("auditLogsPage.searchByAction")}
              size="md"
            />
            <Input
              name="tableName"
              label={t("auditLogsPage.tableName")}
              value={filterValues.tableName || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              placeholder={t("auditLogsPage.searchByTable")}
              size="md"
            />
            <Input
              name="fromDate"
              type="date"
              label={t("auditLogsPage.fromDate")}
              value={filterValues.fromDate || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              size="md"
            />
            <Input
              name="toDate"
              type="date"
              label={t("auditLogsPage.toDate")}
              value={filterValues.toDate || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              size="md"
            />
          </div>
        </FilterAccordion>
      </Card>

      <Card variant="elevated" padding="md">
        <DataTable
          title={t("auditLogsPage.pageTitle")}
          columns={columns}
          data={data?.items || []}
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

      <AuditLogDetailsModal log={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default AuditLogs;
