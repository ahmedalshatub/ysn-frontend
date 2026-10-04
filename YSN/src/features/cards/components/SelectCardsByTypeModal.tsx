import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import LayersIcon from "../../../assets/icons/LayersIcon";
import CardCategoryTypeSelects from "./CardCategoryTypeSelects";
import type { CardFilter } from "../types/Cards.types";
import FormSection from "../../../shared/components/forms/FormSection";

interface SelectCardsByTypeModalProps {
  open: boolean;
  byCategory: boolean;
  onClose: () => void;
  onSelect: (filter: CardFilter) => void;
}

const SelectCardsByTypeModal = ({ open, byCategory, onClose, onSelect }: SelectCardsByTypeModalProps) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [cardTypeId, setCardTypeId] = useState<number | undefined>(undefined);
  const ready = byCategory ? !!categoryId : !!cardTypeId;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={() => {
        if (!ready) return;
        onSelect(byCategory ? { cardCategoryId: categoryId } : { cardTypeId });
        onClose();
      }}
      title={t(byCategory ? "cards.selectByCategory" : "cards.selectByType")}
      submitText={t("cards.select")}
      cancelText={t("common.cancel")}
      size="lg"
      icon={<LayersIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<LayersIcon />} title={t(byCategory ? "cards.category" : "cards.cardType")}>
          <CardCategoryTypeSelects
            categoryId={categoryId}
            cardTypeId={cardTypeId}
            hideType={byCategory}
            required
            onChange={(nextCategory, nextType) => {
              setCategoryId(nextCategory);
              setCardTypeId(nextType);
            }}
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default SelectCardsByTypeModal;
