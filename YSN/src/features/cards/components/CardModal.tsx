import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import Input from "../../../shared/components/inputs/Input";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import EditIcon from "../../../assets/icons/EditIcon";
import { useUpdateCardMutation } from "../api/Cards.api";
import CardCategoryTypeSelects from "./CardCategoryTypeSelects";
import type { CardListDto } from "../types/Cards.types";
import FormSection from "../../../shared/components/forms/FormSection";
import LayersIcon from "../../../assets/icons/LayersIcon";

interface CardModalProps {
  open: boolean;
  card: CardListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const CardModal = ({ open, card, onClose, onSuccess }: CardModalProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const canViewSerial = can(Permission.CardsViewSerial);
  const [categoryId, setCategoryId] = useState<number | undefined>(card.cardCategoryId);
  const [cardTypeId, setCardTypeId] = useState<number | undefined>(card.cardTypeId);
  const [serial, setSerial] = useState(card.serialNumber);
  const [serialError, setSerialError] = useState("");
  const [updateCard, { isLoading }] = useUpdateCardMutation();

  const onSubmit = async () => {
    const trimmed = serial.trim();
    if (canViewSerial && !trimmed) {
      setSerialError(t("errors.Card.SerialRequired"));
      return;
    }
    if (!cardTypeId) return;

    try {
      await updateCard({
        id: card.id,
        data: {
          cardTypeId,
          serialNumber: canViewSerial && trimmed !== card.serialNumber ? trimmed : undefined,
        },
      }).unwrap();
      showSuccess(t("cards.successUpdate"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={() => {
        onSubmit();
      }}
      title={t("cards.editCard")}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<EditIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<LayersIcon />} title={t("cards.cardType")}>
          <CardCategoryTypeSelects
            categoryId={categoryId}
            cardTypeId={cardTypeId}
            required
            onChange={(nextCategory, nextType) => {
              setCategoryId(nextCategory);
              setCardTypeId(nextType);
            }}
          />
        </FormSection>
        <FormSection icon={<EditIcon />} title={t("cards.serialNumber")}>
          <Input
            name="serialNumber"
            label={`${t("cards.serialNumber")} *`}
            value={serial}
            onChange={(event) => {
              setSerial(event.target.value);
              setSerialError("");
            }}
            disabled={!canViewSerial}
            error={!!serialError}
            errorMessage={serialError}
            size="md"
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default CardModal;
