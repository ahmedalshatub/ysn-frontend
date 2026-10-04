import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import { useExportTransactionsMutation, useGetTransactionsQuery } from "../api/Transactions.api";
import TransactionFilters from "./TransactionFilters";
import TransactionStatsCards from "./TransactionStatsCards";
import TransactionsTable from "./TransactionsTable";
import TransactionDetailsModal from "./TransactionDetailsModal";
import BalanceChangeModal from "./BalanceChangeModal";
import DeleteTransactionAlert from "./DeleteTransactionAlert";
import RestoreTransactionAlert from "./RestoreTransactionAlert";
import { TransactionType, type TransactionFilter, type TransactionListDto, type TransactionRequest } from "../types/Transactions.types";
import PageActions from "../../../shared/components/navigation/PageActions";
import ListContainer from "../../../shared/components/cards/ListContainer";

interface TransactionsViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  customer?: CustomerListDto | null;
  onChanged?: () => void;
  initialFilter?: Partial<TransactionRequest>;
}

type DialogName = "view" | "deposit" | "withdraw" | "delete" | "restore";

const initialValues: TransactionRequest = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "createdAt",
  isAscending: false,
};

const toQueryFilter = (values: TransactionRequest, customerId?: number): TransactionFilter => ({
  type: values.type,
  status: values.status,
  customerId,
  customerName: customerId ? undefined : values.customerName || undefined,
  customerPhone: customerId ? undefined : values.customerPhone || undefined,
  customerRoleId: customerId ? undefined : values.customerRoleId,
  cityId: customerId ? undefined : values.cityId,
  description: values.description || undefined,
  amountFrom: values.amountFrom,
  amountTo: values.amountTo,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const TransactionsView = ({ framed, actionsTarget, customer, onChanged, initialFilter }: TransactionsViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<TransactionRequest>(() => ({ ...initialValues, ...initialFilter }));
  const [dialog, setDialog] = useState<DialogName | null>(null);
  const [selected, setSelected] = useState<TransactionListDto | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const queryFilter = toQueryFilter(values, customer?.id);
  const { data, isLoading, isFetching, refetch } = useGetTransactionsQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportTransactions, { isLoading: isExporting }] = useExportTransactionsMutation();

  const openDialog = useCallback((name: DialogName, transaction: TransactionListDto | null) => {
    setSelected(transaction);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };
  const reload = () => {
    refetch();
    setRefreshKey((key) => key + 1);
    onChanged?.();
  };

  const handleView = useCallback((transaction: TransactionListDto) => openDialog("view", transaction), [openDialog]);
  const handleDelete = useCallback((transaction: TransactionListDto) => openDialog("delete", transaction), [openDialog]);
  const handleRestore = useCallback((transaction: TransactionListDto) => openDialog("restore", transaction), [openDialog]);

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <TransactionFilters
          values={values}
          forCustomer={!!customer}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={reload}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("transactions.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
            {can(Permission.TransactionsExport) && (
              <ExportButton loading={isExporting} onExport={() => exportTransactions(queryFilter).unwrap()} />
            )}
            {can(Permission.TransactionsWithdraw) && (
              <Button
                variant="light"
                size="md"
                label={t("transactionTypes.withdraw")}
                icon={<TrendDownIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => openDialog("withdraw", null)}
              />
            )}
            {can(Permission.TransactionsDeposit) && (
              <Button
                variant="dark"
                size="md"
                label={t("transactionTypes.deposit")}
                icon={<TrendUpIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => openDialog("deposit", null)}
              />
            )}
            </PageActions>
          </div>
        </div>
        <TransactionsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={values}
          customerId={customer?.id}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
          onView={handleView}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      </ListContainer>
      <TransactionStatsCards filter={queryFilter} refreshKey={refreshKey} />

      {dialog === "view" && selected && <TransactionDetailsModal open transactionId={selected.id} onClose={closeDialog} />}
      {(dialog === "deposit" || dialog === "withdraw") && (
        <BalanceChangeModal
          open
          type={dialog === "deposit" ? TransactionType.Deposit : TransactionType.Withdraw}
          customer={customer}
          onClose={closeDialog}
          onSuccess={reload}
        />
      )}
      {dialog === "delete" && selected && (
        <DeleteTransactionAlert open transaction={selected} onClose={closeDialog} onSuccess={reload} />
      )}
      {dialog === "restore" && selected && (
        <RestoreTransactionAlert open transaction={selected} onClose={closeDialog} onSuccess={reload} />
      )}
    </div>
  );
};

export default TransactionsView;
