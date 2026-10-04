import React from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";

type PageBreadcrumbVariant = "default" | "card" | "gradient" | "minimal" | "modern";

interface PageBreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
}

interface PageBreadcrumbProps {
  title: string;
  items: PageBreadcrumbItem[];
  subtitle?: string;
  variant?: PageBreadcrumbVariant;
  showDate?: boolean;
  dateFormat?: "short" | "long" | "relative";
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  animated?: boolean;
}

const formatDate = (format: "short" | "long" | "relative"): string => {
  const now = new Date();

  if (format === "relative") {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${dayNames[now.getDay()]}, ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }

  if (format === "long") {
    return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  return now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const ChevronSeparator = ChevronRightIcon;

const renderPath = (items: PageBreadcrumbItem[], textClass: string, separatorClass: string, animated: boolean) => (
  <ol className="flex items-center gap-1.5 flex-wrap">
    {items.map((item, index) => (
      <li key={index} className={`flex items-center gap-1.5 ${animated ? "breadcrumb-animate" : ""}`}>
        {item.icon && <span className="flex items-center justify-center w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">{item.icon}</span>}
        <span
          className={`text-sm ${index === items.length - 1
              ? `font-semibold ${textClass}`
              : `font-medium ${separatorClass} cursor-pointer hover:underline`
            }`}
        >
          {item.label}
        </span>
        {index < items.length - 1 && (
          <ChevronSeparator className={`breadcrumb-separator w-4 h-4 ${separatorClass}`} />
        )}
      </li>
    ))}
  </ol>
);

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  title,
  items,
  subtitle,
  variant = "default",
  showDate = true,
  dateFormat = "relative",
  icon,
  actions,
  animated = true,
}) => {
  const dateString = formatDate(dateFormat);

  if (variant === "gradient") {
    return (
      <div className={`relative overflow-hidden rounded-2xl page-breadcrumb-gradient p-6 shadow-lg ${animated ? "page-breadcrumb-animate" : ""}`}>
        <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 rounded-full bg-white/12" />
        <div className="absolute bottom-0 left-0 w-40 h-40 -ml-10 -mb-10 rounded-full bg-white/12" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className={animated ? "page-breadcrumb-meta-animate" : ""}>
              {renderPath(items, "text-white", "text-white/60", animated)}
            </div>
            <div className={`flex items-center gap-3 mt-3 ${animated ? "page-breadcrumb-title-animate" : ""}`}>
              {icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="flex items-center justify-center w-5 h-5 text-white [&>svg]:w-full [&>svg]:h-full">{icon}</span>
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-white truncate">{title}</h1>
                {subtitle && <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {showDate && (
              <div className={`flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-4 py-2.5 ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
                <CalendarIcon className="w-4 h-4 text-white/70" />
                <span className="text-sm font-medium text-white/90">{dateString}</span>
              </div>
            )}
            {actions}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`page-bc-bg-card rounded-2xl border p-6 shadow-sm ${animated ? "page-breadcrumb-animate" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className={animated ? "page-breadcrumb-meta-animate" : ""}>
              {renderPath(items, "page-bc-title", "page-bc-separator", animated)}
            </div>
            <div className={`flex items-center gap-3 mt-3 ${animated ? "page-breadcrumb-title-animate" : ""}`}>
              {icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl page-bc-icon-primary-bg flex items-center justify-center">
                  <span className="flex items-center justify-center w-5 h-5 page-bc-icon-primary [&>svg]:w-full [&>svg]:h-full">{icon}</span>
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold page-bc-title truncate">{title}</h1>
                {subtitle && <p className="text-sm page-bc-subtitle mt-0.5">{subtitle}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {showDate && (
              <div className={`flex items-center gap-2 page-bc-date-bg rounded-xl px-4 py-2.5 ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
                <CalendarIcon className="w-4 h-4 page-bc-date-icon" />
                <span className="text-sm font-medium page-bc-date-text">{dateString}</span>
              </div>
            )}
            {actions}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`py-4 ${animated ? "page-breadcrumb-animate" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <div className={`flex items-center gap-3 ${animated ? "page-breadcrumb-title-animate" : ""}`}>
              {icon && <span className="flex items-center justify-center w-6 h-6 page-bc-icon-muted [&>svg]:w-full [&>svg]:h-full">{icon}</span>}
              <h1 className="text-xl font-bold page-bc-title truncate">{title}</h1>
            </div>
            <div className={`mt-1.5 ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
              {renderPath(items, "page-bc-date-text", "page-bc-separator", animated)}
            </div>
          </div>
          {showDate && (
            <span className={`text-sm page-bc-separator flex-shrink-0 ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
              {dateString}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === "modern") {
    return (
      <div className={`page-breadcrumb-modern page-bc-modern-bg rounded-2xl border p-6 ${animated ? "page-breadcrumb-animate" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className={animated ? "page-breadcrumb-meta-animate" : ""}>
              {renderPath(items, "page-bc-path-primary", "page-bc-separator", animated)}
            </div>
            <div className={`flex items-center gap-4 mt-3 ${animated ? "page-breadcrumb-title-animate" : ""}`}>
              {icon && (
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#158881] to-[#0d5a55] flex items-center justify-center shadow-lg shadow-[#158881]/25">
                  <span className="flex items-center justify-center w-6 h-6 text-white [&>svg]:w-full [&>svg]:h-full">{icon}</span>
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold page-bc-title truncate">{title}</h1>
                {subtitle && <p className="text-sm page-bc-subtitle mt-0.5">{subtitle}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {showDate && (
              <div className={`flex items-center gap-2 rounded-xl border page-bc-modern-date-bg px-4 py-2.5 shadow-sm ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
                <CalendarIcon className="w-4 h-4 page-bc-modern-date-icon" />
                <span className="text-sm font-medium page-bc-modern-date-text">{dateString}</span>
              </div>
            )}
            {actions}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-b page-bc-default-border pb-5 ${animated ? "page-breadcrumb-animate" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <div className={animated ? "page-breadcrumb-meta-animate" : ""}>
            {renderPath(items, "page-bc-title", "page-bc-separator", animated)}
          </div>
          <div className={`flex items-center gap-3 mt-3 ${animated ? "page-breadcrumb-title-animate" : ""}`}>
            {icon && <span className="flex items-center justify-center w-6 h-6 page-bc-icon-muted [&>svg]:w-full [&>svg]:h-full">{icon}</span>}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold page-bc-title truncate">{title}</h1>
              {subtitle && <p className="text-sm page-bc-subtitle mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {showDate && (
            <div className={`flex items-center gap-2 ${animated ? "page-breadcrumb-meta-animate" : ""}`}>
              <CalendarIcon className="w-4 h-4 page-bc-date-icon" />
              <span className="text-sm font-medium page-bc-subtitle">{dateString}</span>
            </div>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

export type { PageBreadcrumbItem };
export default PageBreadcrumb;
