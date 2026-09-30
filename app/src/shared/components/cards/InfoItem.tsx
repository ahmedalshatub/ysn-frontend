import React from "react";

type InfoItemVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";

interface InfoItemProps {
  icon?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  description?: string;
  variant?: InfoItemVariant;
  className?: string;
  onClick?: () => void;
}

const InfoItem = ({
  icon,
  title,
  value,
  description,
  variant = "primary",
  className = "",
  onClick,
}: InfoItemProps) => {
  const interactive = onClick
    ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
    : "";

  return (
    <div
      className={`ce-panel rounded-xl border ce-divider p-3 flex items-start gap-3 ${interactive} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {icon && (
        <span
          className={`stat-icon-${variant} shrink-0 w-9 h-9 rounded-lg flex items-center justify-center`}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="ce-muted block text-xs">{title}</span>
        <span className="ce-panel-heading block text-sm font-semibold mt-0.5 break-words">
          {value}
        </span>
        {description && <span className="ce-muted block text-xs mt-1">{description}</span>}
      </div>
    </div>
  );
};

export type { InfoItemProps, InfoItemVariant };
export default InfoItem;
