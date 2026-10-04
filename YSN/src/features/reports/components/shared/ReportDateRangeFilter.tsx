import { useTranslation } from "react-i18next";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import { matchingPreset, presetRange } from "../../services/ReportDates";
import { reportDatePresetKeys, reportDatePresetList, type ReportDatePresetValue, type ReportDateRange } from "../../types/Report.types";

interface ReportDateRangeFilterProps {
  value: ReportDateRange;
  onChange: (range: ReportDateRange) => void;
}

const ReportDateRangeFilter = ({ value, onChange }: ReportDateRangeFilterProps) => {
  const { t } = useTranslation();
  const preset = matchingPreset(value);
  const options = reportDatePresetList.map((item) => ({ value: item, name: t(reportDatePresetKeys[item]) }));

  const choosePreset = (selected: string | number) => {
    const range = presetRange(String(selected) as ReportDatePresetValue);
    if (range) onChange(range);
  };

  return (
    <>
      <Select
        name="datePreset"
        label={t("reports.common.period")}
        value={preset}
        onChange={choosePreset}
        options={options}
        valueKey="value"
        labelKey="name"
        size="md"
      />
      <DatePicker
        label={`${t("invoices.fromDate")} *`}
        value={value.fromDate || ""}
        onChange={(date) => onChange({ ...value, fromDate: date || undefined })}
        size="md"
      />
      <DatePicker
        label={`${t("invoices.toDate")} *`}
        value={value.toDate || ""}
        onChange={(date) => onChange({ ...value, toDate: date || undefined })}
        size="md"
      />
    </>
  );
};

export default ReportDateRangeFilter;
