interface ReportCardTypeCellProps {
  name: string | null;
  categoryName?: string | null;
  cityName?: string | null;
}

const ReportCardTypeCell = ({ name, categoryName, cityName }: ReportCardTypeCellProps) => (
  <div className="flex flex-col gap-1">
    <span className="font-medium">{name}</span>
    <span className="text-xs">{[categoryName, cityName].filter(Boolean).join(" - ")}</span>
  </div>
);

export default ReportCardTypeCell;
