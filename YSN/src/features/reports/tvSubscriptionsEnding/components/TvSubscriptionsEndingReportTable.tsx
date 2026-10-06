import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { TV_SUBSCRIPTIONS_ENDING_SOON_DAYS, type TvSubscriptionsEndingReportRowDto } from "../types/TvSubscriptionsEndingReport.types";

interface TvSubscriptionsEndingReportTableProps {
  items: TvSubscriptionsEndingReportRowDto[];
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

const daysLeftVariant = (daysLeft: number) => {
  if (daysLeft < 0) return "danger";
  if (daysLeft < TV_SUBSCRIPTIONS_ENDING_SOON_DAYS) return "warning";
  return "success";
};

const TvSubscriptionsEndingReportTable = ({
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
}: TvSubscriptionsEndingReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "tvNumber",
        header: t("reports.tvSubscriptionsEnding.tvNumber"),
        sortable: true,
        width: "150px",
        render: (row: TvSubscriptionsEndingReportRowDto) => (
          <span className="font-medium" dir="ltr">
            {row.tvNumber}
          </span>
        ),
      },
      {
        key: "cityName",
        header: t("reports.tvSubscriptionsEnding.city"),
        sortable: true,
        render: (row: TvSubscriptionsEndingReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "subscriptionEndsAt",
        header: t("reports.tvSubscriptionsEnding.endsAt"),
        sortable: true,
        width: "150px",
        render: (row: TvSubscriptionsEndingReportRowDto) => <span>{formatDate(row.subscriptionEndsAt, { locale: i18n.language })}</span>,
      },
      {
        key: "daysLeft",
        header: t("reports.tvSubscriptionsEnding.daysLeft"),
        sortable: true,
        width: "130px",
        render: (row: TvSubscriptionsEndingReportRowDto) => (
          <Badge
            label={row.daysLeft < 0 ? t("reports.tvSubscriptionsEnding.ended") : t("reports.tvSubscriptionsEnding.days", { count: row.daysLeft })}
            variant={daysLeftVariant(row.daysLeft)}
            size="sm"
          />
        ),
      },
      {
        key: "customersCount",
        header: t("reports.tvSubscriptionsEnding.customersCount"),
        sortable: true,
        width: "110px",
        render: (row: TvSubscriptionsEndingReportRowDto) => <span>{row.customersCount}</span>,
      },
      {
        key: "customerNames",
        header: t("reports.tvSubscriptionsEnding.customers"),
        sortable: true,
        render: (row: TvSubscriptionsEndingReportRowDto) => <span>{row.customerNames || "-"}</span>,
      },
      {
        key: "subscriptionCheckedAt",
        header: t("reports.tvSubscriptionsEnding.checkedAt"),
        sortable: true,
        width: "160px",
        render: (row: TvSubscriptionsEndingReportRowDto) => (
          <span>{row.subscriptionCheckedAt ? formatDate(row.subscriptionCheckedAt, { locale: i18n.language, includeTime: true }) : "-"}</span>
        ),
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.tvId}
      loading={loading}
      emptyMessage={t("reports.tvSubscriptionsEnding.noRows")}
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

export default TvSubscriptionsEndingReportTable;
