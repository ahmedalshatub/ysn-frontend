import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import Avatar from "../../../shared/components/media/Avatar";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import { mockTickets } from "../types/ticketData";
import type { Ticket } from "../types/ticketData";
import { statusVariantMap, priorityVariantMap, formatDate } from "../types/ticketUtils";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";

const INITIAL_FILTERS = {
  search: "",
  status: "",
  priority: "",
  category: "",
};

const TicketList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useTitle(t("ticketExample.pageTitle"));

  const [filterValues, setFilterValues] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const statusOptions = [
    { name: t("ticketExample.status.pending"), value: "pending" },
    { name: t("ticketExample.status.in-progress"), value: "in-progress" },
    { name: t("ticketExample.status.approved"), value: "approved" },
    { name: t("ticketExample.status.rejected"), value: "rejected" },
    { name: t("ticketExample.status.resolved"), value: "resolved" },
    { name: t("ticketExample.status.closed"), value: "closed" },
  ];

  const priorityOptions = [
    { name: t("ticketExample.priority.high"), value: "high" },
    { name: t("ticketExample.priority.medium"), value: "medium" },
    { name: t("ticketExample.priority.low"), value: "low" },
  ];

  const categoryOptions = [
    { name: t("ticketExample.categories.bug"), value: "bug" },
    { name: t("ticketExample.categories.feature"), value: "feature" },
    { name: t("ticketExample.categories.support"), value: "support" },
    { name: t("ticketExample.categories.inquiry"), value: "inquiry" },
  ];

  const filteredTickets = useMemo(() => {
    const search = appliedFilters.search.trim().toLowerCase();
    return mockTickets.filter((ticket) => {
      if (
        search &&
        !ticket.title.toLowerCase().includes(search) &&
        !ticket.ticketNumber.toLowerCase().includes(search)
      )
        return false;
      if (appliedFilters.status && ticket.status !== appliedFilters.status) return false;
      if (appliedFilters.priority && ticket.priority !== appliedFilters.priority) return false;
      if (appliedFilters.category && ticket.category !== appliedFilters.category) return false;
      return true;
    });
  }, [appliedFilters]);

  const handleFilterChange = (name: string, value: unknown) => {
    setFilterValues((prev) => ({ ...prev, [name]: String(value) }));
  };

  const columns: Column<Ticket>[] = [
    {
      key: "ticketNumber",
      header: "#",
      width: "120px",
      sortable: true,
      render: (row) => <Badge variant="dark" size="sm" pill label={row.ticketNumber} />,
    },
    {
      key: "title",
      header: t("ticketExample.ticket"),
      minWidth: "220px",
      sortable: true,
      render: (row) => <span className="ce-text text-sm font-medium">{row.title}</span>,
    },
    {
      key: "category",
      header: t("ticketExample.category"),
      width: "130px",
      sortable: true,
      responsive: "lg",
      render: (row) => (
        <Badge
          variant="secondary"
          outline
          size="sm"
          pill
          label={t(`ticketExample.categories.${row.category}`)}
        />
      ),
    },
    {
      key: "priority",
      header: t("ticketExample.priorityLabel"),
      width: "120px",
      sortable: true,
      render: (row) => (
        <Badge
          variant={priorityVariantMap[row.priority]}
          size="sm"
          pill
          label={t(`ticketExample.priority.${row.priority}`)}
        />
      ),
    },
    {
      key: "status",
      header: t("common.status"),
      width: "140px",
      sortable: true,
      render: (row) => (
        <Badge
          variant={statusVariantMap[row.status]}
          size="sm"
          pill
          label={t(`ticketExample.status.${row.status}`)}
        />
      ),
    },
    {
      key: "assignedTo",
      header: t("ticketExample.assignedTo"),
      width: "190px",
      sortable: true,
      responsive: "md",
      render: (row) => (
        <div className="flex items-center gap-2 min-w-0">
          <Avatar src={row.assignedToAvatar} name={row.assignedTo} size="xs" variant="primary" />
          <span className="ce-text text-sm truncate">{row.assignedTo}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: t("ticketExample.createdAt"),
      width: "130px",
      sortable: true,
      responsive: "lg",
      render: (row) => <span className="ce-muted text-xs">{formatDate(row.createdAt)}</span>,
    },
    {
      key: "actions",
      header: t("common.actions"),
      width: "80px",
      align: "center",
      render: (row) => (
        <TableActionDropdown
          size="sm"
          actions={[
            {
              label: t("common.view"),
              icon: <EyeIcon className="w-4 h-4" />,
              onClick: () => navigate(`/ticket-example/${row.id}`),
            },
          ]}
        />
      ),
    },
  ];

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("ticketExample.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("ticketExample.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<ClipboardIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("ticketExample.newTicket")}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            className="font-bold"
          />
        }
      />

      <Card variant="elevated" padding="md">
        <FilterAccordion
          onSearch={() => setAppliedFilters(filterValues)}
          onClear={() => {
            setFilterValues(INITIAL_FILTERS);
            setAppliedFilters(INITIAL_FILTERS);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Input
              label={t("common.search")}
              placeholder={t("ticketExample.searchPlaceholder")}
              value={filterValues.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <Select
              label={t("common.status")}
              options={statusOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.status}
              onChange={(value) => handleFilterChange("status", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
            <Select
              label={t("ticketExample.priorityLabel")}
              options={priorityOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.priority}
              onChange={(value) => handleFilterChange("priority", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
            <Select
              label={t("ticketExample.category")}
              options={categoryOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.category}
              onChange={(value) => handleFilterChange("category", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
          </div>
        </FilterAccordion>

        <div className="mt-4">
          <DataTable<Ticket>
            columns={columns}
            data={filteredTickets}
            rowKey={(row) => row.id}
            title={t("ticketExample.pageTitle")}
            clientSideSorting
            clientSidePagination
            pageSizeOptions={[
              { label: "5", value: 5 },
              { label: "10", value: 10 },
              { label: "25", value: 25 },
            ]}
            paginationMode="simple"
            emptyMessage={t("common.noData")}
            onRowClick={(row) => navigate(`/ticket-example/${row.id}`)}
            hoverable
            striped
            rounded
          />
        </div>
      </Card>
    </div>
  );
};

export default TicketList;
