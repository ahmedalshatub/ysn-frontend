import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import Tabs from "../../../shared/components/navigation/Tabs";
import Input from "../../../shared/components/inputs/Input";
import TextArea from "../../../shared/components/inputs/TextArea";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import LayersIcon from "../../../assets/icons/LayersIcon";
import { useAddCardsMutation } from "../api/Cards.api";
import CardCategoryTypeSelects from "./CardCategoryTypeSelects";
import MultipleCardsInput from "./MultipleCardsInput";
import CardsTextFileInput from "./CardsTextFileInput";
import CardsExcelInput from "./CardsExcelInput";
import CardProblemsReviewModal from "./CardProblemsReviewModal";
import { bulkCardProblemKeys, type AddCardsResultDto, type CardFilter } from "../types/Cards.types";

interface AddCardsModalProps {
  open: boolean;
  fixedFilter?: CardFilter;
  onClose: () => void;
  onSuccess: () => void;
}

type Method = "single" | "multiple" | "textArea" | "textFile" | "excel";

const AddCardsModal = ({ open, fixedFilter, onClose, onSuccess }: AddCardsModalProps) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | undefined>(fixedFilter?.cardCategoryId);
  const [cardTypeId, setCardTypeId] = useState<number | undefined>(fixedFilter?.cardTypeId);
  const [method, setMethod] = useState<Method>("single");
  const [single, setSingle] = useState("");
  const [rows, setRows] = useState<string[]>([""]);
  const [text, setText] = useState("");
  const [fileSerials, setFileSerials] = useState<string[]>([]);
  const [review, setReview] = useState<AddCardsResultDto | null>(null);
  const [typeError, setTypeError] = useState("");
  const [addCards, { isLoading }] = useAddCardsMutation();

  const serials = useMemo(() => {
    const raw = method === "single" ? [single] : method === "multiple" ? rows : method === "textArea" ? text.split(/\r?\n/) : fileSerials;
    return raw.filter((serial) => serial.trim().length > 0);
  }, [method, single, rows, text, fileSerials]);

  const tabs = [
    { id: "single", label: t("cards.methodSingle") },
    { id: "multiple", label: t("cards.methodMultiple") },
    { id: "textArea", label: t("cards.methodTextArea") },
    { id: "textFile", label: t("cards.methodTextFile") },
    { id: "excel", label: t("cards.methodExcel") },
  ];

  const finish = (result: AddCardsResultDto) => {
    showSuccess(t("cards.successAdd", { added: result.addedCount, skipped: result.invalidCount }));
    onSuccess();
    onClose();
  };

  const send = async (addValidOnly: boolean) => {
    if (!cardTypeId) {
      setTypeError(t("errors.Card.CardTypeRequired"));
      return;
    }
    if (serials.length === 0) {
      showError(t("errors.Card.SerialsRequired"));
      return;
    }

    try {
      const result = await addCards({ cardTypeId, serialNumbers: serials, addValidOnly }).unwrap();
      if (result.saved) finish(result);
      else setReview(result);
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
        title={t("cards.addCards")}
        submitText={t("common.add")}
        cancelText={t("common.cancel")}
        loading={isLoading}
        size="lg"
        icon={<LayersIcon className="h-6 w-6" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CardCategoryTypeSelects
              categoryId={categoryId}
              cardTypeId={cardTypeId}
              required
              typeErrorMessage={typeError}
              onChange={(nextCategory, nextType) => {
                setCategoryId(nextCategory);
                setCardTypeId(nextType);
                setTypeError("");
              }}
            />
          </div>
          <Tabs tabs={tabs} activeTab={method} onChange={(id) => setMethod(id as Method)} />
          {method === "single" && (
            <Input name="serialNumber" label={`${t("cards.serialNumber")} *`} value={single} onChange={(event) => setSingle(event.target.value)} size="md" />
          )}
          {method === "multiple" && <MultipleCardsInput rows={rows} onChange={setRows} />}
          {method === "textArea" && (
            <TextArea
              name="serials"
              label={t("cards.onePerLine")}
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={10}
            />
          )}
          {method === "textFile" && <CardsTextFileInput onRead={setFileSerials} />}
          {method === "excel" && <CardsExcelInput onRead={setFileSerials} />}
          {method !== "single" && <Message variant="info">{t("cards.serialsRead", { count: serials.length })}</Message>}
        </div>
      </FormModal>

      {review && (
        <CardProblemsReviewModal
          open
          totalCount={review.totalCount}
          validCount={review.validCount}
          problems={review.problems}
          problemKeys={bulkCardProblemKeys}
          confirmLabel={t("cards.addValidOnly")}
          loading={isLoading}
          onConfirm={() => send(true)}
          onClose={() => setReview(null)}
        />
      )}
    </>
  );
};

export default AddCardsModal;
