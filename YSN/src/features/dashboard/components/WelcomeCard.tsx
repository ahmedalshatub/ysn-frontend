import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../app/store";
import Card from "../../../shared/components/cards/Card";

const WelcomeCard = () => {
  const { t } = useTranslation();
  const { firstName, lastName, roleName } = useSelector((state: RootState) => state.auth);

  return (
    <Card variant="elevated" padding="lg">
      <h2 className="text-xl font-semibold ce-heading">{t("dashboard.welcome", { name: `${firstName} ${lastName}`.trim() })}</h2>
      {roleName && <p className="mt-1 text-sm ce-muted">{t("dashboard.yourRole", { role: roleName })}</p>}
      <p className="mt-3 text-sm ce-muted">{t("dashboard.welcomeHint")}</p>
    </Card>
  );
};

export default WelcomeCard;
