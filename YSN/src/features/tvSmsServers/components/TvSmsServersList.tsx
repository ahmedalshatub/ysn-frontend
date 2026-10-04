import CardGrid from "../../../shared/components/cards/CardGrid";
import { ViewMode, type ViewModeType } from "../../../shared/types/ViewMode.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import TvSmsServerCard from "./TvSmsServerCard";
import TvSmsServersTable from "./TvSmsServersTable";
import type { TvSmsServerListDto, TvSmsServerRequest } from "../types/TvSmsServers.types";

interface TvSmsServersListProps {
  viewMode: ViewModeType;
  items: TvSmsServerListDto[];
  totalCount: number;
  loading: boolean;
  values: TvSmsServerRequest;
  onChange: (changes: Partial<TvSmsServerRequest>) => void;
  getActions: (server: TvSmsServerListDto) => ActionItem[];
}

const TvSmsServersList = ({ viewMode, items, totalCount, loading, values, onChange, getActions }: TvSmsServersListProps) => {
  const onPageChange = (page: number) => onChange({ pageNumber: page });
  const onPageSizeChange = (size: number) => onChange({ pageSize: size, pageNumber: 1 });

  if (viewMode === ViewMode.Cards) {
    return (
      <CardGrid
        items={items}
        totalCount={totalCount}
        loading={loading}
        pageNumber={values.pageNumber || 1}
        pageSize={values.pageSize || 24}
        onPageChange={onPageChange}
        rowKey={(server) => server.id}
        renderItem={(server) => <TvSmsServerCard server={server} actions={getActions(server)} />}
      />
    );
  }

  return (
    <TvSmsServersTable
      items={items}
      totalCount={totalCount}
      loading={loading}
      filterValues={values}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onSort={(column: string, direction: SortDirection) =>
        onChange({ sortBy: column, isAscending: direction === "asc", pageNumber: 1 })
      }
      getActions={getActions}
    />
  );
};

export default TvSmsServersList;
