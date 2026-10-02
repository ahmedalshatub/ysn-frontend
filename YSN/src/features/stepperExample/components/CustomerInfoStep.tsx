import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormDatePicker from "../../../shared/components/inputs/FormDatePicker";
import StepHeading from "./StepHeading";
import UserIcon from "../../../assets/icons/UserIcon";
import type { CustomerFormValues } from "../types/Stepper.types";

interface CustomerInfoStepProps {
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
}

const CustomerInfoStep = ({ control, errors }: CustomerInfoStepProps) => {
  const { t } = useTranslation();

  const genderOptions = [
    { name: t("stepperExample.male"), value: "male" },
    { name: t("stepperExample.female"), value: "female" },
  ];

  const cityOptions = [
    { name: t("stepperExample.cities.riyadh"), value: "riyadh" },
    { name: t("stepperExample.cities.jeddah"), value: "jeddah" },
    { name: t("stepperExample.cities.dammam"), value: "dammam" },
    { name: t("stepperExample.cities.mecca"), value: "mecca" },
    { name: t("stepperExample.cities.medina"), value: "medina" },
  ];

  return (
    <div>
      <StepHeading
        title={t("stepperExample.step1Title")}
        description={t("stepperExample.step1Description")}
        icon={<UserIcon className="w-5 h-5" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="firstName"
          name="firstName"
          control={control}
          label={t("common.firstName")}
          placeholder={t("common.firstName")}
          error={!!errors.firstName}
          errorMessage={errors.firstName?.message}
        />
        <FormInput
          id="lastName"
          name="lastName"
          control={control}
          label={t("common.lastName")}
          placeholder={t("common.lastName")}
          error={!!errors.lastName}
          errorMessage={errors.lastName?.message}
        />
        <FormInput
          id="email"
          name="email"
          control={control}
          type="email"
          label={t("common.email")}
          placeholder={t("common.email")}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <FormInput
          id="phone"
          name="phone"
          control={control}
          label={t("common.phone")}
          placeholder={t("common.phone")}
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <FormSelect
          id="gender"
          name="gender"
          control={control}
          label={t("stepperExample.gender")}
          placeholder={t("stepperExample.gender")}
          options={genderOptions}
          labelKey="name"
          valueKey="value"
          error={!!errors.gender}
          errorMessage={errors.gender?.message}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <FormDatePicker
              label={t("stepperExample.dateOfBirth")}
              placeholder={t("stepperExample.dateOfBirth")}
              value={field.value}
              maxDate={new Date().toISOString().slice(0, 10)}
              onChange={field.onChange}
              error={errors.dateOfBirth?.message}
            />
          )}
        />
        <FormSelect
          id="city"
          name="city"
          control={control}
          label={t("common.city")}
          placeholder={t("common.city")}
          options={cityOptions}
          labelKey="name"
          valueKey="value"
          searchable
          error={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <FormInput
          id="address"
          name="address"
          control={control}
          label={t("common.address")}
          placeholder={t("common.address")}
          error={!!errors.address}
          errorMessage={errors.address?.message}
        />
      </div>
    </div>
  );
};

export default CustomerInfoStep;
