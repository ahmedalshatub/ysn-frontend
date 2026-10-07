import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import PageActions from "../../../../shared/components/navigation/PageActions";
import Message from "../../../../shared/components/feedback/Message";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import { useExportAccountStatementReportMutation, useGetAccountStatementReportQuery } from "../api/AccountStatementReport.api";
import AccountStatementReportFilters from "./AccountStatementReportFilters";
import AccountStatementReportTable from "./AccountStatementReportTable";
import AccountStatementReportSummaryCards from "./AccountStatementReportSummaryCards";
import type { AccountStatementReportFilter, AccountStatementReportRequest } from "../types/AccountStatementReport.types";

interface AccountStatementReportViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  customerId?: number;
}

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const initialValues = (): AccountStatementReportRequest => {
  const today = new Date();
  return {
    pageNumber: 1,
    pageSize: 25,
    fromDate: toDateValue(new Date(today.getFullYear(), today.getMonth(), 1)),
    toDate: toDateValue(today),
  };
};

const toQueryFilter = (values: AccountStatementReportRequest, customerId?: number): AccountStatementReportFilter => ({
  customerId: customerId ?? values.customerId,
  type: values.type,
  direction: values.direction,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const AccountStatementReportView = ({ framed, actionsTarget, customerId }: AccountStatementReportViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<AccountStatementReportRequest>(initialValues);
  const [filterKey, setFilterKey] = useState(0);

  const queryFilter = toQueryFilter(values, customerId);
  const ready = !!queryFilter.customerId && !!queryFilter.fromDate && !!queryFilter.toDate;
  const { data, isLoading, isFetching, refetch } = useGetAccountStatementReportQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize },
    { skip: !ready, refetchOnMountOrArgChange: true }
  );
  const [exportReport, { isLoading: isExporting }] = useExportAccountStatementReportMutation();

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <AccountStatementReportFilters
          key={filterKey}
          values={values}
          forCustomer={!!customerId}
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
            {t("reports.accountStatement.title")} <span className="list-header-count">({ready ? data?.rows.totalCount ?? 0 : 0})</span>
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
          <AccountStatementReportTable
            items={data?.rows.items || []}
            totalCount={data?.rows.totalCount || 0}
            loading={isLoading || isFetching}
            pageNumber={values.pageNumber}
            pageSize={values.pageSize}
            onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
            onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          />
        ) : (
          <Message variant="info">{t("reports.accountStatement.chooseCustomer")}</Message>
        )}
      </ListContainer>
      {ready && <AccountStatementReportSummaryCards summary={data?.summary} />}
    </div>
  );
};

export default AccountStatementReportView;
