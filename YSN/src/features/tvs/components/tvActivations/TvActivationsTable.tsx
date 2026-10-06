import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../../shared/components/table/TableActionDropdown";
import Badge from "../../../../shared/components/badges/Badge";
import usePermission from "../../../../shared/hooks/usePermission";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import EyeIcon from "../../../../assets/icons/EyeIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import { cardKindKeys, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import useProviderMessage from "../../hooks/useProviderMessage";
import {
  TvActivationStatus,
  tvActivationChannelKeys,
  tvActivationSourceKeys,
  tvActivationStatusKeys,
  tvActivationStatusVariants,
  type TvActivationListDto,
  type TvActivationRequest,
} from "../../types/TvActivations.types";

interface TvActivationsTableProps {
  items: TvActivationListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: TvActivationRequest;
  showTv: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onView: (activation: TvActivationListDto) => void;
  onResolve: (activation: TvActivationListDto) => void;
}

const TvActivationsTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  showTv,
  onPageChange,
  onPageSizeChange,
  onSort,
  onView,
  onResolve,
}: TvActivationsTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();
  const providerMessage = useProviderMessage();

  const columns = useMemo(() => {
    const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language, includeTime: true }) : "-");
    return [
      ...(showTv
        ? [{
            key: "tvNumber",
            header: t("tvs.tvNumber"),
            sortable: true,
            render: (row: TvActivationListDto) => (
              <div className="flex flex-col gap-1">
                <span className="font-mono font-medium">{row.tvNumber}</span>
                <span className="text-xs">{[row.nickname, row.cityName].filter(Boolean).join(" - ")}</span>
              </div>
            ),
          }]
        : []),
      {
        key: "customerName",
        header: t("tvs.customer"),
        sortable: true,
        width: "170px",
        render: (row: TvActivationListDto) => <span className="font-medium">{row.customerName}</span>,
      },
      {
        key: "cardTypeName",
        header: t("tvActivations.card"),
        sortable: true,
        width: "200px",
        render: (row: TvActivationListDto) => (
          <div className="flex flex-col gap-1">
            <span>{row.cardTypeName || t(tvActivationSourceKeys[row.source] ?? "")}</span>
            <span className="font-mono text-xs">{row.cardCodeMasked}</span>
          </div>
        ),
      },
      {
        key: "kind",
        header: t("tvActivations.kind"),
        sortable: true,
        width: "130px",
        render: (row: TvActivationListDto) => (
          <div className="flex flex-col gap-1">
            <span>{t(cardKindKeys[row.kind as CardKindValue] ?? "")}</span>
            {row.durationMonths ? <span className="text-xs">{t("tvActivations.months", { count: row.durationMonths })}</span> : null}
          </div>
        ),
      },
      {
        key: "status",
        header: t("common.status"),
        sortable: true,
        width: "140px",
        render: (row: TvActivationListDto) => (
          <div className="flex flex-col gap-1">
            <Badge label={t(tvActivationStatusKeys[row.status])} variant={tvActivationStatusVariants[row.status]} size="sm" />
            {row.needsChecking && <Badge label={t("tvActivations.needsChecking")} variant="warning" size="sm" />}
          </div>
        ),
      },
      {
        key: "providerMessage",
        header: t("tvActivations.providerMessage"),
        width: "200px",
        render: (row: TvActivationListDto) => <span className="text-xs">{providerMessage(row.providerMessage)}</span>,
      },
      {
        key: "createdAt",
        header: t("tvActivations.createdAt"),
        sortable: true,
        width: "170px",
        render: (row: TvActivationListDto) => (
          <div className="flex flex-col gap-1">
            <span>{date(row.createdAt)}</span>
            <span className="text-xs">
              {[t(tvActivationChannelKeys[row.channel] ?? ""), row.creator].filter(Boolean).join(" - ")}
            </span>
          </div>
        ),
      },
      {
        key: "completedAt",
        header: t("tvActivations.completedAt"),
        sortable: true,
        width: "150px",
        render: (row: TvActivationListDto) => <span>{date(row.completedAt)}</span>,
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: TvActivationListDto) => {
          const actions = [
            { label: t("tvActivations.details"), icon: <EyeIcon />, onClick: () => onView(row) },
            ...(row.status === TvActivationStatus.Pending && can(Permission.TvsActivate)
              ? [{ label: t("tvActivations.resolve"), icon: <CheckCircleIcon />, onClick: () => onResolve(row) }]
              : []),
          ];
          return (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown size="sm" actions={actions} />
            </div>
          );
        },
      },
    ];
  }, [t, i18n.language, can, showTv, providerMessage, onView, onResolve]);

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("tvActivations.noActivations")}
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

export default TvActivationsTable;
