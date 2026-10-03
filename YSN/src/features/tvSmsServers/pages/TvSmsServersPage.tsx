import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import useViewMode from "../../../shared/hooks/useViewMode";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import ViewModeSwitch from "../../../shared/components/navigation/ViewModeSwitch";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import { Permission } from "../../../shared/types/Permissions.types";
import { ViewMode, type ViewModeType } from "../../../shared/types/ViewMode.types";
import PlusIcon from "../../../assets/icons/PlusIcon";
import ServerIcon from "../../../assets/icons/ServerIcon";
import { useExportTvSmsServersMutation, useGetTvSmsServersQuery } from "../api/TvSmsServers.api";
import useTvSmsServerActions, { type TvSmsServerDialogName } from "../hooks/useTvSmsServerActions";
import TvSmsServerFilters from "../components/TvSmsServerFilters";
import TvSmsServersList from "../components/TvSmsServersList";
import TvSmsServerModal from "../components/TvSmsServerModal";
import DeleteTvSmsServerAlert from "../components/DeleteTvSmsServerAlert";
import RestoreTvSmsServerAlert from "../components/RestoreTvSmsServerAlert";
import type { TvSmsServerFilter, TvSmsServerListDto, TvSmsServerRequest } from "../types/TvSmsServers.types";

const CARD_PAGE_SIZE = 24;
const TABLE_PAGE_SIZE = 25;

const emptyFilter: TvSmsServerRequest = {
  pageNumber: 1,
  pageSize: CARD_PAGE_SIZE,
  sortBy: "name",
  isAscending: true,
  isDeleted: false,
};

const toQueryFilter = (values: TvSmsServerRequest): TvSmsServerFilter => ({
  name: values.name || undefined,
  baseUrl: values.baseUrl || undefined,
  smsUserId: values.smsUserId || undefined,
  cityId: values.cityId,
  isActive: values.isActive,
  isDeleted: values.isDeleted,
  fromDate: values.fromDate,
  toDate: values.toDate,
});

const TvSmsServersPage = () => {
  const { t } = useTranslation();
  useTitle(t("tvSmsServers.pageTitle"));
  const { can } = usePermission();

  const [viewMode, setViewMode] = useViewMode("tvSmsServers");
  const pageSizeFor = (mode: ViewModeType) => (mode === ViewMode.Cards ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE);
  const [values, setValues] = useState<TvSmsServerRequest>(() => ({ ...emptyFilter, pageSize: pageSizeFor(viewMode) }));
  const [dialog, setDialog] = useState<TvSmsServerDialogName | null>(null);
  const [selected, setSelected] = useState<TvSmsServerListDto | null>(null);

  const queryFilter = toQueryFilter(values);
  const { data, isLoading, isFetching, refetch } = useGetTvSmsServersQuery(
    { ...queryFilter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportServers, { isLoading: isExporting }] = useExportTvSmsServersMutation();

  const openDialog = useCallback((name: TvSmsServerDialogName, server: TvSmsServerListDto | null) => {
    setSelected(server);
    setDialog(name);
  }, []);
  const closeDialog = () => {
    setDialog(null);
    setSelected(null);
  };
  const getActions = useTvSmsServerActions(openDialog);

  const handleViewModeChange = (mode: ViewModeType) => {
    setViewMode(mode);
    setValues((previous) => ({ ...previous, pageNumber: 1, pageSize: pageSizeFor(mode) }));
  };

  const totalCount = data?.totalCount || 0;

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("tvSmsServers.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.settings") }, { label: t("tvSmsServers.pageTitle") }]}
        variant="gradient"
        icon={<ServerIcon />}
        showDate
        animated
        actions={
          <div className="flex items-center gap-2">
            {can(Permission.TvSmsServersExport) && (
              <ExportButton loading={isExporting} onExport={() => exportServers(queryFilter).unwrap()} />
            )}
            {can(Permission.TvSmsServersCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("tvSmsServers.addServer")}
                onClick={() => openDialog("form", null)}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
              />
            )}
          </div>
        }
      />

      <Card variant="elevated" padding="md">
        <TvSmsServerFilters
          values={values}
          onChange={(name, value) => setValues((previous) => ({ ...previous, pageNumber: 1, [name]: value }))}
          onSearch={refetch}
          onClear={() => setValues({ ...emptyFilter, pageSize: pageSizeFor(viewMode) })}
        />
      </Card>

      <Card variant="elevated" padding="md">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("tvSmsServers.pageTitle")} <span className="list-header-count">({totalCount})</span>
          </h3>
          <ViewModeSwitch value={viewMode} onChange={handleViewModeChange} />
        </div>
        <TvSmsServersList
          viewMode={viewMode}
          items={data?.items || []}
          totalCount={totalCount}
          loading={isLoading || isFetching}
          values={values}
          onChange={(changes) => setValues((previous) => ({ ...previous, ...changes }))}
          getActions={getActions}
        />
      </Card>

      {dialog === "form" && <TvSmsServerModal open serverId={selected?.id ?? null} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "delete" && selected && <DeleteTvSmsServerAlert open server={selected} onClose={closeDialog} onSuccess={refetch} />}
      {dialog === "restore" && selected && <RestoreTvSmsServerAlert open server={selected} onClose={closeDialog} onSuccess={refetch} />}
    </div>
  );
};

export default TvSmsServersPage;
