import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../../shared/components/modals/FormModal";
import FormInput from "../../../../shared/components/inputs/FormInput";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import EditIcon from "../../../../assets/icons/EditIcon";
import { useUpdateTvMutation } from "../../api/Tvs.api";
import { updateCustomerTvSchema, type UpdateCustomerTvFormValues } from "../../validation/Tvs.validation";
import type { CustomerTvListDto } from "../../types/Tvs.types";

interface EditCustomerTvModalProps {
  open: boolean;
  tv: CustomerTvListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCustomerTvModal = ({ open, tv, onClose, onSuccess }: EditCustomerTvModalProps) => {
  const { t } = useTranslation();
  const [updateTv, { isLoading }] = useUpdateTvMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCustomerTvFormValues>({
    resolver: yupResolver(updateCustomerTvSchema) as never,
    mode: "onBlur",
    defaultValues: { nickname: tv.nickname ?? "" },
  });

  const onSubmit = async (values: UpdateCustomerTvFormValues) => {
    try {
      await updateTv({ id: tv.id, data: { nickname: values.nickname?.trim() || undefined } }).unwrap();
      showSuccess(t("tvs.successUpdate"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("tvs.editNicknameOf", { number: tv.tvNumber })}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<EditIcon className="h-6 w-6" />}
    >
      <FormInput<UpdateCustomerTvFormValues>
        name="nickname"
        control={control}
        label={t("tvs.nickname")}
        placeholder={t("tvs.nicknameHint")}
        error={!!errors.nickname}
        errorMessage={errors.nickname?.message ? t(errors.nickname.message) : ""}
      />
    </FormModal>
  );
};

export default EditCustomerTvModal;
