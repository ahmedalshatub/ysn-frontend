import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import LayersIcon from "../../../assets/icons/LayersIcon";
import { useAddCardCategoryMutation, useGetCardCategoryQuery, useUpdateCardCategoryMutation } from "../api/CardCategories.api";
import { cardCategorySchema, type CardCategoryFormValues } from "../validation/CardCategories.validation";

interface CardCategoryModalProps {
  open: boolean;
  categoryId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const MAX_IMAGE_MB = 5;

const emptyValues: CardCategoryFormValues = {
  cityId: 0,
  sortOrder: 0,
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

  const currentImage = useFileSrc(category?.imageUrl);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardCategoryFormValues>({
    resolver: yupResolver(cardCategorySchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    setImage(null);
    setPreview("");
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

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  const onSubmit = async (values: CardCategoryFormValues) => {
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
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <AvatarUpload
            size={120}
            shape="square"
            accept="image/*"
            maxSizeMB={MAX_IMAGE_MB}
            value={preview || currentImage}
            onChange={(file, next) => {
              setImage(file);
              setPreview(next);
              setImageError("");
            }}
            onError={(message) => showError(message)}
          />
          <span className="form-hint">{t("cardCategories.imageHint")}</span>
          {imageError && <span className="permissions-matrix-error">{imageError}</span>}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput<CardCategoryFormValues>
            name="translations.0.name"
            control={control}
            label={`${t("cardCategories.nameArabic")} *`}
            error={!!errors.translations?.[0]?.name}
            errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
          />
          <FormInput<CardCategoryFormValues>
            name="translations.1.name"
            control={control}
            label={`${t("cardCategories.nameEnglish")} *`}
            error={!!errors.translations?.[1]?.name}
            errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
          />
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
            label={`${t("cardCategories.sortOrder")} *`}
            error={!!errors.sortOrder}
            errorMessage={fieldError(errors.sortOrder?.message)}
          />
          <FormCheckbox<CardCategoryFormValues>
            name="isActive"
            control={control}
            label={t("cardCategories.isActive")}
            description={t("cardCategories.isActiveHint")}
          />
        </div>
      </div>
    </FormModal>
  );
};

export default CardCategoryModal;
