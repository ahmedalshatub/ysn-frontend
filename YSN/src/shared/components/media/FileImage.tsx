import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const useFileSrc = (path?: string | null) => {
  const token = useSelector((state: RootState) => state.auth.jwtToken);
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (!path) {
      setSrc("");
      return;
    }

    const url = path.startsWith("http")
      ? path
      : `${import.meta.env.VITE_API_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    let objectUrl = "";
    let cancelled = false;

    fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setSrc("");
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path, token]);

  return src;
};

interface FileImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  path?: string | null;
  fallback?: React.ReactNode;
}

const FileImage = ({ path, fallback = null, alt = "", ...rest }: FileImageProps) => {
  const src = useFileSrc(path);

  if (!src) return <>{fallback}</>;

  return <img src={src} alt={alt} {...rest} />;
};

export default FileImage;
