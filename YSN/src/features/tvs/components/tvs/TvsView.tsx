import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../shared/components/buttons/Button";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import PageActions from "../../../../shared/components/navigation/PageActions";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import type { CustomerListDto } from "../../../customers/types/Customers.types";
import { useExportTvsMutation, useGetTvsQuery, useRefreshTvSubscriptionMutation } from "../../api/Tvs.api";
import TvFilters from "./TvFilters";
import TvsTable from "./TvsTable";
import TvDialogs from "./TvDialogs";
import AddCustomerTvModal from "./AddCustomerTvModal";
import type { CustomerTvFilter, CustomerTvListDto, CustomerTvRequest, TvActionName } from "../../types/Tvs.types";

interface TvsViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  customer?: CustomerListDto | null;
  initialFilter?: Partial<CustomerTvRequest>;
  onChanged?: () => void;
}

const initialValues: CustomerTvRequest = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "createdAt",
  isAscending: false,
  isDeleted: false,
};

const toQueryFilter = (values: CustomerTvRequest, userId?: number): CustomerTvFilter => ({
  tvId: values.tvId,
  tvNumber: values.tvNumber || undefined,
  cityId: values.cityId,
  userId: userId ?? values.userId,
  customerName: userId ? undefined : values.customerName || undefined,
  phoneNumber: userId ? undefined : values.phoneNumber || undefined,
  roleId: userId ? undefined : values.roleId,
  nickname: values.nickname || undefined,
  isSubscriptionActive: values.isSubscriptionActive,
  subscriptionEndsFrom: values.subscriptionEndsFrom,
  subscriptionEndsTo: values.subscriptionEndsTo,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
  removedFrom: values.removedFrom,
  removedTo: values.removedTo,
});

const TvsView = ({ framed, actionsTarget, customer, initialFilter, onChanged }: TvsViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<CustomerTvRequest>(() => ({ ...initialValues, ...initialFilter }));
  const [dialog, setDialog] = useState<TvActionName | "add" | null>(null);
  const [selected, setSelected] = useState<CustomerTvListDto | null>(null);

  const queryFilter = toQueryFilter(values, customer?.id);
  const { data, isLoading, isFetching, refetch } = useGetTvsQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportTvs, { isLoading: isExporting }] = useExportTvsMutation();
  const [refreshSubscription, { isLoading: isRefreshing }] = useRefreshTvSubscriptionMutation();

  const reload = () => {
    refetch();
    onChanged?.();
  };
  const close = () => {
    setDialog(null);
    setSelected(null);
  };

  const refresh = useCallback(
    async (tv: CustomerTvListDto) => {
      try {
        await refreshSubscription(tv.id).unwrap();
        showSuccess(t("tvs.successRefresh"));
        refetch();
      } catch (error) {
        showError(getErrorMessage(error));
      }
    },
    [refreshSubscription, refetch, t]
  );

  const handleAction = useCallback(
    (name: TvActionName, tv: CustomerTvListDto) => {
      if (name === "refresh") {
        refresh(tv);
        return;
      }
      setSelected(tv);
      setDialog(name);
    },
    [refresh]
  );

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <TvFilters
          values={values}
          forCustomer={!!customer}
          onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
          onSearch={refetch}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("tvs.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
              {can(Permission.TvsExport) && <ExportButton loading={isExporting} onExport={() => exportTvs(queryFilter).unwrap()} />}
              {can(Permission.TvsCreate) && (!customer || customer.isActive) && (
                <Button
                  variant="dark"
                  size="md"
                  label={t("tvs.addTv")}
                  icon={<PlusIcon className="h-4 w-4" />}
                  iconPosition="left"
                  onClick={() => setDialog("add")}
                />
              )}
            </PageActions>
          </div>
        </div>
        <TvsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching || isRefreshing}
          filterValues={values}
          showCustomer={!customer}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
          onAction={handleAction}
        />
      </ListContainer>

      {dialog === "add" && <AddCustomerTvModal open customer={customer} onClose={close} onSuccess={reload} />}
      {dialog !== "add" && <TvDialogs dialog={dialog} tv={selected} onClose={close} onSuccess={reload} />}
    </div>
  );
};

export default TvsView;
