import React, { useRef, useState, useEffect } from "react";

type ViewCardShape = "square" | "horizontal" | "vertical";
type ViewCardVariant = "default" | "bordered" | "elevated" | "filled";

interface ViewCardAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
  onClick?: () => void;
}

interface ViewCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  shape?: ViewCardShape;
  variant?: ViewCardVariant;
  actions?: ViewCardAction[];
  metadata?: { label: string; value: string }[];
  badge?: React.ReactNode;
  status?: { label: string; color: "success" | "danger" | "warning" | "info" | "secondary" };
  onClick?: () => void;
  className?: string;
  animated?: boolean;
}

const statusColors = {
  success: "view-card-status-success",
  danger: "view-card-status-danger",
  warning: "view-card-status-warning",
  info: "view-card-status-info",
  secondary: "view-card-status-secondary",
};

const actionVariants = {
  primary: "view-card-action-primary",
  secondary: "view-card-action-secondary",
  danger: "view-card-action-danger",
  success: "view-card-action-success",
  warning: "view-card-action-warning",
  info: "view-card-action-info",
};

const ViewCard: React.FC<ViewCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt = "",
  icon,
  shape = "vertical",
  variant = "default",
  actions,
  metadata,
  badge,
  status,
  onClick,
  className = "",
  animated = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) {
      setIsVisible(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const wrapperClass = [
    "view-card",
    `view-card-${variant}`,
    `view-card-${shape}`,
    animated ? (isVisible ? "view-card-animate" : "view-card-hidden") : "",
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderImage = () => {
    if (!image && !icon) return null;

    const sizeClass =
      shape === "square"
        ? "view-card-img-square"
        : shape === "horizontal"
          ? "view-card-img-horizontal"
          : "view-card-img-vertical";

    return (
      <div className={`view-card-img-wrapper ${sizeClass}`}>
        {image ? (
          <img src={image} alt={imageAlt} className="view-card-img" />
        ) : icon ? (
          <div className="view-card-icon-placeholder">
            <span className="view-card-icon">{icon}</span>
          </div>
        ) : null}
        {badge && <div className="view-card-badge">{badge}</div>}
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) return null;
    return (
      <span className={`view-card-status ${statusColors[status.color]}`}>
        <span className="view-card-status-dot" />
        {status.label}
      </span>
    );
  };

  const renderMetadata = () => {
    if (!metadata || metadata.length === 0) return null;
    return (
      <div className="view-card-meta">
        {metadata.map((m, i) => (
          <div key={i} className="view-card-meta-item">
            <span className="view-card-meta-label">{m.label}</span>
            <span className="view-card-meta-value">{m.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    return (
      <div className="view-card-actions">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            className={`view-card-action-btn ${actionVariants[a.variant || "primary"]}`}
            onClick={(e) => {
              e.stopPropagation();
              a.onClick?.();
            }}
          >
            {a.icon && <span className="view-card-action-icon">{a.icon}</span>}
            {a.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div ref={cardRef} className={wrapperClass} onClick={onClick}>
      {renderImage()}
      <div className="view-card-body">
        <div className="view-card-header">
          <div className="view-card-header-text">
            <h3 className="view-card-title">{title}</h3>
            {subtitle && <p className="view-card-subtitle">{subtitle}</p>}
          </div>
          {renderStatus()}
        </div>
        {description && <p className="view-card-description">{description}</p>}
        {renderMetadata()}
        {renderActions()}
      </div>
    </div>
  );
};

export type { ViewCardProps, ViewCardAction, ViewCardShape, ViewCardVariant };
export default ViewCard;
