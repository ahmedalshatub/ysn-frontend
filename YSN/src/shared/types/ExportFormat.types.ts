export const ExportFormat = {
  Excel: "Excel",
  Pdf: "Pdf",
  Print: "Print",
} as const;

export type ExportFormatType = typeof ExportFormat[keyof typeof ExportFormat];

export interface ExportRequest {
  format?: ExportFormatType;
}
