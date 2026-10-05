import { useTranslation } from "react-i18next";
import RadioButton from "../../../shared/components/inputs/RadioButton";
import { CityLinkAction, type CityLinkActionValue } from "../types/Cities.types";

interface CityLinkActionFieldProps {
  name: string;
  value: CityLinkActionValue;
  moveDescription: string;
  deleteDescription: string;
  onChange: (value: CityLinkActionValue) => void;
}

const CityLinkActionField = ({ name, value, moveDescription, deleteDescription, onChange }: CityLinkActionFieldProps) => {
  const { t } = useTranslation();

  return (
    <RadioButton
      name={name}
      value={String(value)}
      onChange={(selected) => onChange(Number(selected) as CityLinkActionValue)}
      options={[
        { value: String(CityLinkAction.Move), label: t("cities.linkMove"), description: moveDescription },
        { value: String(CityLinkAction.Delete), label: t("cities.linkDelete"), description: deleteDescription },
      ]}
      direction="vertical"
    />
  );
};

export default CityLinkActionField;
