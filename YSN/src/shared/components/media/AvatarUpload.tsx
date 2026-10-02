import React, { useState, useRef, useCallback } from "react";
import CameraIcon from "../../../assets/icons/CameraIcon";
import XIcon from "../../../assets/icons/XIcon";

interface AvatarUploadProps {
  value?: string;
  defaultValue?: string;
  size?: number;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  shape?: "circle" | "square";
  placeholder?: React.ReactNode;
  onChange?: (file: File | null, preview: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

const defaultPlaceholder = (
  <CameraIcon strokeWidth="1.5" />
);

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  value: controlledValue,
  defaultValue = "",
  size = 120,
  accept = "image/png,image/jpeg,image/gif,image/webp",
  maxSizeMB = 5,
  disabled = false,
  shape = "circle",
  placeholder = defaultPlaceholder,
  onChange,
  onError,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isHovering, setIsHovering] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentValue = controlledValue ?? internalValue;

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        onError?.("Please select an image file");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        onError?.(`File must be smaller than ${maxSizeMB}MB`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setInternalValue(url);
        onChange?.(file, url);
      };
      reader.readAsDataURL(file);
    },
    [maxSizeMB, onChange, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsHovering(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setInternalValue("");
    onChange?.(null, "");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div
      className={`avatar-upload avatar-upload-${shape} ${disabled ? "avatar-upload-disabled" : ""} ${isHovering ? "avatar-upload-hover" : ""} ${className}`}
      style={{ width: size, height: size }}
      onClick={() => !disabled && fileRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); !disabled && setIsHovering(true); }}
      onDragLeave={() => setIsHovering(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="avatar-upload-input"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        disabled={disabled}
      />

      {currentValue ? (
        <>
          <img src={currentValue} alt="Avatar" className="avatar-upload-img" />
          <div className="avatar-upload-overlay">
            <CameraIcon strokeWidth="2" className="avatar-upload-overlay-icon" />
          </div>
          <button type="button" className="avatar-upload-remove" onClick={handleRemove}>
            <XIcon strokeWidth="2" />
          </button>
        </>
      ) : (
        <div className="avatar-upload-placeholder">
          <span className="avatar-upload-placeholder-icon">{placeholder}</span>
          <span className="avatar-upload-placeholder-text">Upload</span>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
