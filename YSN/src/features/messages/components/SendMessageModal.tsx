import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import MailIcon from "../../../assets/icons/MailIcon";
import CustomerSearchSelect from "../../customers/components/CustomerSearchSelect";
import { customerTypeConfigs, customerTypeList, type CustomerListDto, type CustomerTypeValue } from "../../customers/types/Customers.types";
import { useSendMessageMutation } from "../api/Messages.api";
import useMessageAudiences from "../hooks/useMessageAudiences";
import { sendMessageSchema, type SendMessageFormValues } from "../validation/Messages.validation";
import MessageAudienceSelect from "./MessageAudienceSelect";
import { MessageTarget, type MessageTargetValue } from "../types/Messages.types";
import FormSection from "../../../shared/components/forms/FormSection";
import UsersIcon from "../../../assets/icons/UsersIcon";

interface SendMessageModalProps {
  open: boolean;
  customer?: CustomerListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SendMessageModal = ({ open, customer, onClose, onSuccess }: SendMessageModalProps) => {
  const { t } = useTranslation();
  const audiences = useMessageAudiences();
  const { cities } = useMyCities();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: yupResolver(sendMessageSchema) as never,
    mode: "onBlur",
    defaultValues: {
      target: customer ? MessageTarget.Customer : audiences[0] ?? MessageTarget.Customer,
      userId: customer?.id ?? null,
      cityId: null,
      userType: null,
      subject: "",
      content: "",
    },
  });

  const target = Number(useWatch({ control, name: "target" })) as MessageTargetValue;
  const cityId = useWatch({ control, name: "cityId" });
  const userType = useWatch({ control, name: "userType" });

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const typeOptions = useMemo(
    () => customerTypeList.map((type) => ({ value: type, name: t(customerTypeConfigs[type].pluralKey) })),
    [t]
  );

  const cityName = cities.find((city) => city.id === Number(cityId))?.name ?? "";
  const typeName = userType ? t(customerTypeConfigs[Number(userType) as CustomerTypeValue].pluralKey) : "";
  const summary = {
    [MessageTarget.Customer]: t("messages.summaryCustomer"),
    [MessageTarget.City]: cityName ? t("messages.summaryCity", { city: cityName }) : "",
    [MessageTarget.UserType]: typeName ? t("messages.summaryType", { type: typeName }) : "",
    [MessageTarget.UserTypeInCity]:
      typeName && cityName ? t("messages.summaryTypeInCity", { type: typeName, city: cityName }) : "",
    [MessageTarget.All]: t("messages.summaryAll"),
  }[target];

  const onSubmit = async (values: SendMessageFormValues) => {
    try {
      const result = await sendMessage({
        subject: values.subject.trim(),
        content: values.content.trim(),
        targetType: target,
        userId: target === MessageTarget.Customer ? Number(values.userId) : undefined,
        cityId:
          target === MessageTarget.City || target === MessageTarget.UserTypeInCity ? Number(values.cityId) : undefined,
        userType:
          target === MessageTarget.UserType || target === MessageTarget.UserTypeInCity
            ? Number(values.userType)
            : undefined,
      }).unwrap();
      showSuccess(t("messages.successSend", { count: result.messagesCount }));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");
  const needsCity = target === MessageTarget.City || target === MessageTarget.UserTypeInCity;
  const needsType = target === MessageTarget.UserType || target === MessageTarget.UserTypeInCity;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("messages.sendMessage")}
      submitText={t("messages.send")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<MailIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<UsersIcon />} title={t("messages.audience")}>
          {!customer && (
            <MessageAudienceSelect<SendMessageFormValues> name="target" control={control} audiences={audiences} />
          )}
          {target === MessageTarget.Customer && (
            <CustomerSearchSelect<SendMessageFormValues>
              name="userId"
              control={control}
              label={`${t("messages.customer")} *`}
              initialCustomer={customer}
              error={!!errors.userId}
              errorMessage={fieldError(errors.userId?.message)}
            />
          )}
          {(needsCity || needsType) && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {needsType && (
                <FormSelect<SendMessageFormValues>
                  name="userType"
                  control={control}
                  label={`${t("messages.customerType")} *`}
                  options={typeOptions}
                  valueKey="value"
                  labelKey="name"
                  error={!!errors.userType}
                  errorMessage={fieldError(errors.userType?.message)}
                />
              )}
              {needsCity && (
                <FormSelect<SendMessageFormValues>
                  name="cityId"
                  control={control}
                  label={`${t("messages.city")} *`}
                  options={cityOptions}
                  valueKey="value"
                  labelKey="name"
                  searchable
                  error={!!errors.cityId}
                  errorMessage={fieldError(errors.cityId?.message)}
                />
              )}
            </div>
          )}
        </FormSection>
        <FormSection icon={<MailIcon />} title={t("messages.message")}>
          <FormInput<SendMessageFormValues>
            name="subject"
            control={control}
            label={`${t("messages.subject")} *`}
            error={!!errors.subject}
            errorMessage={fieldError(errors.subject?.message)}
          />
          <FormTextArea<SendMessageFormValues>
            name="content"
            control={control}
            label={`${t("messages.content")} *`}
            rows={7}
            error={!!errors.content}
            errorMessage={fieldError(errors.content?.message)}
          />
        </FormSection>
        {summary && <Message variant="info">{summary}</Message>}
      </div>
    </FormModal>
  );
};

export default SendMessageModal;
