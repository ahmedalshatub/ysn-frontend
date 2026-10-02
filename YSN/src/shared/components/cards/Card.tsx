type CardVariant = "default" | "bordered" | "elevated" | "flat";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  hoverable?: boolean;
  fullHeight?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default: "card card-default rounded-2xl",
  bordered: "card card-bordered rounded-2xl",
  elevated: "card card-elevated rounded-2xl",
  flat: "card card-flat rounded-2xl",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

const Card = ({
  children,
  variant = "default",
  padding = "md",
  header,
  footer,
  title,
  subtitle,
  icon,
  actions,
  hoverable = false,
  fullHeight = false,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}: CardProps) => {
  const hasHeader = header || title || subtitle || icon || actions;

  return (
    <div
      className={`${variantClasses[variant]} ${fullHeight ? "h-full" : ""} ${hoverable ? "card-hoverable" : ""} ${className}`}
    >
      {hasHeader && (
        <div
          className={`card-header ${header ? "" : ""} ${headerClassName}`}
        >
          {header || (
            <>
              <div className="flex items-center gap-3 min-w-0">
                {icon && (
                  <div className="card-icon">
                    {icon}
                  </div>
                )}
                <div className="min-w-0">
                  {title && (
                    <h3 className="card-title">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="card-subtitle">{subtitle}</p>
                  )}
                </div>
              </div>
              {actions && <div className="flex-shrink-0">{actions}</div>}
            </>
          )}
        </div>
      )}

      <div className={`${paddingClasses[padding]} ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div
          className={`card-footer ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export type { CardProps, CardVariant, CardPadding };
export default Card;
