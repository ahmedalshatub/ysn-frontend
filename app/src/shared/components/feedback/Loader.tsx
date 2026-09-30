import React from "react";

type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";
type LoaderVariant =
  | "spinner"
  | "dots"
  | "pulse"
  | "bars"
  | "ring"
  | "bounce";
type LoaderColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "white";

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  color?: LoaderColor;
  label?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  label,
  overlay = false,
  fullScreen = false,
  className = "",
}) => {
  const wrapperClass = [
    "loader-wrapper",
    overlay ? "loader-overlay" : "",
    fullScreen ? "loader-fullscreen" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const loaderClass = [
    "loader",
    `loader-${variant}`,
    `loader-${size}`,
    `loader-color-${color}`,
  ].join(" ");

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return (
          <div className={loaderClass}>
            <span className="loader-dot" />
            <span className="loader-dot" />
            <span className="loader-dot" />
          </div>
        );
      case "pulse":
        return <div className={loaderClass} />;
      case "bars":
        return (
          <div className={loaderClass}>
            <span className="loader-bar" />
            <span className="loader-bar" />
            <span className="loader-bar" />
            <span className="loader-bar" />
          </div>
        );
      case "ring":
        return (
          <div className={loaderClass}>
            <div className="loader-ring-inner" />
          </div>
        );
      case "bounce":
        return (
          <div className={loaderClass}>
            <span className="loader-bounce-dot" />
            <span className="loader-bounce-dot" />
            <span className="loader-bounce-dot" />
          </div>
        );
      case "spinner":
      default:
        return <div className={loaderClass} />;
    }
  };

  return (
    <div className={wrapperClass}>
      {renderLoader()}
      {label && <span className="loader-label">{label}</span>}
    </div>
  );
};

export default Loader;
