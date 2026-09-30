import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import Drawer from "../../../../shared/components/navigation/Drawer";
import Button from "../../../../shared/components/buttons/Button";
import FormInput from "../../../../shared/components/inputs/FormInput";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import GlobeIcon from "../../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
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

interface TestTrDrawerProps {
  open: boolean;
  onClose: () => void;
  testTrId?: number | null;
  onSuccess: () => void;
}

const TestTrDrawer = ({ open, onClose, testTrId, onSuccess }: TestTrDrawerProps) => {
  const { t } = useTranslation();
  const isEdit = !!testTrId;

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
    testTrId?.toString()!,
    {
      skip: !testTrId || !open,
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
    if (open) {
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
      } else if (!isEdit) {
        reset({
          range: 0,
          size: 0,
          translations: [
            { languageCode: "ar", name: "", description: "" },
            { languageCode: "en", name: "", description: "" },
          ],
        });
      }
    }
  }, [open, testTr, isEdit, reset]);

  const handleFormSubmit = async (data: TestTrFormValues) => {
    try {
      if (isEdit && testTrId) {
        await updateTestTr({ id: testTrId, data }).unwrap();
        showSuccess(t("testTrExample2.successUpdate"));
      } else {
        await createTestTr(data).unwrap();
        showSuccess(t("testTrExample2.successCreate"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const getTranslationError = (index: number, field: "name" | "description") => {
    return errors.translations?.[index]?.[field]?.message;
  };

  const loading = isCreating || isUpdating || isLoadingTestTr;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={isEdit ? t("testTrExample2.editTestTr") : t("testTrExample2.addTestTr")}
      icon={<FileTextIcon className="w-6 h-6" />}
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
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("testTrExample2.arabicTranslation")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              name="translations.0.name"
              control={control}
              label={`${t("testTrExample2.name")} *`}
              placeholder={t("testTrExample2.enterNameAr")}
              error={!!getTranslationError(0, "name")}
              errorMessage={getTranslationError(0, "name") || ""}
            />
            <FormInput
              name="translations.0.description"
              control={control}
              label={`${t("testTrExample2.description")} *`}
              placeholder={t("testTrExample2.enterDescriptionAr")}
              error={!!getTranslationError(0, "description")}
              errorMessage={getTranslationError(0, "description") || ""}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("testTrExample2.englishTranslation")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              name="translations.1.name"
              control={control}
              label={`${t("testTrExample2.name")} *`}
              placeholder={t("testTrExample2.enterNameEn")}
              error={!!getTranslationError(1, "name")}
              errorMessage={getTranslationError(1, "name") || ""}
            />
            <FormInput
              name="translations.1.description"
              control={control}
              label={`${t("testTrExample2.description")} *`}
              placeholder={t("testTrExample2.enterDescriptionEn")}
              error={!!getTranslationError(1, "description")}
              errorMessage={getTranslationError(1, "description") || ""}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("testTrExample2.basicInfo")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="range"
              control={control}
              type="number"
              label={`${t("testTrExample2.range")} *`}
              placeholder={t("testTrExample2.enterRange")}
              error={!!errors.range}
              errorMessage={errors.range?.message}
            />
            <FormInput
              name="size"
              control={control}
              type="number"
              label={`${t("testTrExample2.size")} *`}
              placeholder={t("testTrExample2.enterSize")}
              error={!!errors.size}
              errorMessage={errors.size?.message}
            />
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default TestTrDrawer;
