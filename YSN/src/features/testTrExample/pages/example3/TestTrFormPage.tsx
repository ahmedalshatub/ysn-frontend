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
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import GlobeIcon from "../../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import XIcon from "../../../../assets/icons/XIcon";
import CheckIcon from "../../../../assets/icons/CheckIcon";
import {
  useGetTestTrByIdQuery,
  useCreateTestTrMutation,
  useUpdateTestTrMutation,
} from "../../api/TestTr.api";

interface TestTrFormValues {
  range: number;
  size: number;
  translations: [
    { languageCode: string; name: string; description: string },
    { languageCode: string; name: string; description: string }
  ];
}

const TestTrFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  useTitle(
    isEdit ? t("testTrExample3.editTestTr") : t("testTrExample3.addTestTr")
  );

  const testTrSchema = yup.object().shape({
    range: yup.number().required(t("common.requiredField")).min(0),
    size: yup.number().required(t("common.requiredField")).min(0),
    translations: yup.array().of(
      yup.object().shape({
        languageCode: yup.string().required(t("common.requiredField")),
        name: yup.string().required(t("common.requiredField")),
        description: yup.string().required(t("common.requiredField")),
      })
    ),
  });

  const { data: testTr, isLoading: isLoadingTestTr } = useGetTestTrByIdQuery(
    id!,
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [createTestTr, { isLoading: isCreating }] = useCreateTestTrMutation();
  const [updateTestTr, { isLoading: isUpdating }] = useUpdateTestTrMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestTrFormValues>({
    resolver: yupResolver(testTrSchema) as any,
    mode: "onBlur",
    defaultValues: {
      range: 0,
      size: 0,
      translations: [
        { languageCode: "ar", name: "", description: "" },
        { languageCode: "en", name: "", description: "" },
      ],
    },
  });

  useEffect(() => {
    if (testTr && isEdit) {
      const arTranslation = testTr.translations.find((tr) => tr.languageCode === "ar");
      const enTranslation = testTr.translations.find((tr) => tr.languageCode === "en");
      reset({
        range: testTr.range,
        size: testTr.size,
        translations: [
          {
            languageCode: "ar",
            name: arTranslation?.name || "",
            description: arTranslation?.description || "",
          },
          {
            languageCode: "en",
            name: enTranslation?.name || "",
            description: enTranslation?.description || "",
          },
        ],
      });
    }
  }, [testTr, isEdit, reset]);

  const handleFormSubmit = async (data: TestTrFormValues) => {
    try {
      if (isEdit && id) {
        await updateTestTr({ ...data, id: Number(id) } as any).unwrap();
        showSuccess(t("testTrExample3.successUpdate"));
      } else {
        await createTestTr(data).unwrap();
        showSuccess(t("testTrExample3.successCreate"));
      }
      navigate("/test-tr-example-3");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    navigate("/test-tr-example-3");
  };

  const getTranslationError = (index: number, field: "name" | "description") => {
    return errors.translations?.[index]?.[field]?.message;
  };

  const loading = isCreating || isUpdating || isLoadingTestTr;

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon /> },
    { label: t("sidebar.testTr") },
    { label: t("testTrExample3.pageTitle"), path: "/test-tr-example-3" },
    { label: isEdit ? t("testTrExample3.editTestTr") : t("testTrExample3.addTestTr") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={isEdit ? t("testTrExample3.editTestTr") : t("testTrExample3.addTestTr")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FileTextIcon />}
        animated
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Card variant="elevated" padding="lg">
          <div className="space-y-8">
            <div>
              <div className="form-section-title mb-4">
                <GlobeIcon className="w-4 h-4 text-primary" />
                <h3>{t("testTrExample3.arabicTranslation")}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  name="translations.0.name"
                  control={control}
                  label={`${t("testTrExample3.name")} *`}
                  placeholder={t("testTrExample3.enterNameAr")}
                  error={!!getTranslationError(0, "name")}
                  errorMessage={getTranslationError(0, "name") || ""}
                />
                <FormInput
                  name="translations.0.description"
                  control={control}
                  label={`${t("testTrExample3.description")} *`}
                  placeholder={t("testTrExample3.enterDescriptionAr")}
                  error={!!getTranslationError(0, "description")}
                  errorMessage={getTranslationError(0, "description") || ""}
                />
              </div>
            </div>

            <div>
              <div className="form-section-title mb-4">
                <GlobeIcon className="w-4 h-4 text-primary" />
                <h3>{t("testTrExample3.englishTranslation")}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  name="translations.1.name"
                  control={control}
                  label={`${t("testTrExample3.name")} *`}
                  placeholder={t("testTrExample3.enterNameEn")}
                  error={!!getTranslationError(1, "name")}
                  errorMessage={getTranslationError(1, "name") || ""}
                />
                <FormInput
                  name="translations.1.description"
                  control={control}
                  label={`${t("testTrExample3.description")} *`}
                  placeholder={t("testTrExample3.enterDescriptionEn")}
                  error={!!getTranslationError(1, "description")}
                  errorMessage={getTranslationError(1, "description") || ""}
                />
              </div>
            </div>

            <div>
              <div className="form-section-title mb-4">
                <InfoIcon className="w-4 h-4 text-primary" />
                <h3>{t("testTrExample3.basicInfo")}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="range"
                  control={control}
                  type="number"
                  label={`${t("testTrExample3.range")} *`}
                  placeholder={t("testTrExample3.enterRange")}
                  error={!!errors.range}
                  errorMessage={errors.range?.message}
                />
                <FormInput
                  name="size"
                  control={control}
                  type="number"
                  label={`${t("testTrExample3.size")} *`}
                  placeholder={t("testTrExample3.enterSize")}
                  error={!!errors.size}
                  errorMessage={errors.size?.message}
                />
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

export default TestTrFormPage;
