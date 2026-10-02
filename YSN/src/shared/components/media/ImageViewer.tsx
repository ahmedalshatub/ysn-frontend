import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import MinusCircleIcon from "../../../assets/icons/MinusCircleIcon";
import RefreshCcwIcon from "../../../assets/icons/RefreshCcwIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import Maximize2Icon from "../../../assets/icons/Maximize2Icon";

interface ImageViewerProps {
  src: string;
  alt?: string;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  toolbar?: boolean;
  className?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt = "",
  minZoom = 0.5,
  maxZoom = 5,
  zoomStep = 0.25,
  toolbar = true,
  className = "",
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(z + zoomStep, maxZoom));
  const zoomOut = () => setZoom((z) => Math.max(z - zoomStep, minZoom));
  const rotateRight = () => setRotation((r) => r + 90);
  const rotateLeft = () => setRotation((r) => r - 90);
  const reset = () => { setZoom(1); setRotation(0); setPosition({ x: 0, y: 0 }); };

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
      setZoom((z) => Math.max(minZoom, Math.min(maxZoom, z + delta)));
    },
    [minZoom, maxZoom, zoomStep]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: posStart.current.x + (e.clientX - dragStart.current.x),
        y: posStart.current.y + (e.clientY - dragStart.current.y),
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position]);

  return (
    <div className={`image-viewer ${className}`} ref={containerRef}>
      {toolbar && (
        <div className="image-viewer-toolbar">
          <button type="button" className="image-viewer-btn" onClick={zoomIn} title="Zoom In">
            <SearchIcon strokeWidth="2" />
          </button>
          <button type="button" className="image-viewer-btn" onClick={zoomOut} title="Zoom Out">
            <MinusCircleIcon strokeWidth="2" />
          </button>
          <span className="image-viewer-zoom-label">{Math.round(zoom * 100)}%</span>
          <div className="image-viewer-divider" />
          <button type="button" className="image-viewer-btn" onClick={rotateLeft} title="Rotate Left">
            <RefreshCcwIcon strokeWidth="2" />
          </button>
          <button type="button" className="image-viewer-btn" onClick={rotateRight} title="Rotate Right">
            <RefreshCwIcon strokeWidth="2" />
          </button>
          <div className="image-viewer-divider" />
          <button type="button" className="image-viewer-btn" onClick={reset} title="Reset">
            <Maximize2Icon strokeWidth="2" />
          </button>
        </div>
      )}
      <div
        className={`image-viewer-canvas ${isDragging ? "image-viewer-grabbing" : zoom > 1 ? "image-viewer-grab" : ""}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <img
          src={src}
          alt={alt}
          className="image-viewer-img"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
