import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import FormModal from "../../../../shared/components/modals/FormModal";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormFileUpload from "../../../../shared/components/inputs/FormFileUpload";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import FolderIcon from "../../../../assets/icons/FolderIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import ImageIcon from "../../../../assets/icons/ImageIcon";
import FileImage from "../../../../shared/components/media/FileImage";
import {
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../api/Categories.api";

interface CategoryFormValues {
  name: string;
  image?: FileList;
}

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  editingCategoryId?: number | null;
  onSuccess: () => void;
}

const CategoryModal = ({ open, onClose, editingCategoryId, onSuccess }: CategoryModalProps) => {
  const { t } = useTranslation();
  const isEdit = !!editingCategoryId;

  const categorySchema = yup.object().shape({
    name: yup.string().required(t("common.requiredField")),
    image: yup.mixed() as any,
  });

  const { data: category, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(
    editingCategoryId!,
    {
      skip: !editingCategoryId || !open,
      refetchOnMountOrArgChange: true,
    }
  );

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema) as any,
    mode: "onBlur",
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      if (category && isEdit) {
        reset({
          name: category.name,
          image: undefined,
        });
      } else if (!isEdit) {
        reset({
          name: "",
          image: undefined,
        });
      }
    }
  }, [open, category, isEdit, reset]);

  const handleFormSubmit = async (data: CategoryFormValues) => {
    try {
      const submitData: { name: string; image?: File } = {
        name: data.name,
      };

      if (data.image && data.image.length > 0) {
        submitData.image = data.image[0];
      }

      if (isEdit && editingCategoryId) {
        await updateCategory({ id: editingCategoryId, data: submitData }).unwrap();
        showSuccess(t("categoriesExample1.successUpdate"));
      } else {
        if (submitData.image) {
          await createCategory({ name: submitData.name, image: submitData.image }).unwrap();
        } else {
          await createCategory({ name: submitData.name, image: new File([], "") }).unwrap();
        }
        showSuccess(t("categoriesExample1.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const loading = isCreating || isUpdating || isLoadingCategory;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(handleFormSubmit)}
      title={isEdit ? t("categoriesExample1.editCategory") : t("categoriesExample1.addCategory")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={loading}
      size="lg"
      icon={<FolderIcon className="w-6 h-6" />}
    >
      <div className="space-y-6">
        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("categoriesExample1.basicInfo")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              name="name"
              control={control}
              label={`${t("common.name")} *`}
              placeholder={t("common.enterName")}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h3>{t("common.image")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormFileUpload
              name="image"
              control={control}
              accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
              label={t("common.image")}
              description={t("common.uploadImageHelper")}
            />
            {isEdit && category?.imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t("common.currentImage")}:
                </p>
                <FileImage
                  path={category.imageUrl}
                  alt=""
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default CategoryModal;
