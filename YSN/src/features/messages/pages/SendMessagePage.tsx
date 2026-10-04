import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import MailIcon from "../../../assets/icons/MailIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import XIcon from "../../../assets/icons/XIcon";
import useSendMessageForm from "../hooks/useSendMessageForm";
import SendMessageFields from "../components/SendMessageFields";

const SendMessagePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useTitle(t("messages.sendMessage"));
  const form = useSendMessageForm(null, () => navigate("/messages"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("messages.sendMessage")}
        items={[
          { label: t("sidebar.homePage") },
          { label: t("sidebar.customers") },
          { label: t("messages.pageTitle") },
          { label: t("messages.sendMessage") },
        ]}
        variant="gradient"
        icon={<MailIcon />}
        animated
      />
      <form onSubmit={form.submit} className="space-y-6">
        <Card variant="elevated" padding="lg">
          <SendMessageFields form={form} />
        </Card>
        <Card variant="elevated" padding="md">
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              icon={<XIcon />}
              onClick={() => navigate("/messages")}
              disabled={form.isLoading}
              label={t("common.cancel")}
            />
            <Button type="submit" variant="primary" icon={<CheckIcon />} loading={form.isLoading} label={t("messages.send")} />
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SendMessagePage;
