import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import Input from "./Input";

interface FormAmountInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  allowDecimals?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const formatValue = (value: unknown, allowDecimals: boolean) => {
  if (value === null || value === undefined || value === "") return "";
  const number = Number(value);
  if (Number.isNaN(number)) return "";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: allowDecimals ? 2 : 0 }).format(number);
};

const parseValue = (text: string, allowDecimals: boolean) => {
  const cleaned = text.replace(allowDecimals ? /[^0-9.]/g : /[^0-9]/g, "");
  if (cleaned === "") return null;
  const number = Number(cleaned);
  return Number.isNaN(number) ? null : number;
};

const FormAmountInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  allowDecimals = false,
  disabled,
  error,
  errorMessage,
}: FormAmountInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        inputMode={allowDecimals ? "decimal" : "numeric"}
        dir="ltr"
        value={formatValue(field.value, allowDecimals)}
        onChange={(event) => field.onChange(parseValue(event.target.value, allowDecimals))}
        onBlur={field.onBlur}
        disabled={disabled}
        error={error}
        errorMessage={errorMessage}
        size="md"
      />
    )}
  />
);

export default FormAmountInput;
