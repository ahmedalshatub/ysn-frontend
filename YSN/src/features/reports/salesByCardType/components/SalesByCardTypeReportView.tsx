import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportSalesByCardTypeReportMutation, useGetSalesByCardTypeReportQuery } from "../api/SalesByCardTypeReport.api";
import SalesByCardTypeReportFilters from "./SalesByCardTypeReportFilters";
import SalesByCardTypeReportTable from "./SalesByCardTypeReportTable";
import SalesByCardTypeReportSummaryCards from "./SalesByCardTypeReportSummaryCards";
import type { SalesByCardTypeReportFilter, SalesByCardTypeReportRequest } from "../types/SalesByCardTypeReport.types";

interface SalesByCardTypeReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
}

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const initialValues = (): SalesByCardTypeReportRequest => {
  const today = new Date();
  return {
    pageNumber: 1,
    pageSize: 25,
    sortBy: "salesTotal",
    isAscending: false,
    fromDate: toDateValue(new Date(today.getFullYear(), today.getMonth(), 1)),
    toDate: toDateValue(today),
  };
};

const toQueryFilter = (values: SalesByCardTypeReportRequest): SalesByCardTypeReportFilter => ({
  cardCategoryId: values.cardCategoryId,
  cardTypeId: values.cardTypeId,
  kind: values.kind,
  cityId: values.cityId,
  customerRoleId: values.customerRoleId,
  customerId: values.customerId,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const SalesByCardTypeReportView = ({ framed, actionsTarget }: SalesByCardTypeReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<SalesByCardTypeReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values);
  const ready = !!queryFilter.fromDate && !!queryFilter.toDate;
  const { data, isLoading, isFetching, refetch } = useGetSalesByCardTypeReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { skip: !ready, refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportSalesByCardTypeReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <SalesByCardTypeReportFilters
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
            {t("reports.salesByCardType.title")} <span className="list-header-count">({ready ? data?.rows.totalCount ?? 0 : 0})</span>
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
          <SalesByCardTypeReportTable
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
          <Message variant="info">{t("reports.salesByCardType.chooseDates")}</Message>
        )}
      </ListContainer>
      {ready && <SalesByCardTypeReportSummaryCards summary={data?.summary} />}
    </div>
  );
};

export default SalesByCardTypeReportView;
