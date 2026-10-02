export const getStatusFilterOptions = (t: (key: string) => string) => [
  { name: t("common.active"), value: "false" },
  { name: t("common.deleted"), value: "true" },
];

export const getYesNoFilterOptions = (t: (key: string) => string) => [
  { name: t("common.yes"), value: "true" },
  { name: t("common.no"), value: "false" },
];
