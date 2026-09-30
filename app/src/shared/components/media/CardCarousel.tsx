import React from "react";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

type CardCarouselGap = "sm" | "md" | "lg";

interface CardCarouselProps {
  children: React.ReactNode;
  gap?: CardCarouselGap;
  showArrows?: boolean;
  peek?: boolean;
  className?: string;
}

const gapClasses: Record<CardCarouselGap, { gap: string; scroll: number }> = {
  sm: { gap: "gap-3", scroll: 300 },
  md: { gap: "gap-4", scroll: 340 },
  lg: { gap: "gap-6", scroll: 400 },
};


const CardCarousel: React.FC<CardCarouselProps> = ({
  children,
  gap = "md",
  showArrows = true,
  peek = true,
  className = "",
}) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const dragState = React.useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const checkScroll = React.useCallback(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  React.useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  const scrollBy = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * gapClasses[gap].scroll, behavior: "smooth" });
  };

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ds = dragState.current;

    const onMouseDown = (e: MouseEvent) => {
      ds.isDown = true;
      ds.moved = false;
      ds.startX = e.pageX - el.offsetLeft;
      ds.scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMouseLeave = () => { ds.isDown = false; el.style.cursor = ""; };
    const onMouseUp = () => { ds.isDown = false; el.style.cursor = ""; };
    const onMouseMove = (e: MouseEvent) => {
      if (!ds.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - ds.startX) * 1.5;
      if (Math.abs(walk) > 3) ds.moved = true;
      el.scrollLeft = ds.scrollLeft - walk;
    };
    const onTouchStart = (e: TouchEvent) => {
      ds.isDown = true;
      ds.moved = false;
      ds.startX = e.touches[0].pageX - el.offsetLeft;
      ds.scrollLeft = el.scrollLeft;
    };
    const onTouchEnd = () => { ds.isDown = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!ds.isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - ds.startX) * 1.5;
      if (Math.abs(walk) > 3) ds.moved = true;
      el.scrollLeft = ds.scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className={`card-carousel-wrapper relative group ${className}`}>
      <div
        ref={trackRef}
        className={`carousel-track flex overflow-x-auto py-2 select-none ${gapClasses[gap].gap} ${peek ? "pr-12" : ""} scroll-smooth`}
      >
        {children}
      </div>

      {showArrows && canScrollLeft && (
        <button
          type="button"
          className="carousel-nav-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full carousel-outside-arrow flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          onClick={() => scrollBy(-1)}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}
      {showArrows && canScrollRight && (
        <button
          type="button"
          className="carousel-nav-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full carousel-outside-arrow flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          onClick={() => scrollBy(1)}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}

      {peek && canScrollRight && (
        <div className="card-carousel-fade absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default CardCarousel;
