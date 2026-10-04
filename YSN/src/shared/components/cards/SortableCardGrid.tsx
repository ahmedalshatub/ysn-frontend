import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../feedback/Loader";

interface SortableCardGridProps<T> {
  items: T[];
  loading: boolean;
  rowKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const SortableCardGrid = <T,>({ items, loading, rowKey, renderItem, onMove }: SortableCardGridProps<T>) => {
  const { t } = useTranslation();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const reset = () => {
    setDragIndex(null);
    setDropIndex(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (items.length === 0) return <p className="card-grid-empty">{t("common.noData")}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={rowKey(item)}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(event) => {
            event.preventDefault();
            setDropIndex(index);
          }}
          onDrop={() => {
            if (dragIndex !== null && dragIndex !== index) onMove(dragIndex, index);
            reset();
          }}
          onDragEnd={reset}
          className={`sortable-card ${dragIndex === index ? "sortable-card-dragging" : ""} ${dropIndex === index && dragIndex !== index ? "sortable-card-drop-target" : ""}`}
        >
          <span className="sortable-card-position">{index + 1}</span>
          <div className="pointer-events-none h-full">{renderItem(item)}</div>
        </div>
      ))}
    </div>
  );
};

export default SortableCardGrid;
