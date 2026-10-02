import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import TreeSelect from "./TreeSelect";

interface FormMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { value: number; label: string }[];
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const FormMultiSelect = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
  searchable = true,
  disabled,
  error,
  errorMessage,
}: FormMultiSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TreeSelect
        mode="multiple"
        label={label}
        placeholder={placeholder}
        searchable={searchable}
        disabled={disabled}
        error={error}
        errorMessage={errorMessage}
        options={options.map((option) => ({ id: String(option.value), label: option.label }))}
        value={((field.value as number[] | undefined) ?? []).map(String)}
        onChange={(values) => field.onChange(values.map(Number))}
      />
    )}
  />
);

export default FormMultiSelect;
