import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import Message from "../../../shared/components/feedback/Message";
import type { CardProblemDto } from "../types/Cards.types";

interface CardProblemsReviewModalProps {
  open: boolean;
  totalCount: number;
  validCount: number;
  problems: CardProblemDto[];
  problemKeys: Record<number, string>;
  confirmLabel: string;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CardProblemsReviewModal = ({
  open,
  totalCount,
  validCount,
  problems,
  problemKeys,
  confirmLabel,
  loading,
  onConfirm,
  onClose,
}: CardProblemsReviewModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="space-y-4 p-6">
        <h3 className="form-modal-title text-lg">{t("cards.reviewTitle")}</h3>
        <Message variant="warning">
          {t("cards.reviewSummary", { total: totalCount, valid: validCount, invalid: problems.length })}
        </Message>
        <div className="max-h-[50vh] space-y-2 overflow-y-auto">
          {problems.map((item, position) => (
            <div key={`${item.index ?? item.cardId}-${position}`} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
              <span className="font-mono truncate">{item.serialNumber || t("cards.emptySerial")}</span>
              <Badge label={t(problemKeys[item.problem])} variant="danger" size="sm" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="light" size="md" label={t("cards.cancelAll")} onClick={onClose} disabled={loading} />
          {validCount > 0 && <Button variant="dark" size="md" label={confirmLabel} onClick={onConfirm} loading={loading} />}
        </div>
      </div>
    </Modal>
  );
};

export default CardProblemsReviewModal;
