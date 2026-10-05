import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";
import type { DiscountsReportRequest, DiscountsReportRowDto } from "../types/DiscountsReport.types";

interface DiscountsReportTableProps {
  items: DiscountsReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: DiscountsReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const DiscountsReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: DiscountsReportTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "customerName",
        header: t("reports.discounts.customer"),
        sortable: true,
        render: (row: DiscountsReportRowDto) => <span className="font-medium">{row.customerName}</span>,
      },
      {
        key: "customerRoleId",
        header: t("reports.discounts.customerType"),
        sortable: true,
        width: "120px",
        render: (row: DiscountsReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.discounts.city"),
        sortable: true,
        render: (row: DiscountsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.discounts.cardCategory"),
        sortable: true,
        render: (row: DiscountsReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.discounts.cardType"),
        sortable: true,
        render: (row: DiscountsReportRowDto) => <span>{row.cardTypeName || "-"}</span>,
      },
      {
        key: "invoicesCount",
        header: t("reports.discounts.invoicesCount"),
        sortable: true,
        width: "110px",
        render: (row: DiscountsReportRowDto) => <span>{row.invoicesCount}</span>,
      },
      {
        key: "cardsCount",
        header: t("reports.discounts.cardsCount"),
        sortable: true,
        width: "110px",
        render: (row: DiscountsReportRowDto) => <span>{row.cardsCount}</span>,
      },
      {
        key: "baseTotal",
        header: t("reports.discounts.baseTotal"),
        sortable: true,
        width: "140px",
        render: (row: DiscountsReportRowDto) => <span>{formatCurrency(row.baseTotal)}</span>,
      },
      {
        key: "discountTotal",
        header: t("reports.discounts.discountTotal"),
        sortable: true,
        width: "140px",
        render: (row: DiscountsReportRowDto) => <span className="font-semibold text-danger">{formatCurrency(row.discountTotal)}</span>,
      },
      {
        key: "paidTotal",
        header: t("reports.discounts.paidTotal"),
        sortable: true,
        width: "140px",
        render: (row: DiscountsReportRowDto) => <span className="font-semibold text-success">{formatCurrency(row.paidTotal)}</span>,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => `${row.customerId}-${row.cardTypeId}`}
      loading={loading}
      emptyMessage={t("reports.discounts.noRows")}
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

export default DiscountsReportTable;
