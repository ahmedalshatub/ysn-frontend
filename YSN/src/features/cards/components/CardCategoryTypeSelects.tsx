import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "../../../shared/components/inputs/Select";
import { useGetCardCategoriesQuery } from "../../cardCategories/api/CardCategories.api";
import { useGetCardTypesQuery } from "../../cardTypes/api/CardTypes.api";

interface CardCategoryTypeSelectsProps {
  categoryId?: number;
  cardTypeId?: number;
  onChange: (categoryId: number | undefined, cardTypeId: number | undefined) => void;
  required?: boolean;
  hideType?: boolean;
  typeErrorMessage?: string;
}

const toNumber = (value: string | number) => (value === "" ? undefined : Number(value));

const CardCategoryTypeSelects = ({ categoryId, cardTypeId, onChange, required, hideType, typeErrorMessage }: CardCategoryTypeSelectsProps) => {
  const { t } = useTranslation();
  const suffix = required ? " *" : "";

  const { data: categories } = useGetCardCategoriesQuery(
    { isActive: true, isDeleted: false, sortBy: "SortOrder", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const { data: cardTypes } = useGetCardTypesQuery(
    { cardCategoryId: categoryId, isActive: true, isDeleted: false, sortBy: "SortOrder", isAscending: true },
    { skip: !categoryId || hideType, refetchOnMountOrArgChange: true }
  );

  const categoryOptions = useMemo(
    () => (categories?.items ?? []).map((category) => ({ value: category.id, name: category.name })),
    [categories]
  );
  const typeOptions = useMemo(
    () => (cardTypes?.items ?? []).map((cardType) => ({ value: cardType.id, name: cardType.name })),
    [cardTypes]
  );

  return (
    <>
      <Select
        name="cardCategoryId"
        label={`${t("cards.category")}${suffix}`}
        value={categoryId ?? ""}
        onChange={(value) => onChange(toNumber(value), undefined)}
        options={categoryOptions}
        valueKey="value"
        labelKey="name"
        placeholder={required ? t("cards.selectCategory") : t("common.all")}
        searchable
        size="md"
      />
      {!hideType && (
        <Select
          name="cardTypeId"
          label={`${t("cards.cardType")}${suffix}`}
          value={cardTypeId ?? ""}
          onChange={(value) => onChange(categoryId, toNumber(value))}
          options={typeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={required ? t("cards.selectCardType") : t("common.all")}
          disabled={!categoryId}
          searchable
          error={!!typeErrorMessage}
          errorMessage={typeErrorMessage}
          size="md"
        />
      )}
    </>
  );
};

export default CardCategoryTypeSelects;
