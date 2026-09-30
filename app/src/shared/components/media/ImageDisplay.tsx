import React, { useState } from "react";
import XIcon from "../../../assets/icons/XIcon";

interface ImageDisplayProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  rounded?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  caption?: string;
  fallback?: React.ReactNode;
  preview?: boolean;
  className?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  src,
  alt = "",
  width,
  height,
  objectFit = "cover",
  rounded = false,
  bordered = false,
  shadow = false,
  caption,
  fallback,
  preview = false,
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const wrapperClass = [
    "image-display",
    rounded ? "image-display-rounded" : "",
    bordered ? "image-display-bordered" : "",
    shadow ? "image-display-shadow" : "",
    preview ? "image-display-preview" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  if (hasError && fallback) {
    return (
      <div className={wrapperClass} style={style}>
        <div className="image-display-fallback">{fallback}</div>
        {caption && <span className="image-display-caption">{caption}</span>}
      </div>
    );
  }

  return (
    <>
      <figure className={wrapperClass} style={style}>
        <img
          src={src}
          alt={alt}
          className={`image-display-img image-display-fit-${objectFit}`}
          onError={() => setHasError(true)}
          onClick={() => preview && setIsPreviewOpen(true)}
        />
        {caption && <figcaption className="image-display-caption">{caption}</figcaption>}
      </figure>

      {preview && isPreviewOpen && (
        <div className="image-display-lightbox" onClick={() => setIsPreviewOpen(false)}>
          <button type="button" className="image-display-lightbox-close">
            <XIcon strokeWidth="2" />
          </button>
          <img src={src} alt={alt} className="image-display-lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default ImageDisplay;
