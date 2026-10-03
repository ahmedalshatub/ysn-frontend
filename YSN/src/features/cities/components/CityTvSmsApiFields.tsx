import { useWatch, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import { useGetTvSmsServersQuery } from "../../tvSmsServers/api/TvSmsServers.api";
import type { CityFormValues } from "../validation/Cities.validation";

interface CityTvSmsApiFieldsProps {
  control: Control<CityFormValues>;
  errors: FieldErrors<CityFormValues>;
}

const CityTvSmsApiFields = ({ control, errors }: CityTvSmsApiFieldsProps) => {
  const { t } = useTranslation();
  const hasTvSmsApi = useWatch({ control, name: "hasTvSmsApi" });
  const { data: servers } = useGetTvSmsServersQuery({ isActive: true, isDeleted: false }, { skip: !hasTvSmsApi });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormCheckbox<CityFormValues>
        name="hasTvSmsApi"
        control={control}
        label={t("cities.hasTvSmsApi")}
        description={t("cities.hasTvSmsApiHint")}
      />
      {hasTvSmsApi && (
        <FormSelect<CityFormValues>
          name="tvSmsServerId"
          control={control}
          label={`${t("cities.tvSmsServer")} *`}
          options={servers?.items ?? []}
          valueKey="id"
          labelKey="name"
          searchable
          error={!!errors.tvSmsServerId}
          errorMessage={errors.tvSmsServerId?.message ? t(errors.tvSmsServerId.message) : ""}
        />
      )}
    </div>
  );
};

export default CityTvSmsApiFields;
