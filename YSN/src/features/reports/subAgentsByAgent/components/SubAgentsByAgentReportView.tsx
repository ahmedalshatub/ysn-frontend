import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportSubAgentsByAgentReportMutation, useGetSubAgentsByAgentReportQuery } from "../api/SubAgentsByAgentReport.api";
import SubAgentsByAgentReportFilters from "./SubAgentsByAgentReportFilters";
import SubAgentsByAgentReportTable from "./SubAgentsByAgentReportTable";
import SubAgentsByAgentReportSummaryCards from "./SubAgentsByAgentReportSummaryCards";
import type { SubAgentsByAgentReportFilter, SubAgentsByAgentReportRequest } from "../types/SubAgentsByAgentReport.types";

interface SubAgentsByAgentReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
}

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const initialValues = (): SubAgentsByAgentReportRequest => {
  const today = new Date();
  return {
    pageNumber: 1,
    pageSize: 25,
    sortBy: "agentName",
    isAscending: true,
    fromDate: toDateValue(new Date(today.getFullYear(), today.getMonth(), 1)),
    toDate: toDateValue(today),
  };
};

const toQueryFilter = (values: SubAgentsByAgentReportRequest): SubAgentsByAgentReportFilter => ({
  agentId: values.agentId,
  subAgentName: values.subAgentName || undefined,
  cityId: values.cityId,
  isActive: values.isActive,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const SubAgentsByAgentReportView = ({ framed, actionsTarget }: SubAgentsByAgentReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<SubAgentsByAgentReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values);
  const ready = !!queryFilter.fromDate && !!queryFilter.toDate;
  const { data, isLoading, isFetching, refetch } = useGetSubAgentsByAgentReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { skip: !ready, refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportSubAgentsByAgentReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <SubAgentsByAgentReportFilters
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
            {t("reports.subAgentsByAgent.title")} <span className="list-header-count">({ready ? data?.rows.totalCount ?? 0 : 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
              {ready && can(Permission.ReportsExport) && (
                <ExportButton loading={isExporting} onExport={() => exportReport(queryFilter).unwrap()} />
              )}
            </PageActions>
          </div>
        </div>
        {ready ? (
          <SubAgentsByAgentReportTable
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
          <Message variant="info">{t("reports.subAgentsByAgent.chooseDates")}</Message>
        )}
      </ListContainer>
      {ready && <SubAgentsByAgentReportSummaryCards summary={data?.summary} />}
    </div>
  );
};

export default SubAgentsByAgentReportView;
