import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { translateProviderMessage } from "../utils/providerMessage";

const useProviderMessage = () => {
  const { i18n } = useTranslation();
  return useCallback((message?: string | null) => translateProviderMessage(i18n, message), [i18n]);
};

export default useProviderMessage;
