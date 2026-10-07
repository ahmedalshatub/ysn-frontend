import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Tabs from "../../../shared/components/navigation/Tabs";
import ProfileInfoTab from "../components/ProfileInfoTab";
import ProfileNotificationsTab from "../components/ProfileNotificationsTab";
import ProfileSettingsTab from "../components/ProfileSettingsTab";
import NotificationSettings from "../../notifications/components/NotificationSettings";
import HomeIcon from "../../../assets/icons/HomeIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import { useGetMyProfileQuery } from "../../users/api/Users.api";
import { setProfileImage } from "../../auth/slices/Auth.slice";

const Profile = () => {
  const { t } = useTranslation();
  useTitle(t("profile.title"));

  const dispatch = useDispatch<AppDispatch>();
  const isEmployee = useSelector((state: RootState) => state.auth.roleId != null);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get("tab") ?? "info");

  const { data: user, isLoading, refetch } = useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handlePhotoSaved = (imagePath: string | null) => {
    dispatch(setProfileImage(imagePath));
    refetch();
  };

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        title={t("profile.title")}
        items={[{ label: t("sidebar.homePage"), icon: <HomeIcon /> }, { label: t("profile.title") }]}
        variant="gradient"
        icon={<UserIcon />}
        animated
      />

      <Card variant="elevated" padding="md">
        <Tabs
          tabs={[
            { id: "info", label: t("profile.infoTab") },
            { id: "notifications", label: t("profile.notificationsTab") },
            ...(isEmployee ? [{ id: "notificationSettings", label: t("profile.notificationSettingsTab") }] : []),
            { id: "settings", label: t("profile.settingsTab") },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          fullWidth
        />

        <div className="pt-4">
          {activeTab === "info" && (
            <ProfileInfoTab user={user} loading={isLoading} onPhotoSaved={handlePhotoSaved} />
          )}
          {activeTab === "notifications" && <ProfileNotificationsTab />}
          {activeTab === "notificationSettings" && isEmployee && <NotificationSettings />}
          {activeTab === "settings" && <ProfileSettingsTab />}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
