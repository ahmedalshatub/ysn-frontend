import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Stepper from "../../../shared/components/navigation/Stepper";
import Button from "../../../shared/components/buttons/Button";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import CustomerInfoStep from "../components/CustomerInfoStep";
import CustomerFilesStep from "../components/CustomerFilesStep";
import CustomerNotesStep from "../components/CustomerNotesStep";
import CustomerReviewStep from "../components/CustomerReviewStep";
import type { CustomerFormValues, CustomerNote } from "../types/Stepper.types";
import HomeIcon from "../../../assets/icons/HomeIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import RefreshCcwIcon from "../../../assets/icons/RefreshCcwIcon";

const INFO_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "gender",
  "dateOfBirth",
  "city",
  "address",
] as const;

const defaultValues: CustomerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  city: "",
  address: "",
  files: [],
};

const CustomerStepperExample = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState<CustomerNote[]>([]);

  useTitle(t("stepperExample.pageTitle"));

  const schema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup.string().required(t("common.requiredField")),
        lastName: yup.string().required(t("common.requiredField")),
        email: yup.string().required(t("common.requiredField")).email(t("register.emailInvalid")),
        phone: yup
          .string()
          .required(t("common.requiredField"))
          .matches(/^\+?[1-9]\d{1,14}$/, t("register.phoneInvalid")),
        gender: yup.string().required(t("common.requiredField")),
        dateOfBirth: yup.string().required(t("common.requiredField")),
        city: yup.string().required(t("common.requiredField")),
        address: yup.string().required(t("common.requiredField")),
        files: yup.array().default([]),
      }),
    [t],
  );

  const {
    control,
    trigger,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerFormValues>,
    mode: "onTouched",
    defaultValues,
  });

  const values = watch();

  const steps = [
    {
      id: "info",
      label: t("stepperExample.step1"),
      description: t("stepperExample.step1Short"),
      icon: <UserIcon className="w-4 h-4" />,
    },
    {
      id: "files",
      label: t("stepperExample.step2"),
      description: t("stepperExample.step2Short"),
      icon: <UploadIcon className="w-4 h-4" />,
      optional: true,
    },
    {
      id: "notes",
      label: t("stepperExample.step3"),
      description: t("stepperExample.step3Short"),
      icon: <FileTextIcon className="w-4 h-4" />,
      optional: true,
    },
    {
      id: "review",
      label: t("stepperExample.review"),
      description: t("stepperExample.reviewShort"),
      icon: <CheckCircleIcon className="w-4 h-4" />,
    },
  ];

  const isLastStep = activeStep === steps.length - 1;
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  const validateStep = async (step: number) => {
    if (step !== 0) return true;
    return trigger([...INFO_FIELDS]);
  };

  const goToStep = async (step: number) => {
    if (step > activeStep && !(await validateStep(activeStep))) {
      showError(t("stepperExample.fillRequired"));
      return;
    }
    setActiveStep(step);
  };

  const handleNext = () => goToStep(activeStep + 1);
  const handlePrevious = () => setActiveStep((step) => Math.max(0, step - 1));

  const handleReset = () => {
    reset(defaultValues);
    setNotes([]);
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    if (!(await validateStep(0))) {
      showError(t("stepperExample.fillRequired"));
      setActiveStep(0);
      return;
    }

    console.log("Submitted:", { ...getValues(), notes });
    showSuccess(t("stepperExample.submitted"));
    handleReset();
  };

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("stepperExample.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("stepperExample.pageTitle")}
        subtitle={t("stepperExample.subtitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<LayersIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("common.clear")}
            onClick={handleReset}
            icon={<RefreshCcwIcon className="w-4 h-4" />}
            iconPosition="left"
            className="font-bold"
          />
        }
      />

      <Card variant="elevated" padding="md">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          variant="gradient"
          size="md"
          labelPlacement="bottom"
          clickable
          animated
          responsive
          onStepClick={goToStep}
        />

        <div className="mt-6 flex items-center gap-3">
          <div className="ce-progress-bg h-1.5 flex-1 rounded-full overflow-hidden">
            <div
              className="ce-progress-fill h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="ce-muted text-xs font-medium shrink-0">{progress}%</span>
        </div>
      </Card>

      <Card variant="elevated" padding="lg">
        {activeStep === 0 && <CustomerInfoStep control={control} errors={errors} />}
        {activeStep === 1 && <CustomerFilesStep control={control} />}
        {activeStep === 2 && <CustomerNotesStep notes={notes} onNotesChange={setNotes} />}
        {activeStep === 3 && (
          <CustomerReviewStep values={values} notes={notes} onEditStep={setActiveStep} />
        )}

        <div className="mt-8 pt-5 border-t ce-divider flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <Button
            variant="secondary"
            outline
            size="md"
            label={t("common.previous")}
            icon={<ChevronLeftIcon className="w-4 h-4 rtl:rotate-180" />}
            iconPosition="left"
            disabled={activeStep === 0}
            onClick={handlePrevious}
          />

          <span className="ce-muted text-xs text-center">
            {activeStep + 1} / {steps.length}
          </span>

          {isLastStep ? (
            <Button
              variant="success"
              size="md"
              label={t("common.submit")}
              icon={<CheckCircleIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={handleSubmit}
            />
          ) : (
            <Button
              variant="primary"
              size="md"
              label={t("common.next")}
              icon={<ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />}
              iconPosition="right"
              onClick={handleNext}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CustomerStepperExample;
