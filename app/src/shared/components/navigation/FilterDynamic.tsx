import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../buttons/Button";
import SearchIcon from "../../../assets/icons/SearchIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import XIcon from "../../../assets/icons/XIcon";

export interface FilterOption {
  key: string;
  label: string;
  component: React.ReactNode;
}

interface FilterDynamicProps {
  filters: FilterOption[];
  onSearch?: () => void;
  onClear?: () => void;
  className?: string;
  searchLabel?: string;
  clearLabel?: string;
  addFilterLabel?: string;
}

const FilterDynamic = ({
  filters,
  onSearch,
  onClear,
  className = "",
  searchLabel,
  clearLabel,
  addFilterLabel,
}: FilterDynamicProps) => {
  const { t } = useTranslation();
  const resolvedSearchLabel = searchLabel ?? t("filters.search");
  const resolvedClearLabel = clearLabel ?? t("filters.clear");
  const resolvedAddFilterLabel = addFilterLabel ?? t("filters.addFilter");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableFilters = filters.filter((f) => !activeKeys.includes(f.key));
  const activeFilters = activeKeys
    .map((key) => filters.find((f) => f.key === key))
    .filter(Boolean) as FilterOption[];

  const addFilter = (key: string) => {
    setActiveKeys((prev) => [...prev, key]);
    setDropdownOpen(false);
  };

  const removeFilter = (key: string) => {
    setActiveKeys((prev) => prev.filter((k) => k !== key));
  };

  const handleClear = () => {
    setActiveKeys([]);
    onClear?.();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  return (
    <div className={`filter-dynamic ${className}`}>
      <div className={`filter-dynamic-toolbar ${activeFilters.length > 0 ? "filter-dynamic-toolbar-open" : ""}`}>
        <div className="filter-toolbar-actions">
          <Button
            variant="primary"
            label={resolvedSearchLabel}
            icon={<SearchIcon className="w-4 h-4" />}
            iconPosition="left"
            size="md"
            onClick={onSearch}
          />

          <div className="filter-dynamic-add-wrapper" ref={dropdownRef}>
            <Button
              variant="secondary"
              outline
              label={resolvedAddFilterLabel}
              icon={<PlusIcon className="w-4 h-4" />}
              iconPosition="left"
              size="md"
              disabled={availableFilters.length === 0}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && availableFilters.length > 0 && (
              <div className="filter-dynamic-dropdown">
                {availableFilters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    className="filter-dynamic-dropdown-item"
                    onClick={() => addFilter(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="danger"
            outline
            label={resolvedClearLabel}
            icon={<XCircleIcon className="w-4 h-4" />}
            iconPosition="left"
            size="md"
            onClick={handleClear}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="filter-dynamic-body">
          {activeFilters.map((f) => (
            <div key={f.key} className="filter-dynamic-row">
              <span className="filter-dynamic-label">{f.label}</span>
              <div className="filter-dynamic-component">{f.component}</div>
              <Button
                variant="secondary"
                size="sm"
                iconOnly
                icon={<XIcon className="w-4 h-4" />}
                onClick={() => removeFilter(f.key)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export type { FilterDynamicProps };
export default FilterDynamic;
