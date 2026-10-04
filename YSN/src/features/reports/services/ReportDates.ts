import { ReportDatePreset, type ReportDatePresetValue, type ReportDateRange } from "../types/Report.types";

const pad = (value: number) => String(value).padStart(2, "0");

export const toDateValue = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const startOfWeek = (today: Date) => {
  const daysSinceSaturday = (today.getDay() + 1) % 7;
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceSaturday);
};

export const presetRange = (preset: ReportDatePresetValue, today = new Date()): ReportDateRange | null => {
  const year = today.getFullYear();
  const month = today.getMonth();
  switch (preset) {
    case ReportDatePreset.Today:
      return { fromDate: toDateValue(today), toDate: toDateValue(today) };
    case ReportDatePreset.ThisWeek:
      return { fromDate: toDateValue(startOfWeek(today)), toDate: toDateValue(today) };
    case ReportDatePreset.ThisMonth:
      return { fromDate: toDateValue(new Date(year, month, 1)), toDate: toDateValue(new Date(year, month + 1, 0)) };
    case ReportDatePreset.LastMonth:
      return { fromDate: toDateValue(new Date(year, month - 1, 1)), toDate: toDateValue(new Date(year, month, 0)) };
    case ReportDatePreset.ThisYear:
      return { fromDate: toDateValue(new Date(year, 0, 1)), toDate: toDateValue(new Date(year, 11, 31)) };
    default:
      return null;
  }
};

export const currentMonthRange = (): ReportDateRange => presetRange(ReportDatePreset.ThisMonth) ?? {};

export const matchingPreset = (range: ReportDateRange): ReportDatePresetValue => {
  const presets: ReportDatePresetValue[] = [
    ReportDatePreset.Today,
    ReportDatePreset.ThisWeek,
    ReportDatePreset.ThisMonth,
    ReportDatePreset.LastMonth,
    ReportDatePreset.ThisYear,
  ];
  const found = presets.find((preset) => {
    const candidate = presetRange(preset);
    return candidate?.fromDate === range.fromDate && candidate?.toDate === range.toDate;
  });
  return found ?? ReportDatePreset.Custom;
};
