import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const parse = (value: string): string | number | boolean => {
  if (value === "true" || value === "false") return value === "true";
  return /^-?\d+$/.test(value) ? Number(value) : value;
};

const useUrlFilter = <T extends object>(): Partial<T> => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const values: Record<string, string | number | boolean> = {};
    searchParams.forEach((value, key) => {
      values[key] = parse(value);
    });
    return values as Partial<T>;
  }, [searchParams]);
};

export default useUrlFilter;
