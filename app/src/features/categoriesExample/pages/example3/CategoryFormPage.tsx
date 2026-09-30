import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../../shared/components/cards/Card";
import Button from "../../../../shared/components/buttons/Button";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormFileUpload from "../../../../shared/components/inputs/FormFileUpload";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import FolderIcon from "../../../../assets/icons/FolderIcon";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import ImageIcon from "../../../../assets/icons/ImageIcon";
import XIcon from "../../../../assets/icons/XIcon";
import CheckIcon from "../../../../assets/icons/CheckIcon";
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

const CategoryFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  useTitle(
    isEdit ? t("categoriesExample3.editCategory") : t("categoriesExample3.addCategory")
  );

  const categorySchema = yup.object().shape({
    name: yup.string().required(t("common.requiredField")),
    image: yup.mixed() as any,
  });

  const { data: category, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(
    Number(id),
    {
      skip: !id,
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
    if (category && isEdit) {
      reset({
        name: category.name,
        image: undefined,
      });
    }
  }, [category, isEdit, reset]);

  const handleFormSubmit = async (data: CategoryFormValues) => {
    try {
      const submitData: { name: string; image?: File } = {
        name: data.name,
      };

      if (data.image && data.image.length > 0) {
        submitData.image = data.image[0];
      }

      if (isEdit && id) {
        await updateCategory({ id: Number(id), data: submitData }).unwrap();
        showSuccess(t("categoriesExample3.successUpdate"));
      } else {
        if (submitData.image) {
          await createCategory({ name: submitData.name, image: submitData.image }).unwrap();
        } else {
          await createCategory({ name: submitData.name, image: new File([], "") }).unwrap();
        }
        showSuccess(t("categoriesExample3.successCreate"));
      }
      navigate("/categories-example-3");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    navigate("/categories-example-3");
  };

  const loading = isCreating || isUpdating || isLoadingCategory;

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.categories") },
    { label: t("categoriesExample3.pageTitle") },
    { label: isEdit ? t("categoriesExample3.editCategory") : t("categoriesExample3.addCategory") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={isEdit ? t("categoriesExample3.editCategory") : t("categoriesExample3.addCategory")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FolderIcon />}
        animated
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Card variant="elevated" padding="lg">
          <div className="space-y-6">
            <div>
              <div className="form-section-title mb-4">
                <InfoIcon className="w-4 h-4 text-primary" />
                <h3>{t("categoriesExample3.basicInfo")}</h3>
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
        </Card>

        <Card variant="elevated" padding="md">
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="secondary"
              icon={<XIcon />}
              onClick={handleCancel}
              disabled={loading}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<CheckIcon />}
              loading={loading}
            >
              {isEdit ? t("common.save") : t("common.add")}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CategoryFormPage;
