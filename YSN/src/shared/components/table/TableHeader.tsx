import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SortAscIcon from "../../../assets/icons/SortAscIcon";
import SortDescIcon from "../../../assets/icons/SortDescIcon";

type SortDirection = "asc" | "desc";

interface PageSizeOption {
  label: string;
  value: number;
}

interface TableHeaderProps {
  title?: string;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: PageSizeOption[];
  onPageSizeChange: (size: number) => void;
  sortDirection?: SortDirection;
  onSortDirectionChange?: (dir: SortDirection) => void;
  sortLabel?: string;
  selectedCount?: number;
  children?: React.ReactNode;
}

const defaultPageSizeOptions: PageSizeOption[] = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  totalItems,
  pageSize,
  pageSizeOptions = defaultPageSizeOptions,
  onPageSizeChange,
  sortDirection,
  onSortDirectionChange,
  sortLabel,
  selectedCount = 0,
  children,
}) => {
  const { t } = useTranslation();
  const [pageSizeOpen, setPageSizeOpen] = React.useState(false);
  const pageSizeRef = React.useRef<HTMLDivElement>(null);
  const pageSizeBtnRef = React.useRef<HTMLButtonElement>(null);
  const pageSizeMenuRef = React.useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = React.useState<React.CSSProperties>({ visibility: "hidden" });

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        pageSizeBtnRef.current && !pageSizeBtnRef.current.contains(e.target as Node) &&
        pageSizeMenuRef.current && !pageSizeMenuRef.current.contains(e.target as Node)
      ) {
        setPageSizeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  React.useLayoutEffect(() => {
    if (!pageSizeOpen) return;
    requestAnimationFrame(() => {
      if (!pageSizeBtnRef.current || !pageSizeMenuRef.current) return;
      const rect = pageSizeBtnRef.current.getBoundingClientRect();
      const menuH = pageSizeMenuRef.current.offsetHeight;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      let top: number | undefined;
      let bottom: number | undefined;
      if (rect.bottom + 4 + menuH > vh && rect.top - 4 - menuH > 0) {
        bottom = vh - rect.top + 4;
      } else {
        top = Math.min(rect.bottom + 4, vh - menuH - 8);
      }

      setMenuPos({ top, bottom, right: vw - rect.right, visibility: "visible" });
    });
  }, [pageSizeOpen]);

  return (
    <div className="table-header flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-t-xl">
      <div className="flex items-center gap-3 min-w-0">
        {title && (
          <h3 className="text-base font-semibold table-header-title truncate">{title}</h3>
        )}
        <span className="text-sm table-header-count whitespace-nowrap">
          {totalItems} {totalItems === 1 ? t("table.item") : t("table.items")}
        </span>
        {selectedCount > 0 && (
          <span className="inline-flex items-center rounded-full table-header-selected px-2.5 py-0.5 text-xs font-medium">
            {selectedCount} {t("table.selected")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
        {children}

        <div ref={pageSizeRef}>
          <button
            ref={pageSizeBtnRef}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg table-header-btn px-3 py-1.5 text-sm transition-colors duration-150 cursor-pointer"
            onClick={() => setPageSizeOpen(!pageSizeOpen)}
          >
            <span className="table-header-btn-label">{t("table.show")}</span>
            <span className="table-header-btn-value">{pageSize}</span>
            <ChevronDownIcon
              className={`select-arrow-icon w-3.5 h-3.5 ${pageSizeOpen ? "select-arrow-rotated" : ""}`}
            />
          </button>

          {pageSizeOpen && ReactDOM.createPortal(
            <div
              ref={pageSizeMenuRef}
              className="select-dropdown fixed z-[9999] rounded-xl shadow-lg ring-1 ring-black/5 py-1 min-w-[100px] select-open"
              style={menuPos}
            >
              {pageSizeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`w-full px-3 py-1.5 text-sm text-start transition-colors duration-100 cursor-pointer ${
                    pageSize === opt.value
                      ? "table-header-menu-active"
                      : "table-header-menu-item"
                  }`}
                  onClick={() => {
                    onPageSizeChange(opt.value);
                    setPageSizeOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>

        {sortDirection && onSortDirectionChange && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg table-header-btn px-3 py-1.5 text-sm transition-colors duration-150 cursor-pointer"
            onClick={() =>
              onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            <span className="table-header-btn-label">{sortLabel || t("table.sortBy")}</span>
            {sortDirection === "asc" ? (
              <SortAscIcon className="h-4 w-4 datatable-sort-active" />
            ) : (
              <SortDescIcon className="h-4 w-4 datatable-sort-active" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export type { SortDirection, PageSizeOption };
export default TableHeader;
