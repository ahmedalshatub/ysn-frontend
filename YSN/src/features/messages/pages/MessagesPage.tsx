import { useState } from "react";
import { useLocation } from "react-router-dom";
import useUrlFilter from "../../../shared/hooks/useUrlFilter";
import type { MessageRequest } from "../types/Messages.types";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import MailIcon from "../../../assets/icons/MailIcon";
import MessagesList from "../components/MessagesList";

const MessagesPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const location = useLocation();
  const initialFilter = useUrlFilter<MessageRequest>();
  useTitle(t("messages.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("messages.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.customers") }, { label: t("messages.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<MailIcon />}
        showDate
        animated
      />
      <MessagesList framed actionsTarget={actionsTarget} key={location.search} initialFilter={initialFilter} />
    </div>
  );
};

export default MessagesPage;
