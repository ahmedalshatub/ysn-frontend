import React from "react";

type ActionVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
type TooltipPosition = "top" | "bottom" | "left" | "right";

interface ActionButtonItem {
  label?: string;
  icon?: React.ReactNode;
  variant?: ActionVariant;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
}

interface TableActionButtonsProps {
  actions: ActionButtonItem[];
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<ActionVariant, string> = {
  primary: "table-action-btn-primary",
  secondary: "table-action-btn-secondary",
  success: "table-action-btn-success",
  danger: "table-action-btn-danger",
  warning: "table-action-btn-warning",
  info: "table-action-btn-info",
  dark: "table-action-btn-dark",
};

const sizeClasses = {
  sm: "p-3 text-base gap-2.5",
  md: "p-3.5 text-lg gap-3",
  lg: "p-4 text-xl gap-3.5",
};

const iconSizeClasses = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
  lg: "w-8 h-8",
};

const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  actions,
  size = "md",
}) => {
  return (
    <div className="inline-flex items-center justify-center gap-1 w-full">
      {actions.map((action, idx) => {
        const variant = action.variant || "secondary";
        const btnClass = [
          "inline-flex items-center rounded-lg transition-all duration-150 font-medium",
          variantClasses[variant],
          sizeClasses[size],
          action.disabled ? "opacity-40 pointer-events-none" : "cursor-pointer",
        ].join(" ");

        const tooltipPos = action.tooltipPosition || "top";

        const button = (
          <button
            key={idx}
            type="button"
            className={btnClass}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon && (
              <span className={`flex-shrink-0 ${iconSizeClasses[size]}`}>
                {action.icon}
              </span>
            )}
            {action.label && <span>{action.label}</span>}
          </button>
        );

        if (action.tooltip) {
          return (
            <span key={idx} className="tooltip-wrapper">
              {button}
              <span className={`tooltip-content tooltip-${tooltipPos}`}>
                {action.tooltip}
              </span>
            </span>
          );
        }

        return button;
      })}
    </div>
  );
};

export type { ActionButtonItem };
export default TableActionButtons;
