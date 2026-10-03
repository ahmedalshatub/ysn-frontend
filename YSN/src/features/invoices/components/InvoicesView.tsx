import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { useExportInvoicesMutation, useGetInvoicesQuery } from "../api/Invoices.api";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceStatsCards from "./InvoiceStatsCards";
import InvoicesTable from "./InvoicesTable";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import DeleteInvoiceAlert from "./DeleteInvoiceAlert";
import type { InvoiceFilter, InvoiceListDto, InvoiceRequest } from "../types/Invoices.types";

interface InvoicesViewProps {
  customerId?: number;
  onChanged?: () => void;
}

const initialValues: InvoiceRequest = { pageNumber: 1, pageSize: 25, sortBy: "id", isAscending: false };

const toQueryFilter = (values: InvoiceRequest, customerId?: number): InvoiceFilter => ({
  id: values.id,
  customerId,
  customerName: customerId ? undefined : values.customerName || undefined,
  customerPhone: customerId ? undefined : values.customerPhone || undefined,
  customerUserType: customerId ? undefined : values.customerUserType,
  cityId: customerId ? undefined : values.cityId,
  cardCategoryId: values.cardCategoryId,
  cardTypeId: values.cardTypeId,
  serialNumber: values.serialNumber || undefined,
  totalPriceFrom: values.totalPriceFrom,
  totalPriceTo: values.totalPriceTo,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const InvoicesView = ({ customerId, onChanged }: InvoicesViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<InvoiceRequest>(initialValues);
  const [dialog, setDialog] = useState<"view" | "delete" | null>(null);
  const [selected, setSelected] = useState<InvoiceListDto | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const queryFilter = toQueryFilter(values, customerId);
  const { data, isLoading, isFetching, refetch } = useGetInvoicesQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportInvoices, { isLoading: isExporting }] = useExportInvoicesMutation();

  const reload = () => {
    refetch();
    setRefreshKey((key) => key + 1);
    onChanged?.();
  };
  const open = useCallback((name: "view" | "delete", invoice: InvoiceListDto) => {
    setSelected(invoice);
    setDialog(name);
  }, []);
  const handleView = useCallback((invoice: InvoiceListDto) => open("view", invoice), [open]);
  const handleDelete = useCallback((invoice: InvoiceListDto) => open("delete", invoice), [open]);
  const close = () => {
    setDialog(null);
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      <InvoiceFilters
        values={values}
        forCustomer={!!customerId}
        onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
        onSearch={reload}
        onClear={() => setValues(initialValues)}
      />
      <InvoiceStatsCards filter={queryFilter} refreshKey={refreshKey} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="list-header-title">
          {t("invoices.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
        </h3>
        {can(Permission.InvoicesExport) && <ExportButton loading={isExporting} onExport={() => exportInvoices(queryFilter).unwrap()} />}
      </div>
      <InvoicesTable
        items={data?.items || []}
        totalCount={data?.totalCount || 0}
        loading={isLoading || isFetching}
        filterValues={values}
        showCustomer={!customerId}
        onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
        onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
        onSort={(column: string, direction: SortDirection) =>
          setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
        }
        onView={handleView}
        onDelete={handleDelete}
      />

      {dialog === "view" && selected && <InvoiceDetailsModal open invoiceId={selected.id} onClose={close} />}
      {dialog === "delete" && selected && <DeleteInvoiceAlert open invoice={selected} onClose={close} onSuccess={reload} />}
    </div>
  );
};

export default InvoicesView;
