export const getStatusFilterOptions = (t: (key: string) => string) => [
  { name: t("common.active"), value: "false" },
  { name: t("common.deleted"), value: "true" },
];
