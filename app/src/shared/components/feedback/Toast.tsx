import { toast, Toaster, type ExternalToast } from "sonner";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastTheme = "light" | "dark" | "system";

interface ToastProviderProps {
  position?: ToastPosition;
  theme?: ToastTheme;
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  closeButton?: boolean;
  visibleToasts?: number;
  offset?: string | number;
}

const ToastProvider = ({
  position = "bottom-right",
  theme = "light",
  richColors = true,
  expand = false,
  duration = 4000,
  closeButton = false,
  visibleToasts = 4,
  offset,
}: ToastProviderProps) => {
  return (
    <Toaster
      position={position}
      theme={theme}
      richColors={richColors}
      expand={expand}
      duration={duration}
      closeButton={closeButton}
      visibleToasts={visibleToasts}
      offset={offset}
      toastOptions={{
        className: "toast-custom",
      }}
    />
  );
};

const showToast = (message: string, options?: ExternalToast) => {
  return toast(message, options);
};

const showSuccess = (message: string, options?: ExternalToast) => {
  return toast.success(message, options);
};

const showError = (message: string, options?: ExternalToast) => {
  return toast.error(message, options);
};

const showInfo = (message: string, options?: ExternalToast) => {
  return toast.info(message, options);
};

const showWarning = (message: string, options?: ExternalToast) => {
  return toast.warning(message, options);
};

const showLoading = (message: string, options?: ExternalToast) => {
  return toast.loading(message, options);
};

const showPromise = <T,>(
  promise: Promise<T> | (() => Promise<T>),
  msgs: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: unknown) => string);
  },
  options?: ExternalToast
) => {
  return toast.promise(promise, {
    ...msgs,
    ...options,
  });
};

const showAction = (
  message: string,
  actionLabel: string,
  onAction: () => void,
  options?: ExternalToast
) => {
  return toast(message, {
    ...options,
    action: {
      label: actionLabel,
      onClick: onAction,
    },
  });
};

const showCustom = (
  title: string,
  description: string,
  icon?: React.ReactNode,
  options?: ExternalToast
) => {
  return toast(title, {
    ...options,
    description,
    icon,
  });
};

const dismissToast = (toastId?: string | number) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};

export {
  ToastProvider,
  showToast,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showLoading,
  showPromise,
  showAction,
  showCustom,
  dismissToast,
};
