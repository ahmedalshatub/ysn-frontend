import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import FormFileUpload from "../../../shared/components/inputs/FormFileUpload";
import Badge from "../../../shared/components/badges/Badge";
import StepHeading from "./StepHeading";
import UploadIcon from "../../../assets/icons/UploadIcon";
import type { CustomerFormValues } from "../types/Stepper.types";

const MAX_FILES = 5;

interface CustomerFilesStepProps {
  control: Control<CustomerFormValues>;
}

const CustomerFilesStep = ({ control }: CustomerFilesStepProps) => {
  const { t } = useTranslation();
  const files = useWatch({ control, name: "files" }) ?? [];

  return (
    <div>
      <StepHeading
        title={t("stepperExample.step2Title")}
        description={t("stepperExample.step2Description")}
        icon={<UploadIcon className="w-5 h-5" />}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="ce-heading text-sm font-medium">{t("stepperExample.addFiles")}</span>
        <Badge
          variant={files.length ? "primary" : "secondary"}
          size="sm"
          pill
          label={`${files.length} / ${MAX_FILES}`}
        />
      </div>

      <FormFileUpload
        name="files"
        control={control}
        multiple
        maxFiles={MAX_FILES}
        showPreview
        showFileList
        variant="bordered"
        size="lg"
        label={t("common.uploadFiles")}
        description={t("stepperExample.step2Description")}
      />
    </div>
  );
};

export default CustomerFilesStep;
