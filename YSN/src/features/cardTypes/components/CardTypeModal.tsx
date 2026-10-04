import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import FormAmountInput from "../../../shared/components/inputs/FormAmountInput";
import FileUpload from "../../../shared/components/inputs/FileUpload";
import FormSection from "../../../shared/components/forms/FormSection";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import PackageIcon from "../../../assets/icons/PackageIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import { useGetCardCategoriesQuery } from "../../cardCategories/api/CardCategories.api";
import { useAddCardTypeMutation, useGetCardTypeQuery, useGetCardTypesQuery, useUpdateCardTypeMutation } from "../api/CardTypes.api";
import { cardTypeSchema, type CardTypeFormValues } from "../validation/CardTypes.validation";
import CardTypeTargetsField from "./CardTypeTargetsField";
import { CardKind, cardKindKeys, isTvKind } from "../types/CardTypes.types";

interface CardTypeModalProps {
  open: boolean;
  cardTypeId: number | null;
  defaultCategoryId?: number;
  onClose: () => void;
  onSuccess: () => void;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_ACCEPT = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] };

const emptyValues: CardTypeFormValues = {
  cardCategoryId: 0,
  kind: CardKind.Normal,
  durationMonths: null,
  targetRoleIds: [],
  agentPrice: null,
  clientPrice: null,
  amount: null as unknown as number,
  sortOrder: 1,
  isActive: true,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "", description: "" },
    { languageCode: DataLanguage.English, name: "", description: "" },
  ],
};

const CardTypeModal = ({ open, cardTypeId, defaultCategoryId, onClose, onSuccess }: CardTypeModalProps) => {
  const { t } = useTranslation();
  const isEdit = cardTypeId !== null;

  const { data: cardType, isLoading: isLoadingType } = useGetCardTypeQuery(cardTypeId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });
  const { data: categories } = useGetCardCategoriesQuery(
    { isActive: true, isDeleted: false, sortBy: "name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const [addCardType, { isLoading: isAdding }] = useAddCardTypeMutation();
  const [updateCardType, { isLoading: isUpdating }] = useUpdateCardTypeMutation();

  const [image, setImage] = useState<File | null>(null);
  const imageFiles = useMemo(() => (image ? [image] : []), [image]);
  const [imageError, setImageError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CardTypeFormValues>({
    resolver: yupResolver(cardTypeSchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  const kind = Number(useWatch({ control, name: "kind" }));
  const { data: siblings } = useGetCardTypesQuery(
    { isDeleted: false, pageNumber: 1, pageSize: 1 },
    { skip: !open, refetchOnMountOrArgChange: true }
  );
  const siblingCount = siblings?.totalCount ?? 0;
  const maxSortOrder = isEdit ? siblingCount : siblingCount + 1;

  useEffect(() => {
    if (open && !isEdit && siblings) setValue("sortOrder", siblingCount + 1);
  }, [open, isEdit, siblings, siblingCount, setValue]);
  const targets = useWatch({ control, name: "targetRoleIds" }) ?? [];
  const showAgentPrice = targets.some((target) => target === 2 || target === 3);
  const showClientPrice = targets.includes(4);

  useEffect(() => {
    if (!open) return;
    setImage(null);
    setImageError("");
    if (isEdit && cardType) {
      const arabic = cardType.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
      const english = cardType.translations.find((translation) => translation.languageCode === DataLanguage.English);
      reset({
        cardCategoryId: cardType.cardCategoryId,
        kind: cardType.kind,
        durationMonths: cardType.durationMonths,
        targetRoleIds: cardType.targetRoleIds,
        agentPrice: cardType.agentPrice,
        clientPrice: cardType.clientPrice,
        amount: cardType.amount,
        sortOrder: cardType.sortOrder,
        isActive: cardType.isActive,
        translations: [
          { languageCode: DataLanguage.Arabic, name: arabic?.name ?? "", description: arabic?.description ?? "" },
          { languageCode: DataLanguage.English, name: english?.name ?? "", description: english?.description ?? "" },
        ],
      });
    } else if (!isEdit) {
      reset({ ...emptyValues, cardCategoryId: defaultCategoryId ?? 0 });
    }
  }, [open, isEdit, cardType, defaultCategoryId, reset]);

  useEffect(() => {
    if (!isTvKind(kind)) setValue("durationMonths", null);
  }, [kind, setValue]);

  const handleTargetsChanged = (next: number[]) => {
    if (!next.some((target) => target === 2 || target === 3)) setValue("agentPrice", null);
    if (!next.includes(4)) setValue("clientPrice", null);
  };

  const categoryOptions = useMemo(
    () => (categories?.items ?? []).map((category) => ({ value: category.id, name: `${category.name} - ${category.cityName ?? ""}` })),
    [categories]
  );
  const kindOptions = Object.values(CardKind).map((value) => ({ value, name: t(cardKindKeys[value]) }));

  const onSubmit = async (values: CardTypeFormValues) => {
    if (values.sortOrder < 1 || values.sortOrder > maxSortOrder) {
      setError("sortOrder", { message: "errors.CardType.SortOrderOutOfRange" });
      return;
    }
    if (!isEdit && !image) {
      setImageError(t("errors.CardType.ImageRequired"));
      return;
    }

    const data = {
      cardCategoryId: Number(values.cardCategoryId),
      kind: Number(values.kind),
      durationMonths: isTvKind(Number(values.kind)) ? values.durationMonths ?? null : null,
      targetRoleIds: values.targetRoleIds,
      agentPrice: showAgentPrice ? values.agentPrice ?? null : null,
      clientPrice: showClientPrice ? values.clientPrice ?? null : null,
      amount: Number(values.amount),
      sortOrder: Number(values.sortOrder),
      isActive: values.isActive,
      image,
      translations: (values.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode,
        name: translation.name.trim(),
        description: translation.description?.trim() || null,
      })),
    };

    try {
      if (isEdit && cardTypeId !== null) {
        await updateCardType({ id: cardTypeId, data }).unwrap();
        showSuccess(t("cardTypes.successUpdate"));
      } else {
        await addCardType(data).unwrap();
        showSuccess(t("cardTypes.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={isEdit ? t("cardTypes.editCardType") : t("cardTypes.addCardType")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingType}
      size="xl"
      icon={<PackageIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<GlobeIcon />} title={t("common.arabicTranslation")}>
          <FormInput<CardTypeFormValues>
            name="translations.0.name"
            control={control}
            label={`${t("cardTypes.nameArabic")} *`}
            error={!!errors.translations?.[0]?.name}
            errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
          />
          <FormTextArea<CardTypeFormValues>
            name="translations.0.description"
            control={control}
            label={t("cardTypes.descriptionArabic")}
            rows={2}
            error={!!errors.translations?.[0]?.description}
            errorMessage={fieldError(errors.translations?.[0]?.description?.message)}
          />
        </FormSection>
        <FormSection icon={<GlobeIcon />} title={t("common.englishTranslation")}>
          <FormInput<CardTypeFormValues>
            name="translations.1.name"
            control={control}
            label={`${t("cardTypes.nameEnglish")} *`}
            error={!!errors.translations?.[1]?.name}
            errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
          />
          <FormTextArea<CardTypeFormValues>
            name="translations.1.description"
            control={control}
            label={t("cardTypes.descriptionEnglish")}
            rows={2}
            error={!!errors.translations?.[1]?.description}
            errorMessage={fieldError(errors.translations?.[1]?.description?.message)}
          />
        </FormSection>
        <FormSection icon={<InfoIcon />} title={t("common.basicInfo")} columns={2}>
          <FormSelect<CardTypeFormValues>
            name="cardCategoryId"
            control={control}
            label={`${t("cardTypes.category")} *`}
            options={categoryOptions}
            valueKey="value"
            labelKey="name"
            searchable
            error={!!errors.cardCategoryId}
            errorMessage={fieldError(errors.cardCategoryId?.message)}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormSelect<CardTypeFormValues>
              name="kind"
              control={control}
              label={`${t("cardTypes.kind")} *`}
              options={kindOptions}
              valueKey="value"
              labelKey="name"
              error={!!errors.kind}
              errorMessage={fieldError(errors.kind?.message)}
            />
            {isTvKind(kind) && (
              <FormInput<CardTypeFormValues>
                name="durationMonths"
                type="number"
                control={control}
                label={`${t("cardTypes.durationMonths")} *`}
                error={!!errors.durationMonths}
                errorMessage={fieldError(errors.durationMonths?.message)}
              />
            )}
          </div>
        </FormSection>
        <FormSection icon={<WalletIcon />} title={t("cardTypes.pricing")}>
          <CardTypeTargetsField<CardTypeFormValues>
            name="targetRoleIds"
            control={control}
            errorMessage={fieldError(errors.targetRoleIds?.message)}
            onChanged={handleTargetsChanged}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {showAgentPrice && (
              <FormAmountInput<CardTypeFormValues>
                name="agentPrice"
                control={control}
                label={`${t("cardTypes.agentPrice")} *`}
                error={!!errors.agentPrice}
                errorMessage={fieldError(errors.agentPrice?.message)}
              />
            )}
            {showClientPrice && (
              <FormAmountInput<CardTypeFormValues>
                name="clientPrice"
                control={control}
                label={`${t("cardTypes.clientPrice")} *`}
                error={!!errors.clientPrice}
                errorMessage={fieldError(errors.clientPrice?.message)}
              />
            )}
            <FormAmountInput<CardTypeFormValues>
              name="amount"
              control={control}
              label={`${t("cardTypes.amount")} *`}
              error={!!errors.amount}
              errorMessage={fieldError(errors.amount?.message)}
            />
            <FormInput<CardTypeFormValues>
              name="sortOrder"
              type="number"
              control={control}
              label={`${t("cardTypes.sortOrder")} * (1 - ${maxSortOrder})`}
              error={!!errors.sortOrder}
              errorMessage={fieldError(errors.sortOrder?.message)}
            />
            <FormCheckbox<CardTypeFormValues>
              name="isActive"
              control={control}
              label={t("cardTypes.isActive")}
              description={t("cardTypes.isActiveHint")}
            />
          </div>
        </FormSection>
        <FormSection icon={<ImageIcon />} title={t("common.image")}>
          <FileUpload
            accept={IMAGE_ACCEPT}
            multiple={false}
            maxFiles={1}
            maxSize={MAX_IMAGE_BYTES}
            label={`${t("common.image")}${isEdit ? "" : " *"}`}
            description={t("cardCategories.imageHint")}
            value={imageFiles}
            currentImage={cardType?.imageUrl}
            error={imageError}
            onChange={(files) => {
              setImage(files[files.length - 1] ?? null);
              setImageError("");
            }}
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default CardTypeModal;
