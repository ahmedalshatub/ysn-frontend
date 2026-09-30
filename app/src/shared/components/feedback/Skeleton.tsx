import React from "react";

type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
  className?: string;
}

interface SkeletonGroupProps {
  avatar?: boolean;
  avatarSize?: string | number;
  lines?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> & { Group: React.FC<SkeletonGroupProps> } = ({
  variant = "text",
  width,
  height,
  lines = 1,
  animated = true,
  className = "",
}) => {
  const baseClass = [
    "skeleton",
    `skeleton-${variant}`,
    animated ? "skeleton-animate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  if (variant === "text" && lines > 1) {
    return (
      <div className="skeleton-lines">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={baseClass}
            style={{
              ...style,
              width: i === lines - 1 ? "75%" : style.width || "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClass} style={style} />;
};

const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  avatar = true,
  avatarSize = 48,
  lines = 3,
  className = "",
}) => {
  return (
    <div className={`skeleton-group ${className}`}>
      {avatar && (
        <Skeleton
          variant="circular"
          width={avatarSize}
          height={avatarSize}
        />
      )}
      <div className="skeleton-group-content">
        <Skeleton variant="text" width="40%" height={14} />
        <Skeleton variant="text" lines={lines - 1} height={12} />
      </div>
    </div>
  );
};

Skeleton.Group = SkeletonGroup;

export default Skeleton;
