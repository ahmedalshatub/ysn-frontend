import React, { useState, useCallback } from "react";
import XIcon from "../../../assets/icons/XIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface GalleryViewerProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({
  images,
  columns = 3,
  gap = "md",
  rounded = true,
  className = "",
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev]
  );

  const wrapperClass = [
    "gallery-viewer",
    `gallery-cols-${columns}`,
    `gallery-gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={wrapperClass}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`gallery-item ${rounded ? "gallery-item-rounded" : ""}`}
            onClick={() => openLightbox(i)}
          >
            <img src={img.src} alt={img.alt || ""} className="gallery-item-img" />
            {img.caption && (
              <div className="gallery-item-caption">
                <span>{img.caption}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <button type="button" className="gallery-lightbox-close" onClick={closeLightbox}>
            <XIcon strokeWidth="2" />
          </button>

          <button type="button" className="gallery-lightbox-nav gallery-lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}>
            <ChevronLeftIcon strokeWidth="2" />
          </button>

          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || ""}
              className="gallery-lightbox-img"
            />
            {images[lightboxIndex].caption && (
              <p className="gallery-lightbox-caption">{images[lightboxIndex].caption}</p>
            )}
          </div>

          <button type="button" className="gallery-lightbox-nav gallery-lightbox-next" onClick={(e) => { e.stopPropagation(); goNext(); }}>
            <ChevronRightIcon strokeWidth="2" />
          </button>

          <div className="gallery-lightbox-counter">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryViewer;
