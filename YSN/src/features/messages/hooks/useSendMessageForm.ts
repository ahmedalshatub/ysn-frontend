import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useMyCities from "../../../shared/hooks/useMyCities";
import { customerRoleConfigs, customerRoleList, type CustomerListDto, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { useSendMessageMutation } from "../api/Messages.api";
import useMessageAudiences from "./useMessageAudiences";
import { sendMessageSchema, type SendMessageFormValues } from "../validation/Messages.validation";
import { MessageTarget, type MessageTargetValue } from "../types/Messages.types";

const useSendMessageForm = (customer: CustomerListDto | null | undefined, onSent: () => void) => {
  const { t } = useTranslation();
  const audiences = useMessageAudiences();
  const { cities } = useMyCities();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const form = useForm<SendMessageFormValues>({
    resolver: yupResolver(sendMessageSchema) as never,
    mode: "onBlur",
    defaultValues: {
      target: customer ? MessageTarget.Customer : audiences[0] ?? MessageTarget.Customer,
      userId: customer?.id ?? null,
      cityId: null,
      roleId: null,
      subject: "",
      content: "",
    },
  });

  const target = Number(useWatch({ control: form.control, name: "target" })) as MessageTargetValue;
  const cityId = useWatch({ control: form.control, name: "cityId" });
  const roleId = useWatch({ control: form.control, name: "roleId" });

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const roleOptions = useMemo(
    () => customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) })),
    [t]
  );

  const cityName = cities.find((city) => city.id === Number(cityId))?.name ?? "";
  const roleName = roleId ? t(customerRoleConfigs[Number(roleId) as CustomerRoleValue].pluralKey) : "";
  const summary = {
    [MessageTarget.Customer]: t("messages.summaryCustomer"),
    [MessageTarget.City]: cityName ? t("messages.summaryCity", { city: cityName }) : "",
    [MessageTarget.Role]: roleName ? t("messages.summaryType", { type: roleName }) : "",
    [MessageTarget.RoleInCity]: roleName && cityName ? t("messages.summaryTypeInCity", { type: roleName, city: cityName }) : "",
    [MessageTarget.All]: t("messages.summaryAll"),
  }[target];

  const submit = form.handleSubmit(async (values: SendMessageFormValues) => {
    try {
      const result = await sendMessage({
        subject: values.subject.trim(),
        content: values.content.trim(),
        targetType: target,
        userId: target === MessageTarget.Customer ? Number(values.userId) : undefined,
        cityId: target === MessageTarget.City || target === MessageTarget.RoleInCity ? Number(values.cityId) : undefined,
        roleId: target === MessageTarget.Role || target === MessageTarget.RoleInCity ? Number(values.roleId) : undefined,
      }).unwrap();
      showSuccess(t("messages.successSend", { count: result.messagesCount }));
      onSent();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    submit,
    isLoading,
    audiences,
    target,
    summary,
    cityOptions,
    roleOptions,
    needsCity: target === MessageTarget.City || target === MessageTarget.RoleInCity,
    needsRole: target === MessageTarget.Role || target === MessageTarget.RoleInCity,
  };
};

export type SendMessageForm = ReturnType<typeof useSendMessageForm>;
export default useSendMessageForm;
