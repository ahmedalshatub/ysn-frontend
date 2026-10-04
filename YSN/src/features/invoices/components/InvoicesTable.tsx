import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import EyeIcon from "../../../assets/icons/EyeIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import type { InvoiceListDto, InvoiceRequest } from "../types/Invoices.types";

interface InvoicesTableProps {
  items: InvoiceListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: InvoiceRequest;
  showCustomer: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onView: (invoice: InvoiceListDto) => void;
  onDelete: (invoice: InvoiceListDto) => void;
}

const InvoicesTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  showCustomer,
  onPageChange,
  onPageSizeChange,
  onSort,
  onView,
  onDelete,
}: InvoicesTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      { key: "id", header: t("invoices.number"), sortable: true, width: "90px", render: (row: InvoiceListDto) => <span className="font-semibold">#{row.id}</span> },
      {
        key: "createdAt",
        header: t("invoices.date"),
        sortable: true,
        width: "150px",
        render: (row: InvoiceListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      ...(showCustomer
        ? [{
            key: "customerName",
            header: t("invoices.customer"),
            render: (row: InvoiceListDto) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.customerName}</span>
                <span className="text-xs">
                  {t(customerRoleConfigs[row.customerRoleId as CustomerRoleValue].labelKey)}
                  {row.customerCityName ? ` - ${row.customerCityName}` : ""}
                </span>
              </div>
            ),
          }]
        : []),
      {
        key: "cardTypeName",
        header: t("cards.cardType"),
        render: (row: InvoiceListDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.cardTypeName}</span>
            <span className="text-xs">{row.cardCategoryName}</span>
          </div>
        ),
      },
      { key: "quantity", header: t("invoices.quantity"), sortable: true, width: "90px", render: (row: InvoiceListDto) => <span>{row.quantity}</span> },
      { key: "unitPrice", header: t("invoices.unitPrice"), width: "120px", render: (row: InvoiceListDto) => <span>{formatCurrency(row.unitPrice)}</span> },
      {
        key: "totalPrice",
        header: t("invoices.total"),
        sortable: true,
        width: "130px",
        render: (row: InvoiceListDto) => <span className="font-semibold">{formatCurrency(row.totalPrice)}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        width: "110px",
        render: (row: InvoiceListDto) => (
          <Badge label={row.isDeleted ? t("common.deleted") : t("common.active")} variant={row.isDeleted ? "danger" : "success"} size="sm" />
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: InvoiceListDto) => {
          const actions = [
            { label: t("invoices.view"), icon: <EyeIcon />, onClick: () => onView(row) },
            ...(!row.isDeleted && can(Permission.InvoicesDelete)
              ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDelete(row) }]
              : []),
          ];
          return (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          );
        },
      },
    ],
    [t, i18n.language, can, showCustomer, onView, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("invoices.noInvoices")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "id"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      onRowClick={(row) => onView(row)}
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

export default InvoicesTable;
