import { useState, useCallback } from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

interface TreeTableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

const alignClasses = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
} as const;

interface TreeTableRow {
  id: string;
  [key: string]: unknown;
  children?: TreeTableRow[];
}

interface TreeTableProps<T extends TreeTableRow> {
  data: T[];
  columns: TreeTableColumn<T>[];
  defaultExpanded?: string[];
  expanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  emptyMessage?: string;
  selectable?: boolean;
  onSelect?: (ids: string[]) => void;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  className?: string;
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <ChevronRightIcon
    className={`treetable-chevron ${expanded ? "treetable-chevron-open" : ""}`}
    width="14"
    height="14"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const getAllChildIds = (row: TreeTableRow): string[] => {
  const ids: string[] = [row.id];
  if (row.children) row.children.forEach((c) => ids.push(...getAllChildIds(c)));
  return ids;
};

function TreeTableRowComponent<T extends TreeTableRow>({
  row,
  columns,
  level,
  expanded,
  selected,
  selectable,
  onToggle,
  onSelect,
}: {
  row: T;
  columns: TreeTableColumn<T>[];
  level: number;
  expanded: Set<string>;
  selected: Set<string>;
  selectable: boolean;
  onToggle: (id: string) => void;
  onSelect: (row: T) => void;
}) {
  const hasChildren = row.children && row.children.length > 0;
  const isExpanded = expanded.has(row.id);
  const isSelected = selected.has(row.id);

  const childIds = hasChildren ? getAllChildIds(row).slice(1) : [];
  const allChildrenSelected = childIds.length > 0 && childIds.every((id) => selected.has(id));
  const someChildrenSelected = childIds.length > 0 && childIds.some((id) => selected.has(id)) && !allChildrenSelected;
  const checkState = hasChildren
    ? allChildrenSelected ? "checked" : someChildrenSelected ? "indeterminate" : isSelected ? "checked" : "unchecked"
    : isSelected ? "checked" : "unchecked";

  return (
    <>
      <tr className={`treetable-row ${isSelected || allChildrenSelected ? "treetable-row-selected" : ""}`}>
        {selectable && (
          <td className="treetable-cell treetable-check-cell">
            <span
              className={`treetable-checkbox treetable-checkbox-${checkState}`}
              onClick={() => onSelect(row)}
            >
              {checkState === "checked" && (
                <CheckIcon width="10" height="10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {checkState === "indeterminate" && <span className="treetable-checkbox-dash" />}
            </span>
          </td>
        )}
        {columns.map((col, colIdx) => (
          <td
            key={col.key}
            className={`treetable-cell ${alignClasses[col.align ?? "left"]}`}
            style={col.width ? { width: col.width } : undefined}
          >
            <div
              className="treetable-cell-content"
              style={colIdx === 0 ? { paddingInlineStart: `${level * 24 + 4}px` } : undefined}
            >
              {colIdx === 0 && (
                <span
                  className="treetable-toggle"
                  onClick={() => hasChildren && onToggle(row.id)}
                >
                  {hasChildren ? <ChevronIcon expanded={isExpanded} /> : <span className="treetable-toggle-spacer" />}
                </span>
              )}
              <span className="treetable-cell-text">
                {col.render ? col.render(row) : String(row[col.key] ?? "")}
              </span>
            </div>
          </td>
        ))}
      </tr>
      {hasChildren && isExpanded &&
        row.children!.map((child) => (
          <TreeTableRowComponent
            key={child.id}
            row={child as T}
            columns={columns}
            level={level + 1}
            expanded={expanded}
            selected={selected}
            selectable={selectable}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
    </>
  );
}

function TreeTable<T extends TreeTableRow>({
  data,
  columns,
  defaultExpanded = [],
  expanded: expandedProp,
  onExpandedChange,
  emptyMessage,
  selectable = false,
  onSelect,
  striped = false,
  bordered = false,
  compact = false,
  className = "",
}: TreeTableProps<T>) {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set(defaultExpanded));
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const expanded = expandedProp ? new Set(expandedProp) : internalExpanded;

  const handleToggle = useCallback(
    (id: string) => {
      const apply = (prev: Set<string>) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onExpandedChange?.(Array.from(next));
        return next;
      };

      if (expandedProp) {
        apply(new Set(expandedProp));
        return;
      }
      setInternalExpanded(apply);
    },
    [expandedProp, onExpandedChange]
  );

  const handleSelect = useCallback(
    (row: T) => {
      setSelected((prev) => {
        const next = new Set(prev);
        const allIds = getAllChildIds(row);
        const allSelected = allIds.every((id) => next.has(id));
        allIds.forEach((id) => {
          if (allSelected) next.delete(id);
          else next.add(id);
        });
        onSelect?.(Array.from(next));
        return next;
      });
    },
    [onSelect]
  );

  return (
    <div className={`treetable-wrapper ${className}`}>
      <table className={`treetable ${striped ? "treetable-striped" : ""} ${bordered ? "treetable-bordered" : ""} ${compact ? "treetable-compact" : ""}`}>
        <thead>
          <tr>
            {selectable && <th className="treetable-th treetable-check-cell" />}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`treetable-th ${alignClasses[col.align ?? "left"]}`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && emptyMessage && (
            <tr className="treetable-row">
              <td
                className="treetable-cell text-center"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <TreeTableRowComponent
              key={row.id}
              row={row}
              columns={columns}
              level={0}
              expanded={expanded}
              selected={selected}
              selectable={selectable}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { TreeTableProps, TreeTableColumn, TreeTableRow };
export default TreeTable;
