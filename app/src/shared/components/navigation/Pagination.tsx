import React from "react";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "rounded" | "minimal";
  showEdges?: boolean;
}

const sizeClasses = {
  sm: "h-7 min-w-7 px-2 text-xs",
  md: "h-9 min-w-9 px-3 text-sm",
  lg: "h-11 min-w-11 px-4 text-base",
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

const generateRange = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const buildPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  showEdges: boolean
): (number | "dots")[] => {
  const totalSlots = siblingCount * 2 + 5;

  if (totalPages <= totalSlots) {
    return generateRange(1, totalPages);
  }

  const leftSibIdx = Math.max(currentPage - siblingCount, 1);
  const rightSibIdx = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibIdx > 2;
  const showRightDots = rightSibIdx < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    const leftRange = generateRange(1, leftCount);
    return showEdges ? [...leftRange, "dots", totalPages] : [...leftRange, "dots"];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    const rightRange = generateRange(totalPages - rightCount + 1, totalPages);
    return showEdges ? [1, "dots", ...rightRange] : ["dots", ...rightRange];
  }

  const middleRange = generateRange(leftSibIdx, rightSibIdx);
  return showEdges
    ? [1, "dots", ...middleRange, "dots", totalPages]
    : ["dots", ...middleRange, "dots"];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = "md",
  variant = "default",
  showEdges = true,
}) => {

  const pages = buildPageNumbers(currentPage, totalPages, siblingCount, showEdges);

  const btnBase = [
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none",
    sizeClasses[size],
    variantBase[variant],
  ].join(" ");

  const activeClass =
    variant === "minimal"
      ? "pagination-active-minimal"
      : "pagination-active-default";

  const inactiveClass =
    variant === "minimal"
      ? "pagination-inactive-minimal"
      : "pagination-inactive-default";

  const disabledClass = "pagination-disabled pointer-events-none";

  return (
    <nav className="pagination-nav flex items-center justify-center gap-1">
      <button
        type="button"
        className={`pagination-prev ${btnBase} ${currentPage <= 1 ? disabledClass : inactiveClass} cursor-pointer`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className={iconSize[size]} />
      </button>

      {pages.map((page, idx) => {
        if (page === "dots") {
          return (
            <span
              key={`dots-${idx}`}
              className={`${btnBase} pagination-dots pointer-events-none`}
            >
              ···
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            className={`${btnBase} ${isActive ? activeClass : inactiveClass} cursor-pointer`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={`pagination-next ${btnBase} ${currentPage >= totalPages ? disabledClass : inactiveClass} cursor-pointer`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRightIcon className={iconSize[size]} />
      </button>
    </nav>
  );
};

export default Pagination;
