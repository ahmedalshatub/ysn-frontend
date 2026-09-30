import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useVerifyRegistrationOtpMutation,
  useRegisterRequestMutation,
} from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import OtpInput from "../../../shared/components/inputs/OtpInput";
import Button from "../../../shared/components/buttons/Button";

const OTP_LENGTH = 6;

interface RegisterStep2Props {
  emailOrPhone: string;
  onSuccess: (registerToken: string) => void;
  onBack: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  otpVariant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "dark";
  size?: "sm" | "md" | "lg";
}

const RegisterStep2 = ({
  emailOrPhone,
  onSuccess,
  onBack,
  buttonVariant = "primary",
  otpVariant = "primary",
  size,
}: RegisterStep2Props) => {
  const { t } = useTranslation();
  const [verifyRegistrationOtp, { isLoading: isVerifying }] = useVerifyRegistrationOtpMutation();
  const [registerRequest, { isLoading: isResending }] = useRegisterRequestMutation();

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
    if (otpCode.length !== OTP_LENGTH) {
      showError(t("register.otpMustBe6Digits"));
      return;
    }
    try {
      const result = await verifyRegistrationOtp({ emailOrPhone, otpCode }).unwrap();
      showSuccess(t("register.otpVerified"));
      onSuccess(result.registerToken);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const onResendOtp = async () => {
    try {
      await registerRequest({ emailOrPhone }).unwrap();
      showSuccess(t("register.otpSent"));
      setOtpCode("");
      setTimeLeft(120);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p
        className={`text-center text-sm font-medium ${
          timeLeft < 30 ? "auth-timer-warning" : "auth-timer-text"
        }`}
      >
        {t("register.timeRemaining")}: {formatTime(timeLeft)}
      </p>
      <div>
        <label className="mb-1.5 block text-sm font-medium auth-form-label">
          {t("register.otpCode")}
        </label>
        <OtpInput
          length={OTP_LENGTH}
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
        label={t("register.verifyOtp")}
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
          label={t("register.resendOtp")}
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

export default RegisterStep2;
