type ToolbarVariant = "default" | "bordered" | "filled" | "floating";

interface ToolbarItem {
  id: string;
  icon?: React.ReactNode;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

interface ToolbarDivider {
  id: string;
  type: "divider";
}

type ToolbarEntry = ToolbarItem | ToolbarDivider;

interface ToolbarProps {
  items: ToolbarEntry[];
  variant?: ToolbarVariant;
  size?: "sm" | "md" | "lg";
  vertical?: boolean;
  className?: string;
}

const isDivider = (entry: ToolbarEntry): entry is ToolbarDivider =>
  "type" in entry && entry.type === "divider";

const Toolbar = ({
  items,
  variant = "default",
  size = "md",
  vertical = false,
  className = "",
}: ToolbarProps) => {
  return (
    <div
      className={`toolbar toolbar-${variant} toolbar-${size} ${vertical ? "toolbar-vertical" : "toolbar-horizontal"} ${className}`}
      role="toolbar"
    >
      {items.map((entry) => {
        if (isDivider(entry)) {
          return <div key={entry.id} className="toolbar-divider" />;
        }

        return (
          <button
            key={entry.id}
            type="button"
            className={`toolbar-btn ${entry.active ? "toolbar-btn-active" : ""}`}
            onClick={entry.onClick}
            disabled={entry.disabled}
            title={entry.tooltip || entry.label}
          >
            {entry.icon && <span className="toolbar-btn-icon">{entry.icon}</span>}
            {entry.label && <span className="toolbar-btn-label">{entry.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export type { ToolbarProps, ToolbarItem, ToolbarDivider, ToolbarEntry, ToolbarVariant };
export default Toolbar;
