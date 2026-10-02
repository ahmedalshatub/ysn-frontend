import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import Drawer from "../../../../shared/components/navigation/Drawer";
import Button from "../../../../shared/components/buttons/Button";
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

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  editingCategoryId?: number | null;
  onSuccess: () => void;
}

const CategoryDrawer = ({ open, onClose, editingCategoryId, onSuccess }: CategoryDrawerProps) => {
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
        showSuccess(t("categoriesExample2.successUpdate"));
      } else {
        if (submitData.image) {
          await createCategory({ name: submitData.name, image: submitData.image }).unwrap();
        } else {
          await createCategory({ name: submitData.name, image: new File([], "") }).unwrap();
        }
        showSuccess(t("categoriesExample2.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const loading = isCreating || isUpdating || isLoadingCategory;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={isEdit ? t("categoriesExample2.editCategory") : t("categoriesExample2.addCategory")}
      icon={<FolderIcon className="w-6 h-6" />}
      size="lg"
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} loading={loading}>
            {isEdit ? t("common.save") : t("common.add")}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("categoriesExample2.basicInfo")}</h3>
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
      </form>
    </Drawer>
  );
};

export default CategoryDrawer;
