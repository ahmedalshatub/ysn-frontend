import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useVerifyOtpMutation, useForgetPasswordMutation } from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import OtpInput from "../../../shared/components/inputs/OtpInput";
import Button from "../../../shared/components/buttons/Button";

interface ForgotPasswordStep2Props {
  emailOrUsername: string;
  onSuccess: (resetToken: string) => void;
  onBack: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  otpVariant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
  size?: "sm" | "md" | "lg";
}

const ForgotPasswordStep2 = ({ emailOrUsername, onSuccess, onBack, buttonVariant = "primary", otpVariant = "primary", size }: ForgotPasswordStep2Props) => {
  const { t } = useTranslation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [forgetPassword, { isLoading: isResending }] = useForgetPasswordMutation();

  const [otpCode, setOtpCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const onSubmitOtp = async () => {
    if (otpCode.length !== 8) {
      showError(t("forgotPassword.otpMustBe8Digits"));
      return;
    }
    try {
      const result = await verifyOtp({ emailOrUsername, otpCode }).unwrap();
      showSuccess(t("forgotPassword.otpVerified"));
      onSuccess(result.resetToken);
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  const onResendOtp = async () => {
    try {
      await forgetPassword({ emailOrUsername }).unwrap();
      showSuccess(t("forgotPassword.otpSent"));
      setOtpCode("");
      setTimeLeft(120);
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p className={`text-center text-sm font-medium ${timeLeft < 30 ? "auth-timer-warning" : "auth-timer-text"}`}>
        {t("forgotPassword.timeRemaining")}: {formatTime(timeLeft)}
      </p>
      <div>
        <label className="mb-1.5 block text-sm font-medium auth-form-label">
          {t("forgotPassword.otpCode")}
        </label>
        <OtpInput
          length={8}
          value={otpCode}
          onChange={setOtpCode}
          onComplete={setOtpCode}
          variant={otpVariant}
        />
      </div>
      <Button
        type="button"
        variant={buttonVariant}
        block
        size={size || "lg"}
        loading={isVerifying}
        label={t("forgotPassword.verifyOtp")}
        onClick={onSubmitOtp}
      />
      {timeLeft <= 0 && (
        <Button
          type="button"
          variant="warning"
          outline
          block
          size={size || "lg"}
          loading={isResending}
          label={t("forgotPassword.sendOtp")}
          onClick={onResendOtp}
        />
      )}
      <Button
        type="button"
        variant="secondary"
        outline
        block
        size={size || "lg"}
        label={t("common.back")}
        onClick={onBack}
      />
    </div>
  );
};

export default ForgotPasswordStep2;
