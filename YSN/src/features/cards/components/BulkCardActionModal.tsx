import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import LayersIcon from "../../../assets/icons/LayersIcon";
import { useBulkCardActionMutation } from "../api/Cards.api";
import CardCategoryTypeSelects from "./CardCategoryTypeSelects";
import CardProblemsReviewModal from "./CardProblemsReviewModal";
import {
  BulkCardAction,
  bulkCardActionKeys,
  bulkCardActionProblemKeys,
  type BulkCardActionValue,
  type CardSelection,
  type CardsBulkActionResultDto,
} from "../types/Cards.types";
import FormSection from "../../../shared/components/forms/FormSection";

interface BulkCardActionModalProps {
  open: boolean;
  action: BulkCardActionValue;
  selection: CardSelection;
  selectedCount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const BulkCardActionModal = ({ open, action, selection, selectedCount, onClose, onSuccess }: BulkCardActionModalProps) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  const [typeError, setTypeError] = useState("");
  const [review, setReview] = useState<CardsBulkActionResultDto | null>(null);
  const [mutate, { isLoading }] = useBulkCardActionMutation();
  const isChangeType = action === BulkCardAction.ChangeCardType;

  const send = async (applyValidOnly: boolean) => {
    if (isChangeType && !targetId) {
      setTypeError(t("errors.Card.TargetCardTypeRequired"));
      return;
    }

    try {
      const result = await mutate({
        action,
        cardIds: selection.mode === "ids" ? Array.from(selection.ids).map(Number) : undefined,
        filter: selection.mode === "filter" ? selection.filter : undefined,
        targetCardTypeId: isChangeType ? targetId : undefined,
        applyValidOnly,
      }).unwrap();

      if (!result.applied && result.validCount > 0) {
        setReview(result);
        return;
      }

      if (result.applied) showSuccess(t("cards.successBulk", { applied: result.appliedCount, skipped: result.invalidCount }));
      else showError(t("cards.nothingToApply"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <>
      <FormModal
        open={open && !review}
        onClose={onClose}
        onSubmit={() => {
          send(false);
        }}
        title={t(bulkCardActionKeys[action])}
        submitText={t("common.confirm")}
        cancelText={t("common.cancel")}
        loading={isLoading}
        size="lg"
        icon={<LayersIcon className="h-6 w-6" />}
      >
        <div className="space-y-8">
          <Message variant={action === BulkCardAction.Delete ? "warning" : "info"}>
            {t("cards.bulkConfirm", { action: t(bulkCardActionKeys[action]), count: selectedCount })}
          </Message>
          {isChangeType && (
            <FormSection icon={<LayersIcon />} title={t("cards.cardType")}>
              <CardCategoryTypeSelects
                categoryId={categoryId}
                cardTypeId={targetId}
                required
                typeErrorMessage={typeError}
                onChange={(nextCategory, nextType) => {
                  setCategoryId(nextCategory);
                  setTargetId(nextType);
                  setTypeError("");
                }}
              />
            </FormSection>
          )}
        </div>
      </FormModal>

      {review && (
        <CardProblemsReviewModal
          open
          totalCount={review.totalCount}
          validCount={review.validCount}
          problems={review.problems}
          problemKeys={bulkCardActionProblemKeys}
          confirmLabel={t("cards.applyValidOnly")}
          loading={isLoading}
          onConfirm={() => send(true)}
          onClose={() => {
            setReview(null);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default BulkCardActionModal;
