import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "../../../../shared/components/inputs/Select";
import type { ReportOption } from "../../types/Report.types";

interface ReportOptionSelectProps<TValue extends number | boolean> {
  name: string;
  label: string;
  value?: TValue;
  options: ReportOption[];
  onChange: (value: TValue | undefined) => void;
  searchable?: boolean;
}

const ReportOptionSelect = <TValue extends number | boolean>({ name, label, value, options, onChange, searchable }: ReportOptionSelectProps<TValue>) => {
  const { t } = useTranslation();
  const items = useMemo(() => options.map((option) => ({ value: String(option.value), name: option.label })), [options]);

  const handleChange = (selected: string | number) => {
    const text = String(selected);
    if (text === "") return onChange(undefined);
    const match = options.find((option) => String(option.value) === text);
    onChange(match?.value as TValue | undefined);
  };

  return (
    <Select
      name={name}
      label={label}
      value={value === undefined ? "" : String(value)}
      onChange={handleChange}
      options={items}
      valueKey="value"
      labelKey="name"
      placeholder={t("common.all")}
      searchable={searchable}
      size="md"
    />
  );
};

export default ReportOptionSelect;
