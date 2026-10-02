import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../app/store";
import ChangePasswordModal from "../../features/auth/components/ChangePasswordModal";
import { useGetCurrentUserQuery } from "../../features/auth/api/Auth.api";
import { setCurrentUser } from "../../features/auth/slices/Auth.slice";

const RequireUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const forcePasswordChange = useSelector((state: RootState) => state.auth.forcePasswordChange);
  const location = useLocation();
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !isLoggedIn, refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (currentUser) dispatch(setCurrentUser(currentUser));
  }, [currentUser, dispatch]);

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
