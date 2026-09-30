import { Controller, type FieldValues, type Path, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FileUpload from "./FileUpload";
import type { FileUploadVariant, FileUploadSize } from "./FileUpload";
import type { Accept } from "react-dropzone";

interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
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
  className?: string;
  errorMessage?: string;
}

const FormFileUpload = <T extends FieldValues>({
  name,
  control,
  variant,
  size,
  accept,
  maxFiles,
  maxSize,
  multiple,
  disabled,
  showPreview,
  showFileList,
  label,
  description,
  className,
  errorMessage,
}: FormFileUploadProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FileUpload
          variant={variant}
          size={size}
          accept={accept}
          maxFiles={maxFiles}
          maxSize={maxSize}
          multiple={multiple}
          disabled={disabled}
          showPreview={showPreview}
          showFileList={showFileList}
          label={label}
          description={description}
          error={errorMessage ?? (fieldState.error?.message ? t(fieldState.error.message) : undefined)}
          value={field.value || []}
          onChange={(files) => field.onChange(files)}
          className={className}
        />
      )}
    />
  );
};

export default FormFileUpload;
