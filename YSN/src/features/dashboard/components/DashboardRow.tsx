interface DashboardRowProps {
  title: string;
  subtitle?: string | null;
  values: string[];
  onClick?: () => void;
}

const DashboardRow = ({ title, subtitle, values, onClick }: DashboardRowProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className="flex w-full items-center justify-between gap-3 px-2 py-2.5 text-start user-dropdown-item disabled:cursor-default"
  >
    <div className="min-w-0">
      <p className="truncate text-sm font-medium ce-heading">{title}</p>
      {subtitle && <p className="truncate text-xs ce-muted">{subtitle}</p>}
    </div>
    <div className="flex flex-shrink-0 gap-3 text-sm ce-heading">
      {values.map((value, index) => (
        <span key={index}>{value}</span>
      ))}
    </div>
  </button>
);

export default DashboardRow;
