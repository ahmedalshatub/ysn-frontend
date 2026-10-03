import { useLocation } from "react-router-dom";
import useUrlFilter from "../../../shared/hooks/useUrlFilter";
import type { MessageRequest } from "../types/Messages.types";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import MailIcon from "../../../assets/icons/MailIcon";
import MessagesList from "../components/MessagesList";

const MessagesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const initialFilter = useUrlFilter<MessageRequest>();
  useTitle(t("messages.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("messages.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.customers") }, { label: t("messages.pageTitle") }]}
        variant="gradient"
        icon={<MailIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <MessagesList key={location.search} initialFilter={initialFilter} />
      </Card>
    </div>
  );
};

export default MessagesPage;
