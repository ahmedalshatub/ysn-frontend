import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportPriceListReportMutation, useGetPriceListReportQuery } from "../api/PriceListReport.api";
import PriceListReportFilters from "./PriceListReportFilters";
import PriceListReportTable from "./PriceListReportTable";
import PriceListReportSummaryCards from "./PriceListReportSummaryCards";
import type { PriceListReportFilter, PriceListReportRequest } from "../types/PriceListReport.types";

interface PriceListReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
}

const initialValues = (): PriceListReportRequest => ({
  pageNumber: 1,
  pageSize: 25,
  sortBy: "sortOrder",
  isAscending: true,
});

const toQueryFilter = (values: PriceListReportRequest): PriceListReportFilter => ({
  cardCategoryId: values.cardCategoryId,
  cardTypeId: values.cardTypeId,
  cityId: values.cityId,
  kind: values.kind,
  isActive: values.isActive,
});

const PriceListReportView = ({ framed, actionsTarget }: PriceListReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<PriceListReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values);
  const { data, isLoading, isFetching, refetch } = useGetPriceListReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportPriceListReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <PriceListReportFilters
          key={filterKey}
          values={values}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={() => refetch()}
          onClear={() => {
            setValues(initialValues());
            setFilterKey((key) => key + 1);
          }}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("reports.priceList.title")} <span className="list-header-count">({data?.rows.totalCount ?? 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
              {can(Permission.ReportsExport) && (
                <ExportButton loading={isExporting} onExport={() => exportReport(queryFilter).unwrap()} />
              )}
            </PageActions>
          </div>
        </div>
        <PriceListReportTable
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
      </ListContainer>
      <PriceListReportSummaryCards summary={data?.summary} />
    </div>
  );
};

export default PriceListReportView;
