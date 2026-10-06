import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../../shared/components/modals/FormModal";
import FormSection from "../../../../shared/components/forms/FormSection";
import FormInput from "../../../../shared/components/inputs/FormInput";
import Input from "../../../../shared/components/inputs/Input";
import Message from "../../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import UserIcon from "../../../../assets/icons/UserIcon";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { useGetCustomerQuery } from "../../../customers/api/Customers.api";
import type { CustomerListDto } from "../../../customers/types/Customers.types";
import { useAddTvMutation } from "../../api/Tvs.api";
import { addCustomerTvSchema, type AddCustomerTvFormValues } from "../../validation/Tvs.validation";

interface AddCustomerTvModalProps {
  open: boolean;
  customer?: CustomerListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCustomerTvModal = ({ open, customer, onClose, onSuccess }: AddCustomerTvModalProps) => {
  const { t } = useTranslation();
  const [addTv, { isLoading }] = useAddTvMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCustomerTvFormValues>({
    resolver: yupResolver(addCustomerTvSchema) as never,
    mode: "onBlur",
    defaultValues: { userId: customer?.id ?? 0, tvNumber: "", nickname: "" },
  });
  const userId = useWatch({ control, name: "userId" });
  const { data: chosenCustomer } = useGetCustomerQuery(Number(userId), {
    skip: !!customer || !userId,
    refetchOnMountOrArgChange: true,
  });
  const cityName = (customer ?? chosenCustomer)?.cityName ?? "";

  const onSubmit = async (values: AddCustomerTvFormValues) => {
    try {
      await addTv({
        userId: Number(values.userId),
        tvNumber: values.tvNumber.trim(),
        nickname: values.nickname?.trim() || undefined,
      }).unwrap();
      showSuccess(t("tvs.successAdd"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("tvs.addTv")}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<MonitorIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<UserIcon />} title={t("tvs.customer")}>
          <CustomerSearchSelect<AddCustomerTvFormValues>
            name="userId"
            control={control}
            label={`${t("tvs.customer")} *`}
            initialCustomer={customer}
            error={!!errors.userId}
            errorMessage={fieldError(errors.userId?.message)}
          />
          <Input name="cityName" label={t("tvs.customerCity")} value={cityName} disabled readOnly size="md" />
          <Message variant="info">{t("tvs.cityHint")}</Message>
        </FormSection>
        <FormSection icon={<MonitorIcon />} title={t("tvs.tv")} columns={2}>
          <FormInput<AddCustomerTvFormValues>
            name="tvNumber"
            control={control}
            label={`${t("tvs.tvNumber")} *`}
            placeholder={t("tvs.tvNumberHint")}
            error={!!errors.tvNumber}
            errorMessage={fieldError(errors.tvNumber?.message)}
          />
          <FormInput<AddCustomerTvFormValues>
            name="nickname"
            control={control}
            label={t("tvs.nickname")}
            placeholder={t("tvs.nicknameHint")}
            error={!!errors.nickname}
            errorMessage={fieldError(errors.nickname?.message)}
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default AddCustomerTvModal;
