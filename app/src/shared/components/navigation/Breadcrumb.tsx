import React from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";

type BreadcrumbVariant = "default" | "contained" | "pills" | "arrows" | "dots" | "bordered";
type BreadcrumbSeparator = "slash" | "chevron" | "arrow" | "dot" | "dash";
type BreadcrumbSize = "sm" | "md" | "lg";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  separator?: BreadcrumbSeparator;
  size?: BreadcrumbSize;
  animated?: boolean;
  homeIcon?: boolean;
  onClick?: (item: BreadcrumbItem, index: number) => void;
}

const sizeClasses: Record<BreadcrumbSize, { text: string; icon: string; gap: string; padding: string }> = {
  sm: { text: "text-xs", icon: "w-3.5 h-3.5", gap: "gap-1.5", padding: "px-2.5 py-1" },
  md: { text: "text-sm", icon: "w-4 h-4", gap: "gap-2", padding: "px-3 py-1.5" },
  lg: { text: "text-base", icon: "w-5 h-5", gap: "gap-2.5", padding: "px-4 py-2" },
};

const SeparatorIcon: React.FC<{ type: BreadcrumbSeparator; className?: string }> = ({ type, className = "" }) => {
  switch (type) {
    case "chevron":
      return <ChevronRightIcon className={className} />;
    case "arrow":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      );
    case "dot":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="3" />
        </svg>
      );
    case "dash":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <rect x="4" y="9" width="12" height="2" rx="1" />
        </svg>
      );
    default:
      return <span className={`${className} select-none`}>/</span>;
  }
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = "default",
  separator = "chevron",
  size = "md",
  animated = true,
  homeIcon = false,
  onClick,
}) => {
  const sizes = sizeClasses[size];
  const isLast = (index: number) => index === items.length - 1;

  const renderSeparator = (index: number) => {
    if (isLast(index)) return null;

    if (variant === "arrows") {
      return (
        <ChevronRightIcon className={`breadcrumb-separator ${sizes.icon} breadcrumb-separator-color flex-shrink-0`} />
      );
    }

    if (variant === "dots") {
      return (
        <svg className={`${sizes.icon} breadcrumb-separator-color flex-shrink-0`} viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="2.5" />
        </svg>
      );
    }

    if (separator === "slash") {
      return <span className={`${sizes.text} breadcrumb-separator-color flex-shrink-0 select-none`}>/</span>;
    }

    return <SeparatorIcon type={separator} className={`breadcrumb-separator ${sizes.icon} breadcrumb-separator-color flex-shrink-0`} />;
  };

  const getItemClasses = (index: number) => {
    const last = isLast(index);

    if (variant === "contained") {
      if (last) return `${sizes.padding} ${sizes.text} font-semibold breadcrumb-item-contained-active rounded-lg`;
      return `${sizes.padding} ${sizes.text} font-medium breadcrumb-item-contained rounded-lg transition-colors duration-200 cursor-pointer`;
    }

    if (variant === "pills") {
      if (last) return `${sizes.padding} ${sizes.text} font-semibold breadcrumb-item-pills-active rounded-full`;
      return `${sizes.padding} ${sizes.text} font-medium breadcrumb-item-contained rounded-full transition-colors duration-200 cursor-pointer`;
    }

    if (variant === "bordered") {
      if (last) return `${sizes.padding} ${sizes.text} font-semibold breadcrumb-item-bordered-active border-b-2`;
      return `${sizes.padding} ${sizes.text} font-medium breadcrumb-item-bordered border-b-2 border-transparent transition-all duration-200 cursor-pointer`;
    }

    if (variant === "arrows") {
      if (last) return `${sizes.text} font-semibold breadcrumb-item-current`;
      return `${sizes.text} font-medium breadcrumb-item-default transition-colors duration-200 cursor-pointer`;
    }

    if (last) return `${sizes.text} font-semibold breadcrumb-item-current`;
    return `${sizes.text} font-medium breadcrumb-item-default transition-colors duration-200 cursor-pointer`;
  };

  const getWrapperClasses = () => {
    const base = `flex items-center flex-wrap ${sizes.gap}`;

    if (variant === "contained") return `${base} breadcrumb-wrapper-contained rounded-xl p-1.5`;
    if (variant === "bordered") return `${base} border-b breadcrumb-wrapper-bordered pb-2`;

    return base;
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className={getWrapperClasses()}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${sizes.gap} ${animated ? "breadcrumb-animate" : ""}`}
          >
            {index === 0 && homeIcon && !item.icon ? (
              <span
                className={`inline-flex items-center ${sizes.gap} ${getItemClasses(index)}`}
                onClick={() => !isLast(index) && onClick?.(item, index)}
              >
                <HomeIcon className={sizes.icon} />
                <span>{item.label}</span>
              </span>
            ) : (
              <span
                className={`inline-flex items-center ${sizes.gap} ${getItemClasses(index)}`}
                onClick={() => !isLast(index) && onClick?.(item, index)}
              >
                {item.icon && <span className={`flex items-center justify-center ${sizes.icon} [&>svg]:w-full [&>svg]:h-full`}>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
            {renderSeparator(index)}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export type { BreadcrumbItem };
export default Breadcrumb;
