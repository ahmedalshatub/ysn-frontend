import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, getDirection, LANGUAGE_CODES } from "./languages";

// Locale files are discovered automatically, so adding a language means adding
// a file plus an entry in languages.ts - this file never needs editing.
// import.meta.glob with eager:true is resolved by Vite at build time, so the
// locales stay statically bundled and nothing is fetched at runtime.
const modules = import.meta.glob<{ default: { translation: Record<string, unknown> } }>(
  "./locales/*.ts",
  { eager: true },
);

const resources = Object.entries(modules).reduce<
  Record<string, { translation: Record<string, unknown> }>
>((acc, [filePath, module]) => {
  const code = filePath.split("/").pop()?.replace(/\.ts$/, "");
  if (code && module?.default) acc[code] = module.default;
  return acc;
}, {});

const stored = localStorage.getItem("language");
const savedLanguage = stored && LANGUAGE_CODES.includes(stored) ? stored : DEFAULT_LANGUAGE;

const applyDocumentLanguage = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = getDirection(lng);
  document.title = i18n.t("common.appName", { lng });
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGE_CODES,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  applyDocumentLanguage(lng);
});

applyDocumentLanguage(savedLanguage);

export default i18n;
