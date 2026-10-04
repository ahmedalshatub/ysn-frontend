import { useTranslation } from "react-i18next";
import ReportOptionSelect from "./ReportOptionSelect";

interface ReportYesNoSelectProps {
  name: string;
  label: string;
  value?: boolean;
  onChange: (value: boolean | undefined) => void;
}

const ReportYesNoSelect = ({ name, label, value, onChange }: ReportYesNoSelectProps) => {
  const { t } = useTranslation();
  const options = [
    { value: true, label: t("common.yes") },
    { value: false, label: t("common.no") },
  ];

  return <ReportOptionSelect<boolean> name={name} label={label} value={value} options={options} onChange={onChange} />;
};

export default ReportYesNoSelect;
