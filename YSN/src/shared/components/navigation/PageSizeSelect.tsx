import Select from "../inputs/Select";

interface PageSizeSelectProps {
  value: number;
  options?: number[];
  onChange: (size: number) => void;
}

const PageSizeSelect = ({ value, options = [12, 24, 48], onChange }: PageSizeSelectProps) => (
  <div className="w-20">
    <Select
      name="pageSize"
      value={value}
      onChange={(next) => onChange(Number(next))}
      options={options.map((size) => ({ value: size, name: String(size) }))}
      valueKey="value"
      labelKey="name"
      size="sm"
    />
  </div>
);

export default PageSizeSelect;
