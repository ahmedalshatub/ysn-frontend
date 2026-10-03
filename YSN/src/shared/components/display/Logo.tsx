type LogoOrientation = "landscape" | "portrait";
type LogoTheme = "light" | "dark";
interface LogoProps {
  orientation?: LogoOrientation;
  theme?: LogoTheme;
  className?: string;
  height?: number;
  width?: number;
}

const Logo = ({
  orientation = "landscape",
  theme = "light",
  className = "",
  height,
  width,
}: LogoProps) => {
  const logoSrc = new URL(
    `../../../assets/images/logo-${theme}-${orientation}.png`,
    import.meta.url
  ).href;

  return (
    <img
      src={logoSrc}
      alt="Logo"
      className={`logo-img ${className}`}
      style={{
        height: height ? `${height}px` : "auto",
        width: width ? `${width}px` : "auto",
      }}
    />
  );
};

export default Logo;
