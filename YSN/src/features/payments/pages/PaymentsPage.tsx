import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import CreatePaymentModal from "../components/CreatePaymentModal";
import { useGetAllPaymentsQuery } from "../api/Payments.api";
import { PaymentStatus } from "../types/Payments.types";
import type {
  PaymentTransaction,
  PaymentTransactionRequest,
  PaymentStatusType,
} from "../types/Payments.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import HomeIcon from "../../../assets/icons/HomeIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";

const initialFilterValues: PaymentTransactionRequest = {
  pageSize: 25,
  pageNumber: 1,
  sortBy: "id",
  isAscending: false,
  referenceId: "",
  paymentStatusId: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  isDeleted: false,
};

const STATUS_META: Record<PaymentStatusType, { key: string; variant: "warning" | "success" | "danger" | "secondary" }> = {
  [PaymentStatus.Pending]: { key: "pending", variant: "warning" },
  [PaymentStatus.Completed]: { key: "completed", variant: "success" },
  [PaymentStatus.Failed]: { key: "failed", variant: "danger" },
  [PaymentStatus.Cancelled]: { key: "cancelled", variant: "secondary" },
};

const Payments = () => {
  const { t } = useTranslation();
  useTitle(t("paymentsPage.pageTitle"));

  const [filterValues, setFilterValues] = useState(initialFilterValues);
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading, isFetching, refetch } = useGetAllPaymentsQuery(
    {
      ...filterValues,
      referenceId: filterValues.referenceId || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const loading = isLoading || isFetching;
  const items = useMemo(() => data?.items ?? [], [data]);

  const money = (value: number, currency?: string) =>
    `${Number(value ?? 0).toLocaleString("en-GB")} ${currency ?? ""}`.trim();

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

  const statusOptions = Object.entries(STATUS_META).map(([value, meta]) => ({
    value,
    name: t(`paymentsPage.statuses.${meta.key}`),
  }));

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "#",
        width: "80px",
        sortable: true,
        render: (row: PaymentTransaction) => (
          <span className="font-mono text-xs ce-muted">{row.id}</span>
        ),
      },
      {
        key: "referenceId",
        sortable: true,
        header: t("paymentsPage.referenceId"),
        render: (row: PaymentTransaction) => (
          <span className="font-mono text-xs">{row.referenceId || "-"}</span>
        ),
      },
      {
        key: "amount",
        header: t("paymentsPage.amount"),
        sortable: true,
        align: "right" as const,
        render: (row: PaymentTransaction) => (
          <span className="font-semibold tabular-nums">{money(row.amount, row.currency)}</span>
        ),
      },
      {
        key: "paymentStatusId",
        sortable: true,
        header: t("common.status"),
        render: (row: PaymentTransaction) => {
          const meta = STATUS_META[row.paymentStatusId];
          if (!meta) return "-";
          return <Badge variant={meta.variant}>{t(`paymentsPage.statuses.${meta.key}`)}</Badge>;
        },
      },
      {
        key: "maskedPan",
        sortable: true,
        header: t("paymentsPage.maskedPan"),
        render: (row: PaymentTransaction) => (
          <span className="font-mono text-xs">{row.maskedPan || "-"}</span>
        ),
      },
      {
        key: "provider",
        sortable: true,
        header: t("paymentsPage.provider"),
        render: (row: PaymentTransaction) => row.provider || "-",
      },
      {
        key: "createdAt",
        header: t("common.createdAt"),
        sortable: true,
        render: (row: PaymentTransaction) =>
          row.createdAt ? new Date(row.createdAt).toLocaleString("en-GB") : "-",
      },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("paymentsPage.pageTitle")}
        subtitle={t("paymentsPage.subtitle")}
        items={[
          { label: t("sidebar.homePage"), icon: <HomeIcon /> },
          { label: t("paymentsPage.pageTitle") },
        ]}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("paymentsPage.newPayment")}
            onClick={() => setCreateOpen(true)}
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
              name="referenceId"
              label={t("paymentsPage.referenceId")}
              value={filterValues.referenceId || ""}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              size="md"
            />
            <Select
              name="paymentStatusId"
              label={t("common.status")}
              value={filterValues.paymentStatusId === undefined ? "" : String(filterValues.paymentStatusId)}
              onChange={(value) =>
                handleFilterChange(
                  "paymentStatusId",
                  value === "" ? undefined : (Number(value) as PaymentStatusType)
                )
              }
              options={statusOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Input
              name="minAmount"
              type="number"
              label={t("paymentsPage.minAmount")}
              value={filterValues.minAmount === undefined ? "" : String(filterValues.minAmount)}
              onChange={(e) =>
                handleFilterChange("minAmount", e.target.value === "" ? undefined : Number(e.target.value))
              }
              size="md"
            />
            <Input
              name="maxAmount"
              type="number"
              label={t("paymentsPage.maxAmount")}
              value={filterValues.maxAmount === undefined ? "" : String(filterValues.maxAmount)}
              onChange={(e) =>
                handleFilterChange("maxAmount", e.target.value === "" ? undefined : Number(e.target.value))
              }
              size="md"
            />
          </div>
        </FilterAccordion>
      </Card>

      <Card variant="elevated" padding="md">
        <DataTable
          title={t("paymentsPage.pageTitle")}
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

      <CreatePaymentModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={refetch}
      />
    </div>
  );
};

export default Payments;
