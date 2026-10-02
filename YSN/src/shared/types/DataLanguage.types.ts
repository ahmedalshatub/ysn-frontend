export const DataLanguage = {
  Arabic: "ar",
  English: "en",
} as const;

export type DataLanguageType = typeof DataLanguage[keyof typeof DataLanguage];
