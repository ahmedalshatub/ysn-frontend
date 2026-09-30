import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../buttons/Button";
import SearchIcon from "../../../assets/icons/SearchIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import FilterIcon from "../../../assets/icons/FilterIcon";

interface FilterAccordionProps {
  onSearch?: () => void;
  onClear?: () => void;
  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  searchLabel?: string;
  clearLabel?: string;
  filtersLabel?: string;
}

const FilterAccordion = ({
  onSearch,
  onClear,
  children,
  className = "",
  defaultOpen = false,
  searchLabel,
  clearLabel,
  filtersLabel,
}: FilterAccordionProps) => {
  const { t } = useTranslation();
  const resolvedSearchLabel = searchLabel ?? t("filters.search");
  const resolvedClearLabel = clearLabel ?? "";
  const resolvedFiltersLabel = filtersLabel ?? t("filters.filters");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.offsetHeight : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;
    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.offsetHeight);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className={`filter-accordion ${className}`}>
      <div className={`filter-toolbar ${isOpen ? "filter-toolbar-open" : ""}`}>
        <div className="filter-toolbar-actions">
          <Button
            variant="primary"
            label={resolvedSearchLabel}
            icon={<SearchIcon className="w-4 h-4" />}
            iconPosition="left"
            size="md"
            onClick={onSearch}
          />
          <Button
            variant="secondary"
            outline
            label={resolvedFiltersLabel}
            icon={
              <FilterIcon
                className="w-4 h-4"
              />
            }
            iconPosition="right"
            size="md"
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <Button
            variant="danger"
            outline
            label={resolvedClearLabel}
            icon={<XCircleIcon className="w-4 h-4" />}
            iconPosition="left"
            size="lg"
            onClick={onClear}
          />
        </div>
      </div>

      <div
        className="filter-accordion-body-wrapper"
        style={{ height }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="filter-accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export type { FilterAccordionProps };
export default FilterAccordion;
