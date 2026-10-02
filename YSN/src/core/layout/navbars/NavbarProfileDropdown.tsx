import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import { logout } from "../../../features/auth/slices/Auth.slice";
import { useNavigate } from "react-router-dom";
import PanelDropdown from "../../../shared/components/navigation/PanelDropdown";
import ChangePasswordModal from "../../../features/auth/components/ChangePasswordModal";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import LogOutIcon from "../../../assets/icons/LogOutIcon";

const NavbarProfileDropdown = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { firstName, lastName, profileImageUrl } = useSelector(
    (state: RootState) => state.auth
  );
  const profileSrc = useFileSrc(profileImageUrl);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const initials =
    (firstName?.[0] || "").toUpperCase() +
    (lastName?.[0] || "").toUpperCase();

  return (
    <>
    <PanelDropdown
      trigger={
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors navbar-btn"
        >
          {profileSrc ? (
            <img src={profileSrc} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="navbar-avatar-fallback flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
              {initials || "U"}
            </div>
          )}
          <div className="hidden text-start sm:block">
            <p className="navbar-username text-sm font-medium leading-tight">{firstName} {lastName}</p>
          </div>
          <ChevronDownIcon className="navbar-chevron hidden h-4 w-4 transition-transform sm:block" />
        </button>
      }
      placement={i18n.dir() === "rtl" ? "bottom-start" : "bottom-end"}
      width="w-56"
    >
      <div className="py-1">
        <button type="button" onClick={() => navigate("/profile")} className="user-dropdown-item flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors">
          <UserIcon className="h-4 w-4" />
          {t("navbar.profile")}
        </button>
        <button type="button" onClick={() => setChangePasswordOpen(true)} className="user-dropdown-item flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors">
          <LockIcon className="h-4 w-4" />
          {t("navbar.changePassword")}
        </button>
      </div>
      <div className="navbar-dropdown-divider border-t py-1">
        <button type="button" onClick={handleLogout} className="user-dropdown-logout flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors">
          <LogOutIcon className="h-4 w-4" />
          {t("navbar.logout")}
        </button>
      </div>
    </PanelDropdown>

    <ChangePasswordModal open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
    </>
  );
};

export default NavbarProfileDropdown;
