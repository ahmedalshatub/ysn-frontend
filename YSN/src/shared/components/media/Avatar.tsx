import React from "react";
import UserIcon from "../../../assets/icons/UserIcon";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarShape = "circle" | "rounded" | "square";
type AvatarVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
type AvatarStatus = "online" | "offline" | "busy" | "away";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  icon?: React.ReactNode;
  bordered?: boolean;
  borderColor?: string;
  animated?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeMap: Record<AvatarSize, { container: string; text: string; icon: string; status: string; statusRing: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]", icon: "w-3 h-3", status: "w-2 h-2", statusRing: "ring-1" },
  sm: { container: "w-8 h-8", text: "text-xs", icon: "w-3.5 h-3.5", status: "w-2.5 h-2.5", statusRing: "ring-[1.5px]" },
  md: { container: "w-10 h-10", text: "text-sm", icon: "w-4 h-4", status: "w-3 h-3", statusRing: "ring-2" },
  lg: { container: "w-12 h-12", text: "text-base", icon: "w-5 h-5", status: "w-3.5 h-3.5", statusRing: "ring-2" },
  xl: { container: "w-16 h-16", text: "text-lg", icon: "w-6 h-6", status: "w-4 h-4", statusRing: "ring-2" },
  "2xl": { container: "w-20 h-20", text: "text-xl", icon: "w-7 h-7", status: "w-5 h-5", statusRing: "ring-[3px]" },
};

const shapeMap: Record<AvatarShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none",
};

const variantMap: Record<AvatarVariant, string> = {
  primary: "avatar-primary",
  secondary: "avatar-secondary",
  success: "avatar-success",
  danger: "avatar-danger",
  warning: "avatar-warning",
  info: "avatar-info",
  dark: "avatar-dark",
};

const statusColorMap: Record<AvatarStatus, string> = {
  online: "avatar-status-dot-online",
  offline: "avatar-status-dot-offline",
  busy: "avatar-status-dot-busy",
  away: "avatar-status-dot-away",
};

const statusPositionMap: Record<AvatarShape, string> = {
  circle: "bottom-0 right-0",
  rounded: "-bottom-0.5 -right-0.5",
  square: "-bottom-0.5 -right-0.5",
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  name,
  size = "md",
  shape = "circle",
  variant = "primary",
  status,
  icon,
  bordered = false,
  borderColor = "ring-white",
  animated = true,
  onClick,
  className = "",
}) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [src]);

  const sizes = sizeMap[size];
  const shapeClass = shapeMap[shape];

  const containerClasses = [
    "relative inline-flex items-center justify-center flex-shrink-0 select-none overflow-hidden",
    sizes.container,
    shapeClass,
    bordered ? `ring-2 ${borderColor}` : "",
    onClick ? "cursor-pointer hover:opacity-80 transition-opacity duration-200" : "",
    animated ? "avatar-animate" : "",
    className,
  ].filter(Boolean).join(" ");

  const renderContent = () => {
    if (src && !imgError) {
      return (
        <img
          src={src}
          alt={alt || name || ""}
          className={`w-full h-full object-cover ${shapeClass}`}
          onError={() => setImgError(true)}
        />
      );
    }

    if (icon) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${variantMap[variant]}`}>
          <span className={`inline-flex items-center justify-center ${sizes.icon}`}>{icon}</span>
        </div>
      );
    }

    if (name) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${variantMap[variant]}`}>
          <span className={`font-semibold leading-none ${sizes.text}`}>{getInitials(name)}</span>
        </div>
      );
    }

    return (
      <div className={`w-full h-full flex items-center justify-center ${variantMap[variant]}`}>
        <UserIcon className={sizes.icon} />
      </div>
    );
  };

  return (
    <div className={containerClasses} onClick={onClick}>
      {renderContent()}
      {status && (
        <span
          className={`absolute ${statusPositionMap[shape]} block ${sizes.status} ${shapeMap.circle} ${statusColorMap[status]} ${sizes.statusRing} ring-white ${status === "online" ? "avatar-status-online" : ""}`}
        />
      )}
    </div>
  );
};

export default Avatar;
