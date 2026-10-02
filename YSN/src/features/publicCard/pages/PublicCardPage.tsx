import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { toggleTheme } from "../../../core/slices/theme.slice";
import useTitle from "../../../shared/hooks/useTitle";
import UnAuthLayout from "../../../core/layout/UnAuthLayout";
import Avatar from "../../../shared/components/media/Avatar";
import Badge from "../../../shared/components/badges/Badge";
import QRCode from "../../../shared/components/display/QRCode";
import SunIcon from "../../../assets/icons/SunIcon";
import MoonIcon from "../../../assets/icons/MoonIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ShieldCheckIcon from "../../../assets/icons/ShieldCheckIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import { mockEmployees } from "../types/publicCardData";
import LanguageSwitcher from "../../../shared/components/navigation/LanguageSwitcher";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const PublicCard = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const employee = id ? mockEmployees[id] : undefined;
  useTitle(employee ? employee.name : t("publicCard.notFound"));

  const controls = (
    <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn"
      >
        {themeMode === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
      <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
    </div>
  );

  const blobs = (
    <>
      <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
      <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />
    </>
  );

  if (!employee) {
    return (
      <UnAuthLayout>
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden auth-modern-bg">
          {blobs}
          {controls}

          <div className="relative z-10 w-full max-w-md px-4">
            <div className="rounded-2xl border p-8 shadow-2xl backdrop-blur-xl auth-modern-card text-center">
              <span className="stat-icon-danger mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                <UserIcon className="h-8 w-8" />
              </span>
              <h1 className="text-xl font-bold auth-heading">{t("publicCard.notFound")}</h1>
              <p className="mt-2 text-sm auth-subtext">{t("publicCard.invalidId")}</p>
            </div>
          </div>
        </div>
      </UnAuthLayout>
    );
  }

  const detail = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-center gap-3 px-4 py-3 border-b ce-divider last:border-b-0">
      <span className="stat-icon-primary shrink-0 flex h-9 w-9 items-center justify-center rounded-lg">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="ce-muted block text-xs">{label}</span>
        <span className="ce-panel-heading block text-sm font-semibold break-words">{value}</span>
      </div>
    </div>
  );

  return (
    <UnAuthLayout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden auth-modern-bg py-10">
        {blobs}
        {controls}

        <div className="relative z-10 w-full max-w-lg px-4">
          <div className="rounded-2xl border p-8 shadow-2xl backdrop-blur-xl auth-modern-card">
            <div className="flex flex-col items-center text-center">
              <Avatar
                src={employee.avatar || undefined}
                name={employee.name}
                size="2xl"
                variant="primary"
                status="online"
                bordered
              />
              <h1 className="mt-4 text-2xl font-bold auth-heading">{employee.name}</h1>
              <p className="mt-1 text-sm auth-subtext">{employee.position}</p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <Badge variant="primary" size="sm" pill label={employee.department} />
                <Badge variant="dark" size="sm" pill label={employee.employeeId} />
              </div>
            </div>

            <div className="mt-6 ce-panel rounded-xl border ce-divider overflow-hidden">
              {detail(
                <ClipboardIcon className="h-4 w-4" />,
                t("publicCard.employeeId"),
                employee.employeeId,
              )}
              {detail(<MailIcon className="h-4 w-4" />, t("publicCard.email"), employee.email)}
              {detail(
                <HelpCircleIcon className="h-4 w-4" />,
                t("publicCard.phone"),
                employee.phone,
              )}
              {detail(
                <UsersIcon className="h-4 w-4" />,
                t("publicCard.department"),
                employee.department,
              )}
              {detail(
                <CalendarIcon className="h-4 w-4" />,
                t("publicCard.joinDate"),
                formatDate(employee.joinDate),
              )}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <QRCode value={employee.employeeId} size={128} />
              <p className="flex items-center gap-1.5 text-xs auth-footer">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                {t("publicCard.verifiedBadge")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default PublicCard;
