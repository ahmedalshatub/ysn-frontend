import { useTranslation } from "react-i18next";
import Loader from "../feedback/Loader";
import Pagination from "../navigation/Pagination";
import Select from "../inputs/Select";

interface CardGridProps<T> {
  items: T[];
  totalCount: number;
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}

const pageSizeOptions = [
  { value: 12, name: "12" },
  { value: 24, name: "24" },
  { value: 48, name: "48" },
];

const CardGrid = <T,>({
  items,
  totalCount,
  loading,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  rowKey,
  renderItem,
}: CardGridProps<T>) => {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="card-grid-empty">{t("common.noData")}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((item) => (
          <div key={rowKey(item)}>{renderItem(item)}</div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="card-grid-total">{t("common.totalItems", { count: totalCount })}</span>
          <div className="w-24">
            <Select
              name="pageSize"
              value={pageSize}
              onChange={(value) => onPageSizeChange(Number(value))}
              options={pageSizeOptions}
              valueKey="value"
              labelKey="name"
              size="sm"
            />
          </div>
        </div>
        {totalPages > 1 && <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} size="sm" />}
      </div>
    </div>
  );
};

export default CardGrid;
