import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";
import type { LoginCodeState } from "../../types/Auth.types";
import { login } from "../../slices/Auth.slice";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { useResendLoginCodeMutation, useVerifyLoginCodeMutation } from "../../api/Auth.api";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import useTitle from "../../../../shared/hooks/useTitle";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import OtpInput from "../../../../shared/components/inputs/OtpInput";
import Button from "../../../../shared/components/buttons/Button";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const CODE_LENGTH = 6;

const LoginCode = () => {
  const { t } = useTranslation();
  useTitle(t("loginCode.title"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const challengeState = location.state as LoginCodeState | null;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [verifyLoginCode, { isLoading: isVerifying }] = useVerifyLoginCodeMutation();
  const [resendLoginCode, { isLoading: isResending }] = useResendLoginCodeMutation();
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState(challengeState?.challengeId ?? "");
  const [resendIn, setResendIn] = useState(challengeState?.resendAfterSeconds ?? 60);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  if (!challengeState) return <Navigate to="/login" replace />;

  const onVerify = async () => {
    if (code.length !== CODE_LENGTH) {
      showError(t("loginCode.codeMustBe6Digits"));
      return;
    }
    try {
      const result = await verifyLoginCode({ challengeId, code }).unwrap();
      dispatch(login(result));
      showSuccess(t("login.loginSuccess"));
      navigate(challengeState.next || "/dashboard", { replace: true });
    } catch (error: any) {
      setCode("");
      showError(getErrorMessage(error));
    }
  };

  const onResend = async () => {
    try {
      const result = await resendLoginCode({ challengeId }).unwrap();
      setChallengeId(result.challengeId);
      setResendIn(result.resendAfterSeconds);
      setCode("");
      showSuccess(t("loginCode.codeSent"));
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <UnAuthLayout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
          <button type="button" onClick={() => dispatch(toggleTheme())} className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn">
            {themeMode === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="rounded-2xl border p-8 shadow-2xl backdrop-blur-xl auth-modern-card">
            <div className="mb-8 flex flex-col items-center">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3" />
              <h1 className="text-2xl font-bold auth-heading">{t("loginCode.title")}</h1>
              <p className="mt-1 text-center text-sm auth-subtext">{t("loginCode.description", { email: challengeState.email })}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium auth-form-label">{t("loginCode.code")}</label>
                <OtpInput length={CODE_LENGTH} value={code} onChange={setCode} onComplete={setCode} variant="primary" />
              </div>
              <Button type="button" variant="primary" block size="lg" loading={isVerifying} label={t("loginCode.verify")} onClick={onVerify} />
              <Button
                type="button"
                variant="secondary"
                outline
                block
                loading={isResending}
                disabled={resendIn > 0}
                label={resendIn > 0 ? t("loginCode.resendIn", { seconds: resendIn }) : t("loginCode.resend")}
                onClick={onResend}
              />
              <Button type="button" variant="secondary" outline block label={t("common.back")} onClick={() => navigate("/login", { replace: true })} />
            </div>
          </div>
          <p className="mt-6 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default LoginCode;
