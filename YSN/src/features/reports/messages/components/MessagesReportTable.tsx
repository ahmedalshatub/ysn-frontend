import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs } from "../../../customers/types/Customers.types";
import type { MessagesReportRowDto } from "../types/MessagesReport.types";

interface MessagesReportTableProps {
  items: MessagesReportRowDto[];
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

const MessagesReportTable = ({
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
}: MessagesReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "createdAt",
        header: t("reports.messages.sentAt"),
        sortable: true,
        width: "160px",
        render: (row: MessagesReportRowDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "subject",
        header: t("reports.messages.subject"),
        sortable: true,
        render: (row: MessagesReportRowDto) => <span className="truncate font-medium">{row.subject}</span>,
      },
      {
        key: "customerName",
        header: t("reports.messages.customer"),
        sortable: true,
        render: (row: MessagesReportRowDto) => (
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
        header: t("reports.messages.customerRole"),
        sortable: true,
        width: "120px",
        render: (row: MessagesReportRowDto) => <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="primary" size="sm" />,
      },
      {
        key: "cityName",
        header: t("reports.messages.city"),
        sortable: true,
        render: (row: MessagesReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "isRead",
        header: t("reports.messages.readStatus"),
        sortable: true,
        width: "110px",
        render: (row: MessagesReportRowDto) => (
          <Badge
            label={row.isRead ? t("reports.messages.read") : t("reports.messages.unread")}
            variant={row.isRead ? "success" : "warning"}
            size="sm"
          />
        ),
      },
      {
        key: "readAt",
        header: t("reports.messages.readAt"),
        sortable: true,
        width: "160px",
        render: (row: MessagesReportRowDto) => <span>{row.readAt ? formatDate(row.readAt, { locale: i18n.language }) : "-"}</span>,
      },
      {
        key: "senderName",
        header: t("reports.messages.sender"),
        sortable: true,
        render: (row: MessagesReportRowDto) => <span>{row.senderName || "-"}</span>,
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
      emptyMessage={t("reports.messages.noRows")}
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

export default MessagesReportTable;
