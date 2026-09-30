export interface AppLanguage {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  label: string;
}

// To add a language run: npm run add-language
// Keep the closing "];" on its own line - the script anchors on it.
export const LANGUAGES: AppLanguage[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", label: "EN" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", label: "AR" },
];

export const DEFAULT_LANGUAGE = "ar";

export const LANGUAGE_CODES = LANGUAGES.map((language) => language.code);

export const getLanguage = (code?: string | null): AppLanguage =>
  LANGUAGES.find((language) => language.code === code) ??
  LANGUAGES.find((language) => language.code === DEFAULT_LANGUAGE) ??
  LANGUAGES[0];

export const getDirection = (code?: string | null): "ltr" | "rtl" => getLanguage(code).dir;

export const isRtl = (code?: string | null): boolean => getDirection(code) === "rtl";
