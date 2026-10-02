import React from "react";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "rounded" | "minimal";
  showPageInfo?: boolean;
}

const sizeClasses = {
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  lg: "h-11 px-4.5 text-base gap-2.5",
};

const iconSize = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const variantBase = {
  default: "rounded-lg",
  rounded: "rounded-full",
  minimal: "rounded-lg",
};

const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  variant = "default",
  showPageInfo = true,
}) => {

  const btnBase = [
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none",
    sizeClasses[size],
    variantBase[variant],
  ].join(" ");

  const activeClass =
    variant === "minimal"
      ? "simple-pagination-active-minimal"
      : "simple-pagination-active";

  const disabledClass =
    variant === "minimal"
      ? "simple-pagination-disabled"
      : "simple-pagination-disabled-bordered";

  const infoSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <nav className="pagination-nav flex items-center gap-3">
      <button
        type="button"
        className={`pagination-prev ${btnBase} ${currentPage <= 1 ? disabledClass : activeClass} cursor-pointer`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className={iconSize[size]} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {showPageInfo && (
        <span className={`${infoSizeClasses[size]} simple-pagination-info tabular-nums whitespace-nowrap`}>
          <span className="hidden sm:inline">Page </span>
          <span className="font-medium simple-pagination-info-bold">{currentPage}</span>
          <span className="hidden sm:inline"> of </span>
          <span className="sm:hidden"> / </span>
          <span className="font-medium simple-pagination-info-bold">{totalPages}</span>
        </span>
      )}

      <button
        type="button"
        className={`pagination-next ${btnBase} ${currentPage >= totalPages ? disabledClass : activeClass} cursor-pointer`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className={iconSize[size]} />
      </button>
    </nav>
  );
};

export default SimplePagination;
