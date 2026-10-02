import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useGetActiveCitiesQuery } from "../../features/cities/api/Cities.api";

const useMyCities = () => {
  const hasAllCities = useSelector((state: RootState) => state.auth.hasAllCities);
  const isSuperAdmin = useSelector((state: RootState) => state.auth.isSuperAdmin);
  const cityIds = useSelector((state: RootState) => state.auth.cityIds);
  const { data, isLoading } = useGetActiveCitiesQuery(undefined, { refetchOnMountOrArgChange: true });

  const cities = useMemo(
    () => (data ?? []).filter((city) => isSuperAdmin || hasAllCities || cityIds.includes(city.id)),
    [data, isSuperAdmin, hasAllCities, cityIds]
  );

  return { cities, isLoading, singleCityId: cities.length === 1 ? cities[0].id : undefined };
};

export default useMyCities;
