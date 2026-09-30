import React, { useRef, useState, useCallback, useEffect } from "react";

type SplitterDirection = "horizontal" | "vertical";

interface SplitterPaneProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

interface SplitterProps {
  direction?: SplitterDirection;
  children: React.ReactNode;
  className?: string;
}

const SplitterPane: React.FC<SplitterPaneProps> = ({
  children,
  className = "",
}) => {
  return <div className={`splitter-pane ${className}`}>{children}</div>;
};

const Splitter: React.FC<SplitterProps> & { Pane: React.FC<SplitterPaneProps> } = ({
  direction = "horizontal",
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const dragging = useRef<{ index: number; startPos: number; startSizes: number[] } | null>(null);

  const panes = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.type as any) === SplitterPane
  ) as React.ReactElement<SplitterPaneProps>[];

  useEffect(() => {
    if (sizes.length !== panes.length) {
      const defaultSizes = panes.map((p) => p.props.defaultSize || 100 / panes.length);
      const total = defaultSizes.reduce((a, b) => a + b, 0);
      setSizes(defaultSizes.map((s) => (s / total) * 100));
    }
  }, [panes.length]);

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = {
        index,
        startPos: direction === "horizontal" ? e.clientX : e.clientY,
        startSizes: [...sizes],
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current || !containerRef.current) return;
        const { index: idx, startPos, startSizes } = dragging.current;
        const rect = containerRef.current.getBoundingClientRect();
        const totalPx = direction === "horizontal" ? rect.width : rect.height;
        const currentPos = direction === "horizontal" ? ev.clientX : ev.clientY;
        const deltaPx = currentPos - startPos;
        const deltaPct = (deltaPx / totalPx) * 100;

        const minA = panes[idx]?.props.minSize ?? 10;
        const maxA = panes[idx]?.props.maxSize ?? 90;
        const minB = panes[idx + 1]?.props.minSize ?? 10;
        const maxB = panes[idx + 1]?.props.maxSize ?? 90;

        let newA = startSizes[idx] + deltaPct;
        let newB = startSizes[idx + 1] - deltaPct;

        if (newA < minA) { newB += minA - newA; newA = minA; }
        if (newB < minB) { newA += minB - newB; newB = minB; }
        if (newA > maxA) { newB += newA - maxA; newA = maxA; }
        if (newB > maxB) { newA += newB - maxB; newB = maxB; }

        const next = [...startSizes];
        next[idx] = newA;
        next[idx + 1] = newB;
        setSizes(next);
      };

      const handleMouseUp = () => {
        dragging.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [direction, sizes, panes]
  );

  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={containerRef}
      className={`splitter-container splitter-${direction} ${className}`}
    >
      {panes.map((pane, i) => (
        <React.Fragment key={i}>
          <div
            className="splitter-pane"
            style={{ [isHorizontal ? "width" : "height"]: `${sizes[i] ?? 50}%` }}
          >
            {pane.props.children}
          </div>
          {i < panes.length - 1 && (
            <div
              className={`splitter-gutter splitter-gutter-${direction}`}
              onMouseDown={(e) => handleMouseDown(i, e)}
            >
              <div className="splitter-gutter-handle" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

Splitter.Pane = SplitterPane;

export default Splitter;
