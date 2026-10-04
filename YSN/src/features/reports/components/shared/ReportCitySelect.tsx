import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useMyCities from "../../../../shared/hooks/useMyCities";
import ReportOptionSelect from "./ReportOptionSelect";

interface ReportCitySelectProps {
  value?: number;
  onChange: (cityId: number | undefined) => void;
}

const ReportCitySelect = ({ value, onChange }: ReportCitySelectProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const options = useMemo(() => cities.map((city) => ({ value: city.id, label: city.name })), [cities]);

  return <ReportOptionSelect<number> name="cityId" label={t("customers.city")} value={value} options={options} onChange={onChange} searchable />;
};

export default ReportCitySelect;
