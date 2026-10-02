import React from "react";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

type CarouselVariant = "default" | "card" | "minimal" | "gradient";
type CarouselIndicator = "dots" | "bars" | "numbers" | "progress" | "none";
type CarouselAnimation = "slide" | "fade" | "scale";

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  slides: CarouselSlide[];
  variant?: CarouselVariant;
  indicator?: CarouselIndicator;
  animation?: CarouselAnimation;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  arrowStyle?: "inside" | "outside" | "overlay";
  loop?: boolean;
  pauseOnHover?: boolean;
  height?: string;
  className?: string;
  onSlideChange?: (index: number) => void;
}


const Carousel: React.FC<CarouselProps> = ({
  slides,
  variant = "default",
  indicator = "dots",
  animation = "slide",
  autoPlay = false,
  autoPlayInterval = 4000,
  showArrows = true,
  arrowStyle = "inside",
  loop = true,
  pauseOnHover = true,
  height = "h-64",
  className = "",
  onSlideChange,
}) => {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef({ isDown: false, startX: 0, startY: 0, moved: false });

  const total = slides.length;

  const goTo = React.useCallback(
    (index: number) => {
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, index));
      }
      setCurrent(next);
      setAnimKey((k) => k + 1);
      onSlideChange?.(next);
    },
    [total, loop, onSlideChange]
  );

  const goNext = React.useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = React.useCallback(() => goTo(current - 1), [current, goTo]);

  React.useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, goNext, total]);

  React.useEffect(() => {
    if (animation === "slide" && trackRef.current) {
      trackRef.current.scrollTo({ left: current * trackRef.current.offsetWidth, behavior: "smooth" });
    }
  }, [current, animation]);

  const canGoPrev = loop || current > 0;
  const canGoNext = loop || current < total - 1;

  const handleDragStart = (clientX: number, clientY: number) => {
    dragRef.current = { isDown: true, startX: clientX, startY: clientY, moved: false };
  };

  const handleDragEnd = (clientX: number) => {
    if (!dragRef.current.isDown) return;
    const diff = dragRef.current.startX - clientX;
    dragRef.current.isDown = false;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    handleDragEnd(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX);
  };

  const containerClasses = (() => {
    const base = "relative overflow-hidden";
    switch (variant) {
      case "card":
        return `${base} carousel-variant-card rounded-2xl`;
      case "gradient":
        return `${base} rounded-2xl carousel-variant-gradient`;
      case "minimal":
        return `${base} rounded-xl`;
      default:
        return `${base} rounded-2xl carousel-variant-default`;
    }
  })();

  const arrowBtnClasses = (() => {
    switch (variant) {
      case "gradient":
        return "carousel-nav-btn w-9 h-9 rounded-full carousel-arrow-gradient flex items-center justify-center";
      case "minimal":
        return "carousel-nav-btn w-9 h-9 rounded-full carousel-arrow-minimal flex items-center justify-center";
      default:
        return "carousel-nav-btn w-9 h-9 rounded-full carousel-arrow-default flex items-center justify-center";
    }
  })();

  const animationClass = (() => {
    switch (animation) {
      case "fade":
        return "carousel-slide-fade";
      case "scale":
        return "carousel-slide-scale";
      default:
        return "";
    }
  })();

  const renderSlideContent = () => {
    if (animation === "slide") {
      return (
        <div
          ref={trackRef}
          className={`carousel-track flex ${height} w-full overflow-x-hidden`}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0"
            >
              {slide.content}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={`relative ${height} w-full`}>
        <div key={animKey} className={`absolute inset-0 ${animationClass}`}>
          {slides[current].content}
        </div>
      </div>
    );
  };

  const renderArrows = () => {
    if (!showArrows || total <= 1) return null;

    if (arrowStyle === "outside") {
      return null;
    }

    const positionClasses = arrowStyle === "overlay"
      ? "absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none z-10"
      : "absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none z-10";

    return (
      <div className={positionClasses}>
        <button
          type="button"
          className={`${arrowBtnClasses} pointer-events-auto`}
          onClick={goPrev}
          disabled={!canGoPrev}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          className={`${arrowBtnClasses} pointer-events-auto`}
          onClick={goNext}
          disabled={!canGoNext}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderOutsideArrows = () => {
    if (!showArrows || arrowStyle !== "outside" || total <= 1) return null;

    return (
      <div className="flex items-center gap-2 mt-4 justify-center">
        <button
          type="button"
          className="carousel-nav-btn w-9 h-9 rounded-full carousel-outside-arrow flex items-center justify-center"
          onClick={goPrev}
          disabled={!canGoPrev}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="carousel-nav-btn w-9 h-9 rounded-full carousel-outside-arrow flex items-center justify-center"
          onClick={goNext}
          disabled={!canGoNext}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const dotActiveClass = variant === "gradient" ? "carousel-dot-active-gradient" : "carousel-dot-active-default";
  const dotInactiveClass = variant === "gradient" ? "carousel-dot-inactive-gradient" : "carousel-dot-inactive-default";
  const numberTextClass = variant === "gradient" ? "carousel-number-text-gradient" : "carousel-number-text";
  const barActiveClass = variant === "gradient" ? "carousel-bar-active-gradient" : "carousel-bar-active-default";
  const barInactiveClass = variant === "gradient" ? "carousel-bar-inactive-gradient" : "carousel-bar-inactive-default";

  const renderIndicator = () => {
    if (indicator === "none" || total <= 1) return null;

    if (indicator === "dots") {
      return (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? `${dotActiveClass} carousel-dot-active`
                  : `${dotInactiveClass} w-2`
              }`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      );
    }

    if (indicator === "bars") {
      return (
        <div className="flex items-center justify-center gap-1 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? `${barActiveClass} w-8`
                  : `${barInactiveClass} w-4`
              }`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      );
    }

    if (indicator === "numbers") {
      return (
        <div className="flex items-center justify-center mt-4">
          <span className={`text-sm font-medium ${numberTextClass}`}>
            <span className={variant === "gradient" ? "carousel-number-current-gradient" : "carousel-number-current"}>{current + 1}</span>
            {" / "}
            {total}
          </span>
        </div>
      );
    }

    if (indicator === "progress") {
      const progressPct = ((current + 1) / total) * 100;
      return (
        <div className={`mt-4 h-1 rounded-full overflow-hidden ${variant === "gradient" ? "carousel-progress-track-gradient" : "carousel-progress-track"}`}>
          <div
            className={`carousel-progress-bar h-full rounded-full ${variant === "gradient" ? "carousel-progress-fill-gradient" : "carousel-progress-fill-default"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`carousel-wrapper ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={containerClasses}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {renderSlideContent()}
        {renderArrows()}
      </div>
      {renderIndicator()}
      {renderOutsideArrows()}
    </div>
  );
};

export type { CarouselSlide };
export default Carousel;
