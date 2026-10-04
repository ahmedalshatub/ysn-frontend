import { useState, useCallback, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone, type Accept } from "react-dropzone";
import UploadIcon from "../../../assets/icons/UploadIcon";
import AlertCircleIcon from "../../../assets/icons/AlertCircleIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import FileImage from "../media/FileImage";

type FileUploadVariant = "default" | "minimal" | "bordered" | "filled";
type FileUploadSize = "sm" | "md" | "lg";

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
}

interface FileUploadProps {
  variant?: FileUploadVariant;
  size?: FileUploadSize;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
  showFileList?: boolean;
  label?: string;
  description?: string;
  error?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  onRemove?: (file: File) => void;
  className?: string;
  currentImage?: string | null;
}

const generateId = () => Math.random().toString(36).substring(2, 10);

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (type: string): ReactNode =>
  type.startsWith("image/") ? <ImageIcon className="h-5 w-5" /> : <FileTextIcon className="h-5 w-5" />;

const FileUpload = ({
  variant = "default",
  size = "md",
  accept,
  maxFiles = 0,
  maxSize = 10 * 1024 * 1024,
  multiple = true,
  disabled = false,
  showPreview = true,
  showFileList = true,
  label,
  description,
  error,
  value,
  onChange,
  onRemove,
  className = "",
  currentImage,
}: FileUploadProps) => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const currentFiles = useMemo(() => {
    if (value) {
      return value.map((file) => ({
        file,
        id: generateId(),
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));
    }
    return uploadedFiles;
  }, [value, uploadedFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        file,
        id: generateId(),
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        progress: 100,
      }));

      if (value !== undefined) {
        onChange?.(multiple ? [...value, ...acceptedFiles] : acceptedFiles);
      } else {
        const updated = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
        setUploadedFiles(updated);
        onChange?.(updated.map((f) => f.file));
      }
    },
    [value, uploadedFiles, onChange, multiple]
  );

  const removeFile = useCallback(
    (fileId: string) => {
      if (value !== undefined) {
        const fileToRemove = currentFiles.find((f) => f.id === fileId);
        if (fileToRemove) {
          onRemove?.(fileToRemove.file);
          onChange?.(value.filter((f) => f !== fileToRemove.file));
        }
      } else {
        const fileToRemove = uploadedFiles.find((f) => f.id === fileId);
        if (fileToRemove) {
          if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
          onRemove?.(fileToRemove.file);
          const updated = uploadedFiles.filter((f) => f.id !== fileId);
          setUploadedFiles(updated);
          onChange?.(updated.map((f) => f.file));
        }
      }
    },
    [value, uploadedFiles, currentFiles, onChange, onRemove]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles || undefined,
    maxSize,
    multiple,
    disabled,
  });

  const acceptedFormats = useMemo(() => {
    if (!accept) return "";
    const extensions = Object.values(accept).flat();
    return extensions.join(", ");
  }, [accept]);

  const sizeClasses: Record<FileUploadSize, string> = {
    sm: "py-4 px-4",
    md: "py-8 px-6",
    lg: "py-12 px-8",
  };

  const iconSizes: Record<FileUploadSize, string> = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizes: Record<FileUploadSize, { title: string; desc: string }> = {
    sm: { title: "text-sm", desc: "text-xs" },
    md: { title: "text-base", desc: "text-sm" },
    lg: { title: "text-lg", desc: "text-base" },
  };

  const variantClasses: Record<FileUploadVariant, string> = {
    default: `file-upload-default ${isDragActive ? "file-upload-drag-active" : ""} ${isDragReject ? "file-upload-drag-reject" : ""} ${error ? "file-upload-error" : ""}`,
    minimal: `file-upload-minimal ${isDragActive ? "file-upload-drag-active" : ""} ${isDragReject ? "file-upload-drag-reject" : ""} ${error ? "file-upload-error" : ""}`,
    bordered: `file-upload-bordered ${isDragActive ? "file-upload-drag-active" : ""} ${isDragReject ? "file-upload-drag-reject" : ""} ${error ? "file-upload-error" : ""}`,
    filled: `file-upload-filled ${isDragActive ? "file-upload-drag-active" : ""} ${isDragReject ? "file-upload-drag-reject" : ""} ${error ? "file-upload-error" : ""}`,
  };

  const rejectionMessages = fileRejections.map((rejection) => {
    const errors = rejection.errors.map((e) => e.message).join(", ");
    return `${rejection.file.name}: ${errors}`;
  });

  return (
    <div className={`file-upload-wrapper ${className}`}>
      {label && (
        <label className={`block font-medium form-label mb-1.5 ${textSizes[size].title}`}>
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`file-upload-zone ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "file-upload-disabled" : ""}`}
      >
        <input {...getInputProps()} className="hidden" />

        <div className="flex flex-col items-center text-center gap-2">
          <div className={`file-upload-icon ${iconSizes[size]}`}>
            {isDragActive && !isDragReject && (
              <UploadIcon strokeWidth="1.5" className="file-upload-icon-drag w-full h-full" />
            )}
            {isDragReject && (
              <AlertCircleIcon strokeWidth="1.5" className="file-upload-icon-reject w-full h-full" />
            )}
            {!isDragActive && (
              <UploadIcon strokeWidth="1.5" className="file-upload-icon-default w-full h-full" />
            )}
          </div>

          {isDragActive && !isDragReject && (
            <p className={`font-medium file-upload-text-active ${textSizes[size].title}`}>
              {t("fileUpload.dropHere")}
            </p>
          )}
          {isDragReject && (
            <p className={`font-medium file-upload-text-reject ${textSizes[size].title}`}>
              {t("fileUpload.notAccepted")}
            </p>
          )}
          {!isDragActive && (
            <>
              <p className={`font-medium file-upload-text-default ${textSizes[size].title}`}>
                {description || (
                  <>
                    <span className="file-upload-link">{t("fileUpload.clickToUpload")}</span>{" "}
                    {t("fileUpload.orDrag")}
                  </>
                )}
              </p>
              <p className={`file-upload-text-muted ${textSizes[size].desc}`}>
                {acceptedFormats && <span>{acceptedFormats}</span>}
                {acceptedFormats && maxSize && <span> • </span>}
                {maxSize && <span>{t("fileUpload.max", { size: formatFileSize(maxSize) })}</span>}
                {maxFiles > 0 && <span> • {t("fileUpload.upTo", { count: maxFiles })}</span>}
              </p>
            </>
          )}
        </div>
      </div>

      {rejectionMessages.length > 0 && (
        <div className="mt-2 space-y-1">
          {rejectionMessages.map((msg, i) => (
            <p key={i} className="input-error-text">{msg}</p>
          ))}
        </div>
      )}

      {error && <p className="mt-1.5 text-sm input-error-text">{error}</p>}

      {currentImage && currentFiles.length === 0 && (
        <div className="file-upload-list mt-4">
          <div className="file-upload-item">
            <FileImage path={currentImage} className="file-upload-preview" />
            <p className="flex-1 text-sm font-medium file-upload-filename">{t("common.currentImage")}</p>
          </div>
        </div>
      )}

      {showFileList && currentFiles.length > 0 && (
        <div className="file-upload-list mt-4 space-y-2">
          {currentFiles.map((uploadedFile) => (
            <div key={uploadedFile.id} className="file-upload-item">
              {showPreview && uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview}
                  alt={uploadedFile.file.name}
                  className="file-upload-preview"
                />
              ) : (
                <span className="file-upload-file-icon text-xl">
                  {getFileIcon(uploadedFile.file.type)}
                </span>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium file-upload-filename truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs file-upload-filesize">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(uploadedFile.id);
                }}
                className="file-upload-remove"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export type { FileUploadProps, UploadedFile, FileUploadVariant, FileUploadSize };
export default FileUpload;
