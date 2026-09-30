import React, { useEffect, useRef, useCallback } from "react";

interface WatermarkProps {
  text: string;
  fontSize?: number;
  color?: string;
  rotate?: number;
  gap?: number;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
}

const Watermark: React.FC<WatermarkProps> = ({
  text,
  fontSize = 16,
  color,
  rotate = -22,
  gap = 100,
  opacity = 0.15,
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = React.useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const createWatermark = useCallback(() => {
    if (!containerRef.current) return;

    if (watermarkRef.current) {
      watermarkRef.current.remove();
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = (ctx.measureText(text).width || text.length * fontSize * 0.6) + gap;
    const h = fontSize * 3 + gap;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.translate(w / 2, h / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-w / 2, -h / 2);

    ctx.font = `${fontSize}px sans-serif`;
    const resolvedColor =
      color ||
      (theme === "dark"
        ? "#e2e8f0"
        : "#1e293b");
    ctx.fillStyle = resolvedColor;
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, w / 2, h / 2);

    const dataUrl = canvas.toDataURL("image/png");

    const el = document.createElement("div");
    el.className = "watermark-layer";
    el.style.backgroundImage = `url(${dataUrl})`;
    el.style.backgroundRepeat = "repeat";
    el.style.backgroundSize = `${w}px ${h}px`;
    el.style.opacity = String(opacity);

    containerRef.current.appendChild(el);
    watermarkRef.current = el;
  }, [text, fontSize, color, rotate, gap, opacity, theme]);

  useEffect(() => {
    createWatermark();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.removedNodes.forEach((node) => {
          if (node === watermarkRef.current) {
            createWatermark();
          }
        });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true });
    }

    return () => observer.disconnect();
  }, [createWatermark]);

  return (
    <div ref={containerRef} className={`watermark-container ${className}`}>
      {children}
    </div>
  );
};

export default Watermark;
