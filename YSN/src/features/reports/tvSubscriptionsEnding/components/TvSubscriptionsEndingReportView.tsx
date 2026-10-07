import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportTvSubscriptionsEndingReportMutation, useGetTvSubscriptionsEndingReportQuery } from "../api/TvSubscriptionsEndingReport.api";
import TvSubscriptionsEndingReportFilters from "./TvSubscriptionsEndingReportFilters";
import TvSubscriptionsEndingReportTable from "./TvSubscriptionsEndingReportTable";
import TvSubscriptionsEndingReportSummaryCards from "./TvSubscriptionsEndingReportSummaryCards";
import {
  TV_SUBSCRIPTIONS_ENDING_DEFAULT_DAYS,
  type TvSubscriptionsEndingReportFilter,
  type TvSubscriptionsEndingReportRequest,
} from "../types/TvSubscriptionsEndingReport.types";

interface TvSubscriptionsEndingReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
}

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const initialValues = (): TvSubscriptionsEndingReportRequest => {
  const today = new Date();
  return {
    pageNumber: 1,
    pageSize: 25,
    sortBy: "subscriptionEndsAt",
    isAscending: true,
    fromDate: toDateValue(today),
    toDate: toDateValue(new Date(today.getFullYear(), today.getMonth(), today.getDate() + TV_SUBSCRIPTIONS_ENDING_DEFAULT_DAYS)),
  };
};

const toQueryFilter = (values: TvSubscriptionsEndingReportRequest): TvSubscriptionsEndingReportFilter => ({
  cityId: values.cityId,
  customerId: values.customerId,
  customerRoleId: values.customerRoleId,
  tvNumber: values.tvNumber || undefined,
  hasCustomers: values.hasCustomers,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const TvSubscriptionsEndingReportView = ({ framed, actionsTarget }: TvSubscriptionsEndingReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<TvSubscriptionsEndingReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values);
  const ready = !!queryFilter.fromDate && !!queryFilter.toDate;
  const { data, isLoading, isFetching, refetch } = useGetTvSubscriptionsEndingReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { skip: !ready, refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportTvSubscriptionsEndingReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <TvSubscriptionsEndingReportFilters
          key={filterKey}
          values={values}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={() => ready && refetch()}
          onClear={() => {
            setValues(initialValues());
            setFilterKey((key) => key + 1);
          }}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("reports.tvSubscriptionsEnding.title")} <span className="list-header-count">({ready ? data?.rows.totalCount ?? 0 : 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
              {ready && can(Permission.ReportsExport) && (
                <ExportButton loading={isExporting} onExport={(format) => exportReport({ ...queryFilter, format }).unwrap()} />
              )}
            </PageActions>
          </div>
        </div>
        {ready ? (
          <TvSubscriptionsEndingReportTable
            items={data?.rows.items || []}
            totalCount={data?.rows.totalCount || 0}
            loading={isLoading || isFetching}
            pageNumber={values.pageNumber}
            pageSize={values.pageSize}
            sortBy={values.sortBy}
            isAscending={values.isAscending}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={(column: string, direction: SortDirection) =>
              setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
            }
          />
        ) : (
          <Message variant="info">{t("reports.tvSubscriptionsEnding.chooseDates")}</Message>
        )}
      </ListContainer>
      {ready && <TvSubscriptionsEndingReportSummaryCards summary={data?.summary} />}
    </div>
  );
};

export default TvSubscriptionsEndingReportView;
