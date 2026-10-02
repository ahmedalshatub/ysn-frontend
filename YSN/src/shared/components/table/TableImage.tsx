import React from "react";
import CameraIcon from "../../../assets/icons/CameraIcon";

type ImageShape = "square" | "circle" | "rounded";

interface TableImageProps {
  src: string;
  alt?: string;
  size?: number;
  shape?: ImageShape;
  fallback?: React.ReactNode;
  className?: string;
}

const shapeClasses: Record<ImageShape, string> = {
  square: "rounded-none",
  circle: "rounded-full",
  rounded: "rounded-lg",
};

const TableImage: React.FC<TableImageProps> = ({
  src,
  alt = "",
  size = 40,
  shape = "rounded",
  fallback,
  className = "",
}) => {
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  const baseClass = [
    "object-cover table-image-fallback flex-shrink-0",
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (error || !src) {
    return (
      <div
        className={`${baseClass} flex items-center justify-center`}
        style={{ width: size, height: size }}
      >
        {fallback || (
          <CameraIcon className="w-1/2 h-1/2" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={baseClass}
      style={{ width: size, height: size }}
      onError={() => setError(true)}
    />
  );
};

export default TableImage;
