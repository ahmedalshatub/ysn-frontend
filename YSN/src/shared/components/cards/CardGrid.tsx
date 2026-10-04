import { useTranslation } from "react-i18next";
import Loader from "../feedback/Loader";
import Pagination from "../navigation/Pagination";

interface CardGridProps<T> {
  items: T[];
  totalCount: number;
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  rowKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}

const CardGrid = <T,>({ items, totalCount, loading, pageNumber, pageSize, onPageChange, rowKey, renderItem }: CardGridProps<T>) => {
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
      <div className="flex flex-col items-center gap-2">
        {totalPages > 1 && <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} size="sm" />}
        <span className="card-grid-total">{t("common.totalItems", { count: totalCount })}</span>
      </div>
    </div>
  );
};

export default CardGrid;
