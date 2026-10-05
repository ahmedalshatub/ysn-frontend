import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../../shared/utils/formatCurrency";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs } from "../../../customers/types/Customers.types";
import { cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { CardsSoldReportRowDto } from "../types/CardsSoldReport.types";

interface CardsSoldReportTableProps {
  items: CardsSoldReportRowDto[];
  totalCount: number;
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const CardsSoldReportTable = ({
  items,
  totalCount,
  loading,
  pageNumber,
  pageSize,
  sortBy,
  isAscending,
  onPageChange,
  onPageSizeChange,
  onSort,
}: CardsSoldReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "createdAt",
        header: t("reports.cardsSold.date"),
        sortable: true,
        width: "160px",
        render: (row: CardsSoldReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "invoiceId",
        header: t("reports.cardsSold.invoiceId"),
        sortable: true,
        width: "100px",
        render: (row: CardsSoldReportRowDto) => <span className="font-semibold">#{row.invoiceId}</span>,
      },
      {
        key: "customerName",
        header: t("reports.cardsSold.customer"),
        sortable: true,
        render: (row: CardsSoldReportRowDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName}</span>
            {row.customerPhone && (
              <span className="text-xs ce-muted" dir="ltr">
                {row.customerPhone}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "customerRoleId",
        header: t("reports.cardsSold.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: CardsSoldReportRowDto) => <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="primary" size="sm" />,
      },
      {
        key: "cityName",
        header: t("reports.cardsSold.city"),
        sortable: true,
        render: (row: CardsSoldReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "cardCategoryName",
        header: t("reports.cardsSold.cardCategory"),
        sortable: true,
        render: (row: CardsSoldReportRowDto) => <span>{row.cardCategoryName || "-"}</span>,
      },
      {
        key: "cardTypeName",
        header: t("reports.cardsSold.cardType"),
        sortable: true,
        render: (row: CardsSoldReportRowDto) => <span>{row.cardTypeName || "-"}</span>,
      },
      {
        key: "kind",
        header: t("reports.cardsSold.kind"),
        sortable: true,
        width: "140px",
        render: (row: CardsSoldReportRowDto) => <Badge label={t(cardKindKeys[row.kind])} variant="info" size="sm" />,
      },
      {
        key: "serialNumber",
        header: t("reports.cardsSold.serialNumber"),
        sortable: true,
        render: (row: CardsSoldReportRowDto) => <span dir="ltr" className="text-xs break-all">{row.serialNumber || "-"}</span>,
      },
      {
        key: "unitPrice",
        header: t("reports.cardsSold.unitPrice"),
        sortable: true,
        width: "130px",
        render: (row: CardsSoldReportRowDto) => <span className="font-semibold">{formatCurrency(row.unitPrice)}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("reports.cardsSold.noRows")}
      currentPage={pageNumber}
      pageSize={pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={sortBy}
      sortDirection={isAscending ? "asc" : "desc"}
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

export default CardsSoldReportTable;
