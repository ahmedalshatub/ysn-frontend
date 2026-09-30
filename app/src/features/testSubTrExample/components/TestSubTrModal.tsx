import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormFileUpload from "../../../shared/components/inputs/FormFileUpload";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import FileImage from "../../../shared/components/media/FileImage";
import {
  useGetTestSubTrByIdQuery,
  useCreateTestSubTrMutation,
  useUpdateTestSubTrMutation,
} from "../api/TestSubTr.api";

interface TestSubTrFormValues {
  testTrId: number;
  clientId: number;
  amount: number;
  image?: FileList;
  translations: [
    { languageCode: string; name: string; description: string },
    { languageCode: string; name: string; description: string }
  ];
}

interface TestSubTrModalProps {
  open: boolean;
  onClose: () => void;
  testSubTrId?: number | null;
  onSuccess: () => void;
}

const TestSubTrModal = ({ open, onClose, testSubTrId, onSuccess }: TestSubTrModalProps) => {
  const { t } = useTranslation();
  const isEdit = !!testSubTrId;

  const testSubTrSchema = yup.object().shape({
    testTrId: yup.number().required(t("common.requiredField")).min(1),
    clientId: yup.number().required(t("common.requiredField")).min(1),
    amount: yup.number().required(t("common.requiredField")).min(0),
    image: yup.mixed() as any,
    translations: yup.array().of(
      yup.object().shape({
        languageCode: yup.string().required(t("common.requiredField")),
        name: yup.string().required(t("common.requiredField")),
        description: yup.string().required(t("common.requiredField")),
      })
    ),
  });

  const { data: testSubTr, isLoading: isLoadingTestSubTr } = useGetTestSubTrByIdQuery(
    testSubTrId?.toString()!,
    {
      skip: !testSubTrId || !open,
      refetchOnMountOrArgChange: true,
    }
  );

  const [createTestSubTr, { isLoading: isCreating }] = useCreateTestSubTrMutation();
  const [updateTestSubTr, { isLoading: isUpdating }] = useUpdateTestSubTrMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestSubTrFormValues>({
    resolver: yupResolver(testSubTrSchema) as any,
    mode: "onBlur",
    defaultValues: {
      testTrId: 0,
      clientId: 0,
      amount: 0,
      image: undefined,
      translations: [
        { languageCode: "ar", name: "", description: "" },
        { languageCode: "en", name: "", description: "" },
      ],
    },
  });

  useEffect(() => {
    if (open) {
      if (testSubTr && isEdit) {
        const arTranslation = testSubTr.translations.find((tr) => tr.languageCode === "ar");
        const enTranslation = testSubTr.translations.find((tr) => tr.languageCode === "en");
        reset({
          testTrId: testSubTr.testTrId,
          clientId: testSubTr.clientId,
          amount: testSubTr.amount,
          image: undefined,
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
          testTrId: 0,
          clientId: 0,
          amount: 0,
          image: undefined,
          translations: [
            { languageCode: "ar", name: "", description: "" },
            { languageCode: "en", name: "", description: "" },
          ],
        });
      }
    }
  }, [open, testSubTr, isEdit, reset]);

  const handleFormSubmit = async (data: TestSubTrFormValues) => {
    try {
      const image = data.image && data.image.length > 0 ? data.image[0] : undefined;

      if (isEdit && testSubTrId) {
        await updateTestSubTr({
          id: testSubTrId,
          testTrId: data.testTrId,
          clientId: data.clientId,
          amount: data.amount,
          image,
          translations: data.translations,
        }).unwrap();
        showSuccess(t("testSubTrs.successUpdate"));
      } else {
        await createTestSubTr({
          testTrId: data.testTrId,
          clientId: data.clientId,
          amount: data.amount,
          image,
          translations: data.translations,
        }).unwrap();
        showSuccess(t("testSubTrs.successCreate"));
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

  const loading = isCreating || isUpdating || isLoadingTestSubTr;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(handleFormSubmit)}
      title={isEdit ? t("testSubTrs.editTestSubTr") : t("testSubTrs.addTestSubTr")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={loading}
      size="xl"
      icon={<FileTextIcon className="w-6 h-6" />}
    >
      <div className="space-y-8">
        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("testSubTrs.arabicTranslation")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              name="translations.0.name"
              control={control}
              label={`${t("testSubTrs.arabicName")} *`}
              placeholder={t("testSubTrs.arabicNameTooltip")}
              error={!!getTranslationError(0, "name")}
              errorMessage={getTranslationError(0, "name") || ""}
            />
            <FormInput
              name="translations.0.description"
              control={control}
              label={`${t("testSubTrs.arabicDescription")} *`}
              placeholder={t("testSubTrs.arabicDescriptionTooltip")}
              error={!!getTranslationError(0, "description")}
              errorMessage={getTranslationError(0, "description") || ""}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <GlobeIcon className="w-4 h-4 text-primary" />
            <h3>{t("testSubTrs.englishTranslation")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              name="translations.1.name"
              control={control}
              label={`${t("testSubTrs.englishName")} *`}
              placeholder={t("testSubTrs.englishNameTooltip")}
              error={!!getTranslationError(1, "name")}
              errorMessage={getTranslationError(1, "name") || ""}
            />
            <FormInput
              name="translations.1.description"
              control={control}
              label={`${t("testSubTrs.englishDescription")} *`}
              placeholder={t("testSubTrs.englishDescriptionTooltip")}
              error={!!getTranslationError(1, "description")}
              errorMessage={getTranslationError(1, "description") || ""}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <InfoIcon className="w-4 h-4 text-primary" />
            <h3>{t("common.basicInfo")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="testTrId"
              control={control}
              type="number"
              label={`${t("testSubTrs.testTrId")} *`}
              placeholder={t("testSubTrs.enterTestTrId")}
              error={!!errors.testTrId}
              errorMessage={errors.testTrId?.message}
            />
            <FormInput
              name="clientId"
              control={control}
              type="number"
              label={`${t("testSubTrs.clientId")} *`}
              placeholder={t("testSubTrs.enterClientId")}
              error={!!errors.clientId}
              errorMessage={errors.clientId?.message}
            />
            <FormInput
              name="amount"
              control={control}
              type="number"
              label={`${t("testSubTrs.amount")} *`}
              placeholder={t("testSubTrs.enterAmount")}
              error={!!errors.amount}
              errorMessage={errors.amount?.message}
            />
          </div>
        </div>

        <div>
          <div className="form-section-title mb-4">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h3>{t("testSubTrs.image")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormFileUpload
              name="image"
              control={control}
              accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
              label={t("testSubTrs.image")}
              description={t("common.uploadImageHelper")}
            />
            {isEdit && testSubTr?.imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t("common.currentImage")}:
                </p>
                <FileImage
                  path={testSubTr.imageUrl}
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

export default TestSubTrModal;
