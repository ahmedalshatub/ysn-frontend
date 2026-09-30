import React from "react";
import UserIcon from "../../../assets/icons/UserIcon";

type AvatarGroupSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarGroupItem {
  src?: string;
  name?: string;
  alt?: string;
}

interface AvatarGroupProps {
  items: AvatarGroupItem[];
  max?: number;
  size?: AvatarGroupSize;
  animated?: boolean;
  onOverflowClick?: () => void;
}

const sizeMap: Record<AvatarGroupSize, { container: string; text: string; overlap: string }> = {
  xs: { container: "w-6 h-6", text: "text-[9px]", overlap: "-ml-1.5" },
  sm: { container: "w-8 h-8", text: "text-[10px]", overlap: "-ml-2" },
  md: { container: "w-10 h-10", text: "text-xs", overlap: "-ml-2.5" },
  lg: { container: "w-12 h-12", text: "text-sm", overlap: "-ml-3" },
  xl: { container: "w-16 h-16", text: "text-base", overlap: "-ml-4" },
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  items,
  max = 5,
  size = "md",
  animated = true,
  onOverflowClick,
}) => {
  const sizes = sizeMap[size];
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  const [errors, setErrors] = React.useState<Set<number>>(new Set());

  const handleError = (index: number) => {
    setErrors((prev) => new Set(prev).add(index));
  };

  const renderAvatar = (item: AvatarGroupItem, index: number) => {
    const showImg = item.src && !errors.has(index);

    return (
      <div
        key={index}
        className={`relative inline-flex items-center justify-center flex-shrink-0 rounded-full ring-2 ring-white overflow-hidden ${sizes.container} ${index > 0 ? sizes.overlap : ""} ${animated ? "avatar-group-animate" : ""}`}
        style={{ zIndex: items.length - index }}
      >
        {showImg ? (
          <img
            src={item.src}
            alt={item.alt || item.name || ""}
            className="w-full h-full object-cover rounded-full"
            onError={() => handleError(index)}
          />
        ) : item.name ? (
          <div className="w-full h-full flex items-center justify-center avatar-primary">
            <span className={`font-semibold leading-none ${sizes.text}`}>{getInitials(item.name)}</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center avatar-fallback">
            <UserIcon className="w-1/2 h-1/2" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center">
      {visible.map((item, index) => renderAvatar(item, index))}
      {overflow > 0 && (
        <div
          className={`relative inline-flex items-center justify-center flex-shrink-0 rounded-full ring-2 ring-white avatar-overflow ${sizes.container} ${sizes.overlap} ${onOverflowClick ? "cursor-pointer transition-colors duration-200" : ""} ${animated ? "avatar-group-animate" : ""}`}
          style={{ zIndex: 0 }}
          onClick={onOverflowClick}
        >
          <span className={`avatar-overflow-text ${sizes.text}`}>+{overflow}</span>
        </div>
      )}
    </div>
  );
};

export type { AvatarGroupItem };
export default AvatarGroup;
