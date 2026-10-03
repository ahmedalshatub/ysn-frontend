import { useState } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import { useGetCardTypesQuery } from "../../cardTypes/api/CardTypes.api";
import CardCategoryTypeSelects from "../../cards/components/CardCategoryTypeSelects";

interface CardTypesPickerProps {
  selected: number[];
  onChange: (cardTypeIds: number[]) => void;
}

const CardTypesPicker = ({ selected, onChange }: CardTypesPickerProps) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const { data } = useGetCardTypesQuery(
    { cardCategoryId: categoryId, isDeleted: false, sortBy: "SortOrder", isAscending: true },
    { skip: !categoryId, refetchOnMountOrArgChange: true }
  );

  const toggle = (id: number, checked: boolean) =>
    onChange(checked ? [...selected, id] : selected.filter((item) => item !== id));

  return (
    <div className="space-y-3">
      <CardCategoryTypeSelects categoryId={categoryId} hideType required onChange={(next) => setCategoryId(next)} />
      {categoryId && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {(data?.items ?? []).map((cardType) => (
            <Checkbox
              key={cardType.id}
              label={cardType.name}
              checked={selected.includes(cardType.id)}
              onChange={(checked) => toggle(cardType.id, checked)}
            />
          ))}
        </div>
      )}
      <p className="form-hint">{t("discounts.cardTypesChosen", { count: selected.length })}</p>
    </div>
  );
};

export default CardTypesPicker;
