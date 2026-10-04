import { useCallback, useMemo, useState } from "react";
import type { AnyObjectSchema } from "yup";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import { currentMonthRange } from "../services/ReportDates";
import type { ReportPaging } from "../types/Report.types";

interface ReportStateOptions<TFilter> {
  initial: TFilter;
  fixed?: Partial<TFilter>;
  sortBy: string;
  isAscending: boolean;
  schema?: AnyObjectSchema | null;
  withDates?: boolean;
}

const clean = <TFilter extends object>(values: TFilter): TFilter =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value === "" || value === null ? undefined : value])) as TFilter;

const validationError = (schema: AnyObjectSchema | null | undefined, values: object) => {
  if (!schema) return null;
  try {
    schema.validateSync(values);
    return null;
  } catch (error) {
    return (error as { message?: string }).message ?? "errors.Validation.InvalidValue";
  }
};

const useReportState = <TFilter extends object>({ initial, fixed, sortBy, isAscending, schema, withDates = true }: ReportStateOptions<TFilter>) => {
  const start = useMemo(() => ({ ...(withDates ? currentMonthRange() : {}), ...initial, ...fixed }) as TFilter, [initial, fixed, withDates]);
  const [values, setValues] = useState<TFilter>(start);
  const [paging, setPaging] = useState<ReportPaging>({ pageNumber: 1, pageSize: 25, sortBy, isAscending });
  const [refreshKey, setRefreshKey] = useState(0);

  const change = useCallback(
    (changes: Partial<TFilter>) => {
      setValues((previous) => ({ ...previous, ...changes, ...fixed }));
      setPaging((previous) => ({ ...previous, pageNumber: 1 }));
    },
    [fixed]
  );

  const clear = useCallback(() => {
    setValues(start);
    setPaging((previous) => ({ ...previous, pageNumber: 1 }));
  }, [start]);

  const search = useCallback(() => setRefreshKey((key) => key + 1), []);

  const filter = useMemo(() => clean(values), [values]);
  const error = useMemo(() => validationError(schema, filter), [schema, filter]);
  const query = useMemo(() => ({ ...filter, ...paging, refreshKey }), [filter, paging, refreshKey]);

  const table = {
    paging,
    onPageChange: (page: number) => setPaging((previous) => ({ ...previous, pageNumber: page })),
    onPageSizeChange: (size: number) => setPaging((previous) => ({ ...previous, pageSize: size, pageNumber: 1 })),
    onSort: (column: string, direction: SortDirection) =>
      setPaging((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 })),
  };

  return { values, change, clear, search, filter, query, error, table };
};

export type ReportTableState = ReturnType<typeof useReportState>["table"];

export default useReportState;
