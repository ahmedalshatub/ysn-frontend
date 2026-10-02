import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import MailIcon from "../../../assets/icons/MailIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { fullName, fullPhone, type UserListDto } from "../types/Users.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";

interface UserCardProps {
  user: UserListDto;
  actions: ActionItem[];
}

const UserCard = ({ user, actions }: UserCardProps) => {
  const { t, i18n } = useTranslation();
  const phone = fullPhone(user);

  return (
    <div className="entity-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ProfileAvatar name={fullName(user)} imagePath={user.profileImage} size="lg" />
          <div className="min-w-0">
            <h3 className="entity-card-title truncate">{fullName(user)}</h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <Badge label={user.roleName ?? "-"} variant={user.isSuperAdmin ? "primary" : "info"} size="sm" />
              {user.isDeleted ? (
                <Badge label={t("common.deleted")} variant="danger" size="sm" />
              ) : (
                <Badge
                  label={user.isActive ? t("common.active") : t("common.inactive")}
                  variant={user.isActive ? "success" : "secondary"}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>
        {actions.length > 0 && <TableActionDropdown size="sm" actions={actions} />}
      </div>

      <div className="entity-card-body">
        <p className="entity-card-line">
          <MailIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate" dir="ltr">{user.email ?? "-"}</span>
        </p>
        {phone && (
          <p className="entity-card-line">
            <span className="entity-card-line-label">{t("users.phoneNumber")}</span>
            <span dir="ltr">{phone}</span>
          </p>
        )}
        <p className="entity-card-line">
          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
          <span>
            {t("users.lastLogin")}:{" "}
            {user.lastLoginAt ? formatDate(user.lastLoginAt, { locale: i18n.language }) : t("users.never")}
          </span>
        </p>
        <p className="entity-card-line">
          <span className="entity-card-line-label">{t("users.cities")}</span>
          <span>{user.hasAllCities ? t("users.allCities") : t("users.someCities")}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
