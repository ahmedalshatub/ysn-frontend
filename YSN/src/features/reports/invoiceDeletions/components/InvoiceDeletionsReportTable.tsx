import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import type { InvoiceDeletionsReportRequest, InvoiceDeletionsReportRowDto } from "../types/InvoiceDeletionsReport.types";

interface InvoiceDeletionsReportTableProps {
  items: InvoiceDeletionsReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: InvoiceDeletionsReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const InvoiceDeletionsReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: InvoiceDeletionsReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "invoiceId",
        header: t("reports.invoiceDeletions.invoiceId"),
        sortable: true,
        width: "90px",
        render: (row: InvoiceDeletionsReportRowDto) => <span className="font-semibold">#{row.invoiceId}</span>,
      },
      {
        key: "createdAt",
        header: t("reports.invoiceDeletions.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: InvoiceDeletionsReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "deletedAt",
        header: t("reports.invoiceDeletions.deletedAt"),
        sortable: true,
        width: "150px",
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.deletedAt ? formatDate(row.deletedAt, { locale: i18n.language }) : "-"}</span>,
      },
      {
        key: "customerName",
        header: t("reports.invoiceDeletions.customer"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName}</span>
            {row.customerPhone && (
              <span dir="ltr" className="text-xs ce-muted">
                {row.customerPhone}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "customerRoleId",
        header: t("reports.invoiceDeletions.customerType"),
        sortable: true,
        width: "120px",
        render: (row: InvoiceDeletionsReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.invoiceDeletions.city"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.invoiceDeletions.cardCategory"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.invoiceDeletions.cardType"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.cardTypeName || "-"}</span>,
      },
      {
        key: "quantity",
        header: t("reports.invoiceDeletions.quantity"),
        sortable: true,
        width: "100px",
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.quantity}</span>,
      },
      {
        key: "refundedTotal",
        header: t("reports.invoiceDeletions.refundedTotal"),
        sortable: true,
        width: "140px",
        render: (row: InvoiceDeletionsReportRowDto) => <span className="font-semibold">{formatCurrency(row.refundedTotal)}</span>,
      },
      {
        key: "deleteReason",
        header: t("reports.invoiceDeletions.deleteReason"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => <span className="truncate">{row.deleteReason || "-"}</span>,
      },
      {
        key: "deletedByName",
        header: t("reports.invoiceDeletions.deletedBy"),
        sortable: true,
        render: (row: InvoiceDeletionsReportRowDto) => <span>{row.deletedByName || "-"}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.invoiceId}
      loading={loading}
      emptyMessage={t("reports.invoiceDeletions.noRows")}
      currentPage={filterValues.pageNumber}
      pageSize={filterValues.pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      pageSizeOptions={[
        { label: "25", value: 25 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
      ]}
      hoverable
      striped
      borderless
    />
  );
};

export default InvoiceDeletionsReportTable;
