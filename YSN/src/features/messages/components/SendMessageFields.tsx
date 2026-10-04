import { useTranslation } from "react-i18next";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import Message from "../../../shared/components/feedback/Message";
import FormSection from "../../../shared/components/forms/FormSection";
import MailIcon from "../../../assets/icons/MailIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import CustomerSearchSelect from "../../customers/components/CustomerSearchSelect";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import type { SendMessageFormValues } from "../validation/Messages.validation";
import type { SendMessageForm } from "../hooks/useSendMessageForm";
import { MessageTarget } from "../types/Messages.types";
import MessageAudienceSelect from "./MessageAudienceSelect";

interface SendMessageFieldsProps {
  form: SendMessageForm;
  customer?: CustomerListDto | null;
}

const SendMessageFields = ({ form, customer }: SendMessageFieldsProps) => {
  const { t } = useTranslation();
  const { control, errors, audiences, target, summary, cityOptions, roleOptions, needsCity, needsRole } = form;
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <div className="space-y-8">
      <FormSection icon={<UsersIcon />} title={t("messages.audience")}>
        {!customer && <MessageAudienceSelect<SendMessageFormValues> name="target" control={control} audiences={audiences} />}
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
        {(needsCity || needsRole) && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {needsRole && (
              <FormSelect<SendMessageFormValues>
                name="roleId"
                control={control}
                label={`${t("messages.customerType")} *`}
                options={roleOptions}
                valueKey="value"
                labelKey="name"
                error={!!errors.roleId}
                errorMessage={fieldError(errors.roleId?.message)}
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
          rows={9}
          error={!!errors.content}
          errorMessage={fieldError(errors.content?.message)}
        />
      </FormSection>
      {summary && <Message variant="info">{summary}</Message>}
    </div>
  );
};

export default SendMessageFields;
