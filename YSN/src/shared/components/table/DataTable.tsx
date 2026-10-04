import React from "react";
import { useTranslation } from "react-i18next";
import TableCheckbox from "./TableCheckbox";
import TableHeader from "./TableHeader";
import type { SortDirection, PageSizeOption } from "./TableHeader";
import Pagination from "../navigation/Pagination";
import ChevronUpIcon from "../../../assets/icons/ChevronUpIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";
import FolderIcon from "../../../assets/icons/FolderIcon";
import SimplePagination from "../navigation/SimplePagination";

type ColumnAlign = "left" | "center" | "right";

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  align?: ColumnAlign;
  width?: string;
  minWidth?: string;
  hidden?: boolean;
  responsive?: "sm" | "md" | "lg" | "xl";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  title?: string;
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;
  onRowClick?: (row: T, index: number) => void;
  pageSize?: number;
  pageSizeOptions?: PageSizeOption[];
  onPageSizeChange?: (size: number) => void;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;
  loading?: boolean;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  borderless?: boolean;
  rounded?: boolean;
  headerChildren?: React.ReactNode;
  paginationMode?: "full" | "simple";
  paginationVariant?: "default" | "rounded" | "minimal";
  paginationSize?: "sm" | "md" | "lg";
  clientSidePagination?: boolean;
  clientSideSorting?: boolean;
}

const alignClasses: Record<ColumnAlign, string> = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
};

const responsiveHiddenClasses: Record<string, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

function DataTable<T>({
  columns,
  data,
  rowKey,
  title,
  selectable = false,
  selectedRows,
  onSelectionChange,
  onRowClick,
  pageSize = 10,
  pageSizeOptions,
  onPageSizeChange,
  currentPage = 1,
  totalItems,
  onPageChange,
  sortColumn,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage,
  striped = false,
  hoverable = true,
  compact = false,
  borderless = false,
  rounded = true,
  headerChildren,
  paginationMode = "full",
  paginationVariant = "default",
  paginationSize = "md",
  clientSidePagination = false,
  clientSideSorting = false,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1);
  const [internalPageSize, setInternalPageSize] = React.useState(pageSize);
  const [internalSortCol, setInternalSortCol] = React.useState(sortColumn || "");
  const [internalSortDir, setInternalSortDir] = React.useState<SortDirection>(sortDirection || "asc");
  const { t } = useTranslation();

  const activePage = clientSidePagination ? internalPage : currentPage;
  const activePageSize = clientSidePagination ? internalPageSize : pageSize;
  const activeSortCol = clientSideSorting ? internalSortCol : (sortColumn || "");
  const activeSortDir = clientSideSorting ? internalSortDir : (sortDirection || "asc");

  const processedData = React.useMemo(() => {
    let result = [...data];

    if (clientSideSorting && activeSortCol) {
      const col = columns.find((c) => c.key === activeSortCol);
      if (col?.sortFn) {
        result.sort((a, b) => {
          const cmp = col.sortFn!(a, b);
          return activeSortDir === "asc" ? cmp : -cmp;
        });
      }
    }

    if (clientSidePagination) {
      const start = (activePage - 1) * activePageSize;
      result = result.slice(start, start + activePageSize);
    }

    return result;
  }, [data, clientSideSorting, clientSidePagination, activeSortCol, activeSortDir, activePage, activePageSize, columns]);

  const total = totalItems ?? data.length;
  const totalPages = Math.ceil(total / activePageSize);

  const allKeys = processedData.map((row, i) => rowKey(row, i));
  const allSelected = selectedRows ? allKeys.length > 0 && allKeys.every((k) => selectedRows.has(k)) : false;
  const someSelected = selectedRows ? allKeys.some((k) => selectedRows.has(k)) && !allSelected : false;

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      const next = new Set(selectedRows);
      allKeys.forEach((k) => next.add(k));
      onSelectionChange(next);
    } else {
      const next = new Set(selectedRows);
      allKeys.forEach((k) => next.delete(k));
      onSelectionChange(next);
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    if (!onSelectionChange) return;
    const next = new Set(selectedRows);
    if (checked) {
      next.add(key);
    } else {
      next.delete(key);
    }
    onSelectionChange(next);
  };

  const handleColumnSort = (colKey: string) => {
    if (clientSideSorting) {
      if (internalSortCol === colKey) {
        setInternalSortDir(internalSortDir === "asc" ? "desc" : "asc");
      } else {
        setInternalSortCol(colKey);
        setInternalSortDir("asc");
      }
      return;
    }
    if (!onSort) return;
    if (sortColumn === colKey) {
      onSort(colKey, sortDirection === "asc" ? "desc" : "asc");
    } else {
      onSort(colKey, "asc");
    }
  };

  const handlePageChange = (page: number) => {
    if (clientSidePagination) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };

  const handlePageSizeChange = (size: number) => {
    if (clientSidePagination) {
      setInternalPageSize(size);
      setInternalPage(1);
    }
    onPageSizeChange?.(size);
  };

  const visibleColumns = columns.filter((col) => !col.hidden);
  const cellPadding = compact ? "px-3 py-2 md:px-4" : "px-3 py-3 md:px-4 md:py-3.5";
  const headerPadding = compact ? "px-3 py-2 md:px-4" : "px-3 py-2.5 md:px-4 md:py-3";

  return (
    <div className={`datatable-wrapper ${rounded ? "rounded-xl" : ""} overflow-hidden`}>
      {(title || onPageSizeChange || clientSidePagination || sortDirection || headerChildren) && (
        <TableHeader
          title={title}
          totalItems={total}
          pageSize={activePageSize}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={handlePageSizeChange}
          sortDirection={activeSortDir}
          onSortDirectionChange={
            clientSideSorting && activeSortCol
              ? (dir) => setInternalSortDir(dir)
              : onSort && sortColumn
                ? (dir) => onSort(sortColumn, dir)
                : undefined
          }
          selectedCount={selectedRows ? selectedRows.size : 0}
        >
          {headerChildren}
        </TableHeader>
      )}

      <div className={`datatable-table-scroll ${!borderless ? "datatable-border" : ""}`}>
        <table className="datatable-table w-full min-w-0">
          <thead>
            <tr className="datatable-thead">
              {selectable && (
                <th className={`${headerPadding} w-10 md:w-12`}>
                  <TableCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {visibleColumns.map((col) => {
                const align = col.align || "left";
                const isSorted = activeSortCol === col.key;
                const responsiveClass = col.responsive ? responsiveHiddenClasses[col.responsive] : "";

                return (
                  <th
                    key={col.key}
                    className={`${headerPadding} ${alignClasses[align]} text-xs font-semibold datatable-th uppercase tracking-wider ${responsiveClass} ${col.sortable ? "cursor-pointer select-none datatable-th-sortable transition-colors duration-150" : ""
                      }`}
                    style={{
                      ...(col.width ? { width: col.width } : {}),
                      ...(col.minWidth ? { minWidth: col.minWidth } : {}),
                    }}
                    onClick={col.sortable ? () => handleColumnSort(col.key) : undefined}
                  >
                    <span className={`inline-flex items-center gap-1.5 ${align === "right" ? "flex-row-reverse rtl:flex-row" : ""}`}>
                      {col.header}
                      {col.sortable && (
                        <span className="flex flex-col leading-none">
                          <ChevronUpIcon
                            className={`w-3 h-3 transition-colors duration-150 ${isSorted && activeSortDir === "asc" ? "datatable-sort-active" : "datatable-sort-inactive"
                              }`}
                            strokeWidth="2.5"
                          />
                          <ChevronDownIcon
                            className={`w-3 h-3 -mt-1 transition-colors duration-150 ${isSorted && activeSortDir === "desc" ? "datatable-sort-active" : "datatable-sort-inactive"
                              }`}
                            strokeWidth="2.5"
                          />
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y datatable-divider">
            {loading ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  className="px-4 py-16 text-center"
                >
                  <div className="inline-flex flex-col items-center gap-3">
                    <SpinnerIcon className="w-8 h-8 datatable-loading-icon animate-spin" />
                    <span className="text-sm datatable-loading-text">{t("common.loading")}</span>
                  </div>
                </td>
              </tr>
            ) : processedData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  className="px-4 py-16 text-center"
                >
                  <div className="inline-flex flex-col items-center gap-2">
                    <FolderIcon className="w-12 h-12 datatable-empty-icon" strokeWidth="1" />
                    <span className="text-sm datatable-empty-text">{emptyMessage || t("common.noData")}</span>
                  </div>
                </td>
              </tr>
            ) : (
              processedData.map((row, rowIdx) => {
                const key = rowKey(row, rowIdx);
                const isSelected = selectedRows?.has(key) ?? false;

                const rowClass = [
                  "transition-colors duration-100",
                  isSelected ? "datatable-row-selected" : "",
                  !isSelected && striped && rowIdx % 2 === 1 ? "datatable-row-striped" : "",
                  hoverable && !isSelected ? "datatable-row-hover" : "",
                  onRowClick ? "cursor-pointer" : "",
                ].join(" ");

                return (
                  <tr
                    key={key}
                    className={rowClass}
                    onClick={onRowClick ? () => onRowClick(row, rowIdx) : undefined}
                  >
                    {selectable && (
                      <td
                        className={`${cellPadding} w-10 md:w-12`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TableCheckbox
                          checked={isSelected}
                          onChange={(checked) => handleSelectRow(key, checked)}
                        />
                      </td>
                    )}
                    {visibleColumns.map((col) => {
                      const align = col.align || "left";
                      const responsiveClass = col.responsive ? responsiveHiddenClasses[col.responsive] : "";
                      return (
                        <td
                          key={col.key}
                          className={`${cellPadding} ${alignClasses[align]} text-sm datatable-td ${responsiveClass}`}
                          style={{
                            ...(col.width ? { width: col.width } : {}),
                            ...(col.minWidth ? { minWidth: col.minWidth } : {}),
                          }}
                        >
                          {col.render ? col.render(row, rowIdx) : String((row as Record<string, unknown>)[col.key] ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {(onPageChange || clientSidePagination) && (
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3 sm:grid-cols-3 ${!borderless ? "datatable-footer" : "datatable-footer-borderless"} ${rounded ? "rounded-b-xl" : ""}`}>
          <span className="text-center text-sm datatable-showing order-2 sm:order-1 sm:text-start">
            {t("pagination.showing", { from: Math.min((activePage - 1) * activePageSize + 1, total), to: Math.min(activePage * activePageSize, total), total })}
          </span>
          <div className="order-1 flex justify-center sm:order-2">
            {paginationMode === "simple" ? (
              <SimplePagination
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                variant={paginationVariant}
                size={paginationSize}
                showPageInfo={false}
              />
            ) : (
              <Pagination
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                variant={paginationVariant}
                size={paginationSize}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export type { Column, DataTableProps };
export default DataTable;
