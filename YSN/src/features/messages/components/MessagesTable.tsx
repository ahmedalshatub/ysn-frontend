import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Badge from "../../../shared/components/badges/Badge";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import EyeIcon from "../../../assets/icons/EyeIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import { customerTypeConfigs, type CustomerTypeValue } from "../../customers/types/Customers.types";
import type { MessageListDto, MessageRequest } from "../types/Messages.types";

interface MessagesTableProps {
  items: MessageListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: MessageRequest;
  showCustomer: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onView: (message: MessageListDto) => void;
  onDelete: (message: MessageListDto) => void;
  onRestore: (message: MessageListDto) => void;
}

const MessagesTable = ({
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
  onRestore,
}: MessagesTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      {
        key: "subject",
        header: t("messages.subject"),
        sortable: true,
        render: (row: MessageListDto) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{row.subject}</p>
            <p className="message-preview truncate">{row.contentPreview}</p>
          </div>
        ),
      },
      ...(showCustomer
        ? [{
            key: "fullName",
            header: t("messages.customer"),
            sortable: true,
            width: "200px",
            render: (row: MessageListDto) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.fullName}</span>
                <span className="text-xs">
                  {t(customerTypeConfigs[row.userType as CustomerTypeValue].labelKey)}
                  {row.cityName ? ` - ${row.cityName}` : ""}
                </span>
              </div>
            ),
          }]
        : []),
      {
        key: "isRead",
        header: t("messages.readStatus"),
        sortable: true,
        width: "150px",
        render: (row: MessageListDto) => (
          <div className="flex flex-col gap-1">
            <Badge
              label={row.isRead ? t("messages.read") : t("messages.unread")}
              variant={row.isRead ? "success" : "warning"}
              size="sm"
            />
            {row.readAt && <span className="text-xs">{formatDate(row.readAt, { locale: i18n.language })}</span>}
          </div>
        ),
      },
      {
        key: "creator",
        header: t("messages.sender"),
        sortable: true,
        width: "130px",
        render: (row: MessageListDto) => <span>{row.creator || "-"}</span>,
      },
      {
        key: "createdAt",
        header: t("messages.sentAt"),
        sortable: true,
        width: "150px",
        render: (row: MessageListDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
      {
        key: "isDeleted",
        header: t("common.status"),
        sortable: true,
        width: "110px",
        render: (row: MessageListDto) => (
          <Badge
            label={row.isDeleted ? t("common.deleted") : t("common.active")}
            variant={row.isDeleted ? "danger" : "success"}
            size="sm"
          />
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: MessageListDto) => {
          const actions = [
            { label: t("messages.viewMessage"), icon: <EyeIcon />, onClick: () => onView(row) },
            ...(row.isDeleted
              ? can(Permission.MessagesRestore)
                ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onRestore(row) }]
                : []
              : can(Permission.MessagesDelete)
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
    [t, i18n.language, can, showCustomer, onView, onDelete, onRestore]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("messages.noMessages")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
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

export default MessagesTable;
