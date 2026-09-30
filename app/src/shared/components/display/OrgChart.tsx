interface OrgNodeData {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  children?: OrgNodeData[];
}

type OrgVariant = "default" | "bordered" | "filled" | "compact";

interface OrgChartProps {
  data: OrgNodeData;
  variant?: OrgVariant;
  horizontal?: boolean;
  className?: string;
}

const OrgNode = ({
  node,
  variant,
  horizontal,
}: {
  node: OrgNodeData;
  variant: OrgVariant;
  horizontal: boolean;
}) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`org-node-wrapper ${horizontal ? "org-horizontal" : "org-vertical"}`}>
      <div className={`org-card org-card-${variant}`}>
        {node.avatar ? (
          <img src={node.avatar} alt={node.name} className="org-avatar" />
        ) : (
          <div className="org-avatar-placeholder">
            {node.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="org-info">
          <span className="org-name">{node.name}</span>
          {node.title && <span className="org-title">{node.title}</span>}
        </div>
      </div>

      {hasChildren && (
        <div className={`org-children-wrapper ${horizontal ? "org-children-horizontal" : "org-children-vertical"}`}>
          <div className="org-connector" />
          <div className={`org-children ${horizontal ? "org-children-h" : "org-children-v"}`}>
            {node.children!.map((child, index) => (
              <div key={child.id} className="org-child-branch">
                {node.children!.length > 1 && (
                  <div
                    className={`org-branch-line ${horizontal ? "org-branch-line-h" : "org-branch-line-v"} ${
                      index === 0 ? "org-branch-first" : index === node.children!.length - 1 ? "org-branch-last" : "org-branch-middle"
                    }`}
                  />
                )}
                <OrgNode node={child} variant={variant} horizontal={horizontal} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { useRef, useState, useCallback, useLayoutEffect, useEffect } from "react";

const MIN_ZOOM = 0.08;
const MAX_ZOOM = 4;

const OrgChart = ({
  data,
  variant = "default",
  horizontal = false,
  className = "",
}: OrgChartProps) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const stateRef = useRef({ zoom: 1, pan: { x: 0, y: 0 } });
  const draggingRef = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const applyState = useCallback((newZoom: number, newPan: { x: number; y: number }) => {
    stateRef.current = { zoom: newZoom, pan: newPan };
    setZoom(newZoom);
    setPan(newPan);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    const iw = inner.offsetWidth;
    const ih = inner.offsetHeight;
    applyState(1, {
      x: Math.max(40, (cw - iw) / 2),
      y: Math.max(40, (ch - ih) / 2),
    });
  }, [data, applyState]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const { zoom: cz, pan: cp } = stateRef.current;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, cz * factor));
      const ratio = newZoom / cz;
      applyState(newZoom, {
        x: mx - (mx - cp.x) * ratio,
        y: my - (my - cp.y) * ratio,
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyState]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    const newPan = { x: stateRef.current.pan.x + dx, y: stateRef.current.pan.y + dy };
    stateRef.current.pan = newPan;
    setPan({ ...newPan });
  }, []);

  const stopDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const zoomAtCenter = useCallback((factor: number) => {
    const container = containerRef.current;
    if (!container) return;
    const cx = container.offsetWidth / 2;
    const cy = container.offsetHeight / 2;
    const { zoom: cz, pan: cp } = stateRef.current;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, cz * factor));
    const ratio = newZoom / cz;
    applyState(newZoom, { x: cx - (cx - cp.x) * ratio, y: cy - (cy - cp.y) * ratio });
  }, [applyState]);

  const handleReset = useCallback(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    const iw = inner.offsetWidth;
    const ih = inner.offsetHeight;
    applyState(1, {
      x: Math.max(40, (cw - iw) / 2),
      y: Math.max(40, (ch - ih) / 2),
    });
  }, [applyState]);

  return (
    <div className={`org-chart-container ${className}`} ref={containerRef}>
      <div className="org-chart-controls">
        <button className="org-zoom-btn" onClick={() => zoomAtCenter(1.2)} type="button">+</button>
        <button className="org-zoom-btn" onClick={handleReset} type="button">{Math.round(zoom * 100)}%</button>
        <button className="org-zoom-btn" onClick={() => zoomAtCenter(1 / 1.2)} type="button">−</button>
      </div>
      <div
        className="org-chart-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={innerRef}
          className={`org-chart ${horizontal ? "org-chart-horizontal" : "org-chart-vertical"}`}
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "0 0" }}
        >
          <OrgNode node={data} variant={variant} horizontal={horizontal} />
        </div>
      </div>
    </div>
  );
};

export type { OrgChartProps, OrgNodeData, OrgVariant };
export default OrgChart;
