import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ChangePasswordModal from "../../features/auth/components/ChangePasswordModal";


const RequireUser = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const forcePasswordChange = useSelector((state: RootState) => state.auth.forcePasswordChange);
  const location = useLocation();

  useEffect(() => {




  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: "/",
          search: "next=" + location.pathname,
        }}
      />
    );
  }

  if (forcePasswordChange) {
    return <ChangePasswordModal open forced onClose={() => {}} />;
  }

  return <Outlet />;
};

export default RequireUser;
