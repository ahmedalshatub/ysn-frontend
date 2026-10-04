import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import FileUpload from "../../../shared/components/inputs/FileUpload";
import FormSection from "../../../shared/components/forms/FormSection";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import LayersIcon from "../../../assets/icons/LayersIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import { useAddCardCategoryMutation, useGetCardCategoriesQuery, useGetCardCategoryQuery, useUpdateCardCategoryMutation } from "../api/CardCategories.api";
import { cardCategorySchema, type CardCategoryFormValues } from "../validation/CardCategories.validation";

interface CardCategoryModalProps {
  open: boolean;
  categoryId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_ACCEPT = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] };

const emptyValues: CardCategoryFormValues = {
  cityId: 0,
  sortOrder: 1,
  isActive: true,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "" },
    { languageCode: DataLanguage.English, name: "" },
  ],
};

const CardCategoryModal = ({ open, categoryId, onClose, onSuccess }: CardCategoryModalProps) => {
  const { t } = useTranslation();
  const isEdit = categoryId !== null;
  const { cities, singleCityId } = useMyCities();

  const { data: category, isLoading: isLoadingCategory } = useGetCardCategoryQuery(categoryId as number, {
    skip: !isEdit || !open,
    refetchOnMountOrArgChange: true,
  });
  const [addCategory, { isLoading: isAdding }] = useAddCardCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCardCategoryMutation();

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
  } = useForm<CardCategoryFormValues>({
    resolver: yupResolver(cardCategorySchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    setImage(null);
    setImageError("");
    if (isEdit && category) {
      const arabic = category.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
      const english = category.translations.find((translation) => translation.languageCode === DataLanguage.English);
      reset({
        cityId: category.cityId,
        sortOrder: category.sortOrder,
        isActive: category.isActive,
        translations: [
          { languageCode: DataLanguage.Arabic, name: arabic?.name ?? "" },
          { languageCode: DataLanguage.English, name: english?.name ?? "" },
        ],
      });
    } else if (!isEdit) {
      reset({ ...emptyValues, cityId: singleCityId ?? 0 });
    }
  }, [open, isEdit, category, singleCityId, reset]);

  const watchedCityId = Number(useWatch({ control, name: "cityId" }));
  const { data: siblings } = useGetCardCategoriesQuery(
    { cityId: watchedCityId, isDeleted: false, pageNumber: 1, pageSize: 1 },
    { skip: !open || !watchedCityId, refetchOnMountOrArgChange: true }
  );
  const siblingCount = siblings?.totalCount ?? 0;
  const maxSortOrder = isEdit && category?.cityId === watchedCityId ? siblingCount : siblingCount + 1;

  useEffect(() => {
    if (open && !isEdit && siblings) setValue("sortOrder", siblingCount + 1);
  }, [open, isEdit, siblings, siblingCount, setValue]);

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  const onSubmit = async (values: CardCategoryFormValues) => {
    if (values.sortOrder < 1 || values.sortOrder > maxSortOrder) {
      setError("sortOrder", { message: "errors.CardCategory.SortOrderOutOfRange" });
      return;
    }
    if (!isEdit && !image) {
      setImageError(t("errors.CardCategory.ImageRequired"));
      return;
    }

    const data = {
      cityId: Number(values.cityId),
      sortOrder: Number(values.sortOrder),
      isActive: values.isActive,
      image,
      translations: (values.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode,
        name: translation.name.trim(),
      })),
    };

    try {
      if (isEdit && categoryId !== null) {
        await updateCategory({ id: categoryId, data }).unwrap();
        showSuccess(t("cardCategories.successUpdate"));
      } else {
        await addCategory(data).unwrap();
        showSuccess(t("cardCategories.successCreate"));
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
      title={isEdit ? t("cardCategories.editCategory") : t("cardCategories.addCategory")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isAdding || isUpdating || isLoadingCategory}
      size="xl"
      icon={<LayersIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<GlobeIcon />} title={t("common.arabicTranslation")}>
          <FormInput<CardCategoryFormValues>
            name="translations.0.name"
            control={control}
            label={`${t("cardCategories.nameArabic")} *`}
            error={!!errors.translations?.[0]?.name}
            errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
          />
        </FormSection>
        <FormSection icon={<GlobeIcon />} title={t("common.englishTranslation")}>
          <FormInput<CardCategoryFormValues>
            name="translations.1.name"
            control={control}
            label={`${t("cardCategories.nameEnglish")} *`}
            error={!!errors.translations?.[1]?.name}
            errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
          />
        </FormSection>
        <FormSection icon={<InfoIcon />} title={t("common.basicInfo")} columns={2}>
          <FormSelect<CardCategoryFormValues>
            name="cityId"
            control={control}
            label={`${t("cardCategories.city")} *`}
            options={cityOptions}
            valueKey="value"
            labelKey="name"
            searchable
            disabledStatus={isEdit && (category?.cardTypesCount ?? 0) > 0}
            error={!!errors.cityId}
            errorMessage={fieldError(errors.cityId?.message)}
          />
          <FormInput<CardCategoryFormValues>
            name="sortOrder"
            type="number"
            control={control}
            label={`${t("cardCategories.sortOrder")} * (1 - ${maxSortOrder})`}
            error={!!errors.sortOrder}
            errorMessage={fieldError(errors.sortOrder?.message)}
          />
          <FormCheckbox<CardCategoryFormValues>
            name="isActive"
            control={control}
            label={t("cardCategories.isActive")}
            description={t("cardCategories.isActiveHint")}
          />
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
            currentImage={category?.imageUrl}
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

export default CardCategoryModal;
