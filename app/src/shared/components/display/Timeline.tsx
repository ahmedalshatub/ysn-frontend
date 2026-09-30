type TimelineVariant = "default" | "outlined" | "filled";
type TimelineColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "dark";
type TimelineLayout = "left" | "right" | "alternate";

interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  color?: TimelineColor;
  content?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItemData[];
  variant?: TimelineVariant;
  color?: TimelineColor;
  layout?: TimelineLayout;
  showConnector?: boolean;
  animated?: boolean;
  className?: string;
}

const Timeline = ({
  items,
  variant = "default",
  color = "primary",
  layout = "left",
  showConnector = true,
  animated = true,
  className = "",
}: TimelineProps) => {
  return (
    <div className={`timeline timeline-${variant} timeline-${layout} ${animated ? "timeline-animated" : ""} ${className}`}>
      {items.map((item, index) => {
        const itemColor = item.color || color;
        const isLast = index === items.length - 1;
        const side = layout === "alternate" ? (index % 2 === 0 ? "left" : "right") : layout;

        return (
          <div
            key={item.id}
            className={`timeline-item timeline-item-${side} ${animated ? "timeline-item-animate" : ""}`}
            style={animated ? { animationDelay: `${index * 100}ms` } : undefined}
          >
            {layout === "alternate" && (
              <div className={`timeline-content-side ${side === "left" ? "timeline-content-right" : "timeline-content-left"}`}>
                {item.date && <span className="timeline-date">{item.date}</span>}
              </div>
            )}

            <div className="timeline-marker-wrapper">
              <div className={`timeline-dot timeline-dot-${itemColor}`}>
                {item.icon ? (
                  <span className="timeline-icon">{item.icon}</span>
                ) : (
                  <span className="timeline-dot-inner" />
                )}
              </div>
              {showConnector && !isLast && <div className={`timeline-connector timeline-connector-${itemColor}`} />}
            </div>

            <div className={`timeline-content ${layout !== "alternate" ? "" : side === "left" ? "timeline-content-left" : "timeline-content-right"}`}>
              <div className="timeline-card">
                <h4 className="timeline-title">{item.title}</h4>
                {item.description && <p className="timeline-description">{item.description}</p>}
                {layout !== "alternate" && item.date && <span className="timeline-date">{item.date}</span>}
                {item.content && <div className="timeline-extra">{item.content}</div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export type { TimelineProps, TimelineItemData, TimelineVariant, TimelineColor, TimelineLayout };
export default Timeline;
