import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../../shared/components/buttons/ExportButton";
import PageActions from "../../../../shared/components/navigation/PageActions";
import ListContainer from "../../../../shared/components/cards/ListContainer";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { useExportTvActivationsMutation, useGetTvActivationsQuery } from "../../api/TvActivations.api";
import TvActivationFilters from "./TvActivationFilters";
import TvActivationsTable from "./TvActivationsTable";
import TvActivationDetailsModal from "./TvActivationDetailsModal";
import ResolveTvActivationModal from "./ResolveTvActivationModal";
import type { TvActivationFilter, TvActivationListDto, TvActivationRequest } from "../../types/TvActivations.types";

interface TvActivationsViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  fixedFilter?: TvActivationFilter;
  initialFilter?: Partial<TvActivationRequest>;
}

const initialValues: TvActivationRequest = { pageNumber: 1, pageSize: 25, sortBy: "createdAt", isAscending: false };

const toQueryFilter = (values: TvActivationRequest, fixedFilter?: TvActivationFilter): TvActivationFilter => ({
  customerTvId: values.customerTvId,
  tvId: values.tvId,
  tvNumber: values.tvNumber || undefined,
  cityId: values.cityId,
  userId: values.userId,
  customerName: values.customerName || undefined,
  roleId: values.roleId,
  cardTypeId: values.cardTypeId,
  cardCategoryId: values.cardCategoryId,
  source: values.source,
  kind: values.kind,
  status: values.status,
  needsChecking: values.needsChecking,
  channel: values.channel,
  fromDate: values.fromDate,
  toDate: values.toDate,
  completedFrom: values.completedFrom,
  completedTo: values.completedTo,
  ...fixedFilter,
});

const TvActivationsView = ({ framed, actionsTarget, fixedFilter, initialFilter }: TvActivationsViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<TvActivationRequest>(() => ({ ...initialValues, ...initialFilter }));
  const [dialog, setDialog] = useState<"view" | "resolve" | null>(null);
  const [selected, setSelected] = useState<TvActivationListDto | null>(null);
  const forTv = !!fixedFilter?.tvId || !!fixedFilter?.customerTvId;

  const queryFilter = toQueryFilter(values, fixedFilter);
  const { data, isLoading, isFetching, refetch } = useGetTvActivationsQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportActivations, { isLoading: isExporting }] = useExportTvActivationsMutation();

  const open = useCallback((name: "view" | "resolve", activation: TvActivationListDto) => {
    setSelected(activation);
    setDialog(name);
  }, []);
  const handleView = useCallback((activation: TvActivationListDto) => open("view", activation), [open]);
  const handleResolve = useCallback((activation: TvActivationListDto) => open("resolve", activation), [open]);
  const close = () => {
    setDialog(null);
    setSelected(null);
  };

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <TvActivationFilters
          values={values}
          forTv={forTv}
          onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
          onSearch={refetch}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("tvActivations.pageTitle")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <PageActions target={actionsTarget}>
            {can(Permission.TvsExport) && (
              <ExportButton loading={isExporting} onExport={() => exportActivations(queryFilter).unwrap()} />
            )}
          </PageActions>
        </div>
        <TvActivationsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={values}
          showTv={!forTv}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
          onView={handleView}
          onResolve={handleResolve}
        />
      </ListContainer>

      {dialog === "view" && selected && <TvActivationDetailsModal open activationId={selected.id} onClose={close} />}
      {dialog === "resolve" && selected && (
        <ResolveTvActivationModal open activation={selected} onClose={close} onSuccess={refetch} />
      )}
    </div>
  );
};

export default TvActivationsView;
