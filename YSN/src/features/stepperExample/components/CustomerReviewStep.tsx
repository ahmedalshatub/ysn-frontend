import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import StepHeading from "./StepHeading";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import FolderIcon from "../../../assets/icons/FolderIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import type { CustomerFormValues, CustomerNote } from "../types/Stepper.types";

interface CustomerReviewStepProps {
  values: CustomerFormValues;
  notes: CustomerNote[];
  onEditStep: (step: number) => void;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const CustomerReviewStep = ({ values, notes, onEditStep }: CustomerReviewStepProps) => {
  const { t } = useTranslation();
  const files = values.files ?? [];

  const fields = [
    { label: t("common.firstName"), value: values.firstName },
    { label: t("common.lastName"), value: values.lastName },
    { label: t("common.email"), value: values.email },
    { label: t("common.phone"), value: values.phone },
    {
      label: t("stepperExample.gender"),
      value: values.gender ? t(`stepperExample.${values.gender}`) : "",
    },
    { label: t("stepperExample.dateOfBirth"), value: values.dateOfBirth },
    {
      label: t("common.city"),
      value: values.city ? t(`stepperExample.cities.${values.city}`) : "",
    },
    { label: t("common.address"), value: values.address },
  ];

  const sectionHeader = (label: string, icon: React.ReactNode, step: number, count?: number) => (
    <div className="flex items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="ce-icon-primary-bg shrink-0 w-7 h-7 rounded-lg flex items-center justify-center">
          {icon}
        </span>
        <span className="ce-heading text-sm font-semibold truncate">{label}</span>
        {count !== undefined && <Badge variant="secondary" size="sm" pill label={String(count)} />}
      </div>
      <button
        type="button"
        onClick={() => onEditStep(step)}
        className="ce-link text-xs font-medium shrink-0"
      >
        {t("common.edit")}
      </button>
    </div>
  );

  return (
    <div>
      <StepHeading
        title={t("stepperExample.reviewTitle")}
        description={t("stepperExample.reviewDescription")}
        icon={<CheckCircleIcon className="w-5 h-5" />}
      />

      <div className="space-y-6">
        <section>
          {sectionHeader(t("stepperExample.step1"), <UserIcon className="w-4 h-4" />, 0)}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px ce-divider border ce-divider rounded-xl overflow-hidden">
            {fields.map((field) => (
              <div key={field.label} className="ce-panel px-4 py-3">
                <dt className="ce-muted text-xs">{field.label}</dt>
                <dd className="ce-panel-heading text-sm font-medium mt-1 break-words">
                  {field.value || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          {sectionHeader(
            t("stepperExample.uploadedFiles"),
            <FolderIcon className="w-4 h-4" />,
            1,
            files.length,
          )}
          {files.length === 0 ? (
            <p className="ce-muted text-sm px-1">{t("stepperExample.noFiles")}</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="ce-panel rounded-xl border ce-divider px-4 py-3 flex items-center justify-between gap-3"
                >
                  <span className="ce-panel-heading text-sm font-medium truncate">{file.name}</span>
                  <span className="ce-muted text-xs shrink-0">{formatSize(file.size)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          {sectionHeader(
            t("stepperExample.notesList"),
            <FileTextIcon className="w-4 h-4" />,
            2,
            notes.length,
          )}
          {notes.length === 0 ? (
            <p className="ce-muted text-sm px-1">{t("stepperExample.noNotes")}</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li key={note.id} className="ce-panel rounded-xl border ce-divider px-4 py-3">
                  <p className="ce-panel-heading text-sm font-semibold break-words">{note.title}</p>
                  <p className="ce-panel-text text-sm mt-1 whitespace-pre-wrap break-words">
                    {note.content}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomerReviewStep;
