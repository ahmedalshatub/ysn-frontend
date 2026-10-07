import { ExportFormat, type ExportFormatType } from "../types/ExportFormat.types";

const timestamp = () => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
};

export const saveBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const PRINT_FRAME_ID = "export-print-frame";

export const printBlob = (blob: Blob) => {
  const previous = document.getElementById(PRINT_FRAME_ID) as HTMLIFrameElement | null;
  if (previous) {
    URL.revokeObjectURL(previous.src);
    previous.remove();
  }
  const url = URL.createObjectURL(blob);
  const frame = document.createElement("iframe");
  frame.id = PRINT_FRAME_ID;
  frame.className = "fixed bottom-0 right-0 w-0 h-0 border-0";
  frame.src = url;
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
  };
  document.body.appendChild(frame);
};

export const exportResponseHandler = (baseName: string, format: ExportFormatType = ExportFormat.Excel) => async (response: Response) => {
  if (!response.ok) {
    return response.json();
  }
  const blob = await response.blob();
  if (format === ExportFormat.Print) {
    printBlob(blob);
  } else {
    saveBlob(blob, `${baseName}_${timestamp()}.${format === ExportFormat.Pdf ? "pdf" : "xlsx"}`);
  }
  return null;
};
