import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../buttons/Button";
import Drawer from "./Drawer";
import type { DrawerPosition, DrawerSize } from "./Drawer";
import SearchIcon from "../../../assets/icons/SearchIcon";
import FilterIcon from "../../../assets/icons/FilterIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";

interface FilterDrawerProps {
  onSearch?: () => void;
  onClear?: () => void;
  children?: React.ReactNode;
  className?: string;
  drawerTitle?: string;
  searchLabel?: string;
  clearLabel?: string;
  filtersLabel?: string;
  drawerPosition?: DrawerPosition;
  drawerSize?: DrawerSize;
}

const FilterDrawer = ({
  onSearch,
  onClear,
  children,
  className = "",
  drawerTitle,
  searchLabel,
  clearLabel,
  filtersLabel,
  drawerPosition = "right",
  drawerSize = "md",
}: FilterDrawerProps) => {
  const { t } = useTranslation();
  const resolvedSearchLabel = searchLabel ?? t("filters.search");
  const resolvedClearLabel = clearLabel ?? t("filters.clear");
  const resolvedFiltersLabel = filtersLabel ?? t("filters.filters");
  const resolvedDrawerTitle = drawerTitle ?? t("filters.filters");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    setOpen(false);
    onSearch?.();
  };

  return (
    <>
      <div className={`filter-drawer ${className}`}>
        <div className="filter-toolbar">
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
              icon={<FilterIcon className="w-4 h-4" />}
              iconPosition="left"
              size="md"
              onClick={() => setOpen(true)}
            />
            <Button
              variant="danger"
              outline
              label={resolvedClearLabel}
              icon={<XCircleIcon className="w-4 h-4" />}
              iconPosition="left"
              size="md"
              onClick={onClear}
            />
          </div>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position={drawerPosition}
        size={drawerSize}
        title={resolvedDrawerTitle}
        icon={<FilterIcon className="w-5 h-5" />}
        footer={
          <div className="filter-drawer-footer">
            <Button
              variant="secondary"
              outline
              label={resolvedClearLabel}
              icon={<XCircleIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={onClear}
              block
            />
            <Button
              variant="primary"
              label={resolvedSearchLabel}
              icon={<SearchIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={handleSearch}
              block
            />
          </div>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export type { FilterDrawerProps };
export default FilterDrawer;
