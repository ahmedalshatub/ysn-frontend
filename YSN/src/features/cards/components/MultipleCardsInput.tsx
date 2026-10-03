import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/inputs/Input";
import Button from "../../../shared/components/buttons/Button";
import PlusIcon from "../../../assets/icons/PlusIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";

interface MultipleCardsInputProps {
  rows: string[];
  onChange: (rows: string[]) => void;
}

const MultipleCardsInput = ({ rows, onChange }: MultipleCardsInputProps) => {
  const { t } = useTranslation();
  const update = (index: number, value: string) => onChange(rows.map((row, position) => (position === index ? value : row)));

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={index} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              name={`serial-${index}`}
              label={`${t("cards.serialNumber")} ${index + 1}`}
              value={row}
              onChange={(event) => update(index, event.target.value)}
              size="md"
            />
          </div>
          {rows.length > 1 && (
            <Button
              variant="light"
              size="md"
              icon={<TrashIcon className="h-4 w-4" />}
              onClick={() => onChange(rows.filter((_, position) => position !== index))}
            />
          )}
        </div>
      ))}
      <Button
        variant="light"
        size="sm"
        label={t("cards.addRow")}
        icon={<PlusIcon className="h-4 w-4" />}
        iconPosition="left"
        onClick={() => onChange([...rows, ""])}
      />
    </div>
  );
};

export default MultipleCardsInput;
