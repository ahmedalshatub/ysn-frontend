import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import PageActions from "../../../../shared/components/navigation/PageActions";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportTvSmsApiLogsMutation, useGetTvSmsApiLogsQuery } from "../../api/TvSmsApiLogs.api";
import TvSmsApiLogFilters from "./TvSmsApiLogFilters";
import TvSmsApiLogsTable from "./TvSmsApiLogsTable";
import type { TvSmsApiLogFilter, TvSmsApiLogRequest } from "../../types/TvSmsApiLogs.types";

interface TvSmsApiLogsListProps {
  actionsTarget?: HTMLElement | null;
  initialFilter?: Partial<TvSmsApiLogRequest>;
}

const initialValues: TvSmsApiLogRequest = { pageNumber: 1, pageSize: 25, sortBy: "createdAt", isAscending: false };

const toQueryFilter = (values: TvSmsApiLogRequest): TvSmsApiLogFilter => ({
  cityId: values.cityId,
  baseUrl: values.baseUrl || undefined,
  call: values.call,
  succeeded: values.succeeded,
  tvId: values.tvId,
  tvActivationId: values.tvActivationId,
  providerStatusCode: values.providerStatusCode,
  httpStatus: values.httpStatus,
  durationMsFrom: values.durationMsFrom,
  durationMsTo: values.durationMsTo,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const TvSmsApiLogsList = ({ actionsTarget, initialFilter }: TvSmsApiLogsListProps) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<TvSmsApiLogRequest>(() => ({ ...initialValues, ...initialFilter }));

  const queryFilter = toQueryFilter(values);
  const { data, isLoading, isFetching, refetch } = useGetTvSmsApiLogsQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportLogs, { isLoading: isExporting }] = useExportTvSmsApiLogsMutation();

  return (
    <div className="space-y-6">
      <ListContainer plain={false}>
        <TvSmsApiLogFilters
          values={values}
          onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
          onSearch={refetch}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={false}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("tvSmsApiLogs.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <PageActions target={actionsTarget}>
            <ExportButton loading={isExporting} onExport={() => exportLogs(queryFilter).unwrap()} />
          </PageActions>
        </div>
        <TvSmsApiLogsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={values}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
        />
      </ListContainer>
    </div>
  );
};

export default TvSmsApiLogsList;
