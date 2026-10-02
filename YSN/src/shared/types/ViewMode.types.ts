export const ViewMode = {
  Cards: "cards",
  Table: "table",
} as const;

export type ViewModeType = typeof ViewMode[keyof typeof ViewMode];
