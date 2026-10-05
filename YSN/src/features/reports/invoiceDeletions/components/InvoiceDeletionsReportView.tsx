import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportInvoiceDeletionsReportMutation, useGetInvoiceDeletionsReportQuery } from "../api/InvoiceDeletionsReport.api";
import InvoiceDeletionsReportFilters from "./InvoiceDeletionsReportFilters";
import InvoiceDeletionsReportTable from "./InvoiceDeletionsReportTable";
import InvoiceDeletionsReportSummaryCards from "./InvoiceDeletionsReportSummaryCards";
import type { InvoiceDeletionsReportFilter, InvoiceDeletionsReportRequest } from "../types/InvoiceDeletionsReport.types";

interface InvoiceDeletionsReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
}

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const initialValues = (): InvoiceDeletionsReportRequest => {
  const today = new Date();
  return {
    pageNumber: 1,
    pageSize: 25,
    sortBy: "deletedAt",
    isAscending: false,
    fromDate: toDateValue(new Date(today.getFullYear(), today.getMonth(), 1)),
    toDate: toDateValue(today),
  };
};

const toQueryFilter = (values: InvoiceDeletionsReportRequest): InvoiceDeletionsReportFilter => ({
  customerId: values.customerId,
  customerName: values.customerName || undefined,
  customerRoleId: values.customerRoleId,
  cityId: values.cityId,
  cardCategoryId: values.cardCategoryId,
  cardTypeId: values.cardTypeId,
  deletedBy: values.deletedBy,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const InvoiceDeletionsReportView = ({ framed, actionsTarget }: InvoiceDeletionsReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<InvoiceDeletionsReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values);
  const ready = !!queryFilter.fromDate && !!queryFilter.toDate;
  const { data, isLoading, isFetching, refetch } = useGetInvoiceDeletionsReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { skip: !ready, refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportInvoiceDeletionsReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <InvoiceDeletionsReportFilters
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
            {t("reports.invoiceDeletions.title")} <span className="list-header-count">({ready ? data?.rows.totalCount ?? 0 : 0})</span>
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
          <InvoiceDeletionsReportTable
            items={data?.rows.items || []}
            totalCount={data?.rows.totalCount || 0}
            loading={isLoading || isFetching}
            filterValues={values}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
            onSort={(column: string, direction: SortDirection) =>
              setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
            }
          />
        ) : (
          <Message variant="info">{t("reports.invoiceDeletions.chooseDates")}</Message>
        )}
      </ListContainer>
      {ready && <InvoiceDeletionsReportSummaryCards summary={data?.summary} />}
    </div>
  );
};

export default InvoiceDeletionsReportView;
