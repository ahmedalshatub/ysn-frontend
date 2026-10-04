import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ChevronUpIcon from "../../../assets/icons/ChevronUpIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import ArrowUpDownIcon from "../../../assets/icons/ArrowUpDownIcon";

interface SortableListProps<T> {
  items: T[];
  rowKey: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  onChange: (items: T[]) => void;
}

const moveItem = <T,>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

const SortableList = <T,>({ items, rowKey, renderItem, onChange }: SortableListProps<T>) => {
  const { t } = useTranslation();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const drop = (index: number) => {
    if (dragIndex !== null && dragIndex !== index) onChange(moveItem(items, dragIndex, index));
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <ol className="sortable-list">
      {items.map((item, index) => (
        <li
          key={rowKey(item)}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(event) => {
            event.preventDefault();
            setOverIndex(index);
          }}
          onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
          onDrop={() => drop(index)}
          onDragEnd={() => {
            setDragIndex(null);
            setOverIndex(null);
          }}
          className={`sortable-list-item ${dragIndex === index ? "sortable-list-item-dragging" : ""} ${overIndex === index && dragIndex !== index ? "sortable-list-item-over" : ""}`}
        >
          <span className="sortable-list-handle" title={t("common.dragToReorder")}>
            <ArrowUpDownIcon className="h-4 w-4" />
          </span>
          <span className="sortable-list-position">{index + 1}</span>
          <div className="min-w-0 flex-1">{renderItem(item)}</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="sortable-list-move"
              disabled={index === 0}
              aria-label={t("common.moveUp")}
              onClick={() => onChange(moveItem(items, index, index - 1))}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="sortable-list-move"
              disabled={index === items.length - 1}
              aria-label={t("common.moveDown")}
              onClick={() => onChange(moveItem(items, index, index + 1))}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default SortableList;
