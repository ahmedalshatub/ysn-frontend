import { DashboardPeriod, type DashboardFilterValues, type DashboardRange } from "../types/Dashboard.types";

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const startOf = (period: DashboardFilterValues["period"], today: Date) => {
  const date = new Date(today);
  if (period === DashboardPeriod.Week) date.setDate(date.getDate() - ((date.getDay() + 1) % 7));
  if (period === DashboardPeriod.Month) date.setDate(1);
  if (period === DashboardPeriod.Year) date.setMonth(0, 1);
  return date;
};

export const toRange = (values: DashboardFilterValues): DashboardRange => {
  const today = new Date();
  const custom = values.period === DashboardPeriod.Custom;
  const from = custom && values.fromDate ? values.fromDate : toDateKey(startOf(custom ? DashboardPeriod.Month : values.period, today));
  const to = custom && values.toDate ? values.toDate : toDateKey(today);
  return { fromDate: from, toDate: to, cityId: values.cityId };
};

export const rangeFilter = (range: DashboardRange) => ({
  fromDate: range.fromDate,
  toDate: `${range.toDate}T23:59:59`,
  cityId: range.cityId,
});

export const rangeDays = (range: DashboardRange) => {
  const days: string[] = [];
  const cursor = new Date(`${range.fromDate}T00:00:00`);
  const end = new Date(`${range.toDate}T00:00:00`);
  while (cursor <= end && days.length < 400) {
    days.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
};

export const dailyValues = <T extends { date: string }>(days: string[], rows: T[], pick: (row: T) => number, where?: (row: T) => boolean) => {
  const totals = new Map<string, number>();
  for (const row of rows) {
    if (where && !where(row)) continue;
    const key = row.date.slice(0, 10);
    totals.set(key, (totals.get(key) ?? 0) + pick(row));
  }
  return days.map((day) => totals.get(day) ?? 0);
};

export const withQuery = (path: string, params: Record<string, string | number | boolean | undefined | null>) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  }
  const text = query.toString();
  return text ? `${path}?${text}` : path;
};
