import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import readXlsxFile from "read-excel-file/browser";
import FileUpload from "../../../shared/components/inputs/FileUpload";
import Select from "../../../shared/components/inputs/Select";
import { showError } from "../../../shared/components/feedback/Toast";

interface CardsExcelInputProps {
  onRead: (serials: string[]) => void;
}

type SheetRows = { sheet: string; data: unknown[][] };

const CardsExcelInput = ({ onRead }: CardsExcelInputProps) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [sheets, setSheets] = useState<SheetRows[]>([]);
  const [sheetName, setSheetName] = useState("");
  const [column, setColumn] = useState<number | undefined>(undefined);

  const sheet = sheets.find((item) => item.sheet === sheetName);
  const headerOptions = useMemo(
    () => (sheet?.data[0] ?? []).map((header, index) => ({ value: index, name: String(header ?? `#${index + 1}`) })),
    [sheet]
  );

  const readColumn = (rows: SheetRows | undefined, index: number | undefined) => {
    if (!rows || index === undefined) return onRead([]);
    onRead(rows.data.slice(1).map((row) => (row[index] === null || row[index] === undefined ? "" : String(row[index]))));
  };

  const handleFiles = async (selected: File[]) => {
    setFiles(selected);
    setSheets([]);
    setSheetName("");
    setColumn(undefined);
    onRead([]);
    if (!selected[0]) return;

    try {
      const result = (await readXlsxFile(selected[0])) as SheetRows[];
      setSheets(result);
      if (result.length === 1) setSheetName(result[0].sheet);
    } catch {
      showError(t("cards.excelReadFailed"));
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload
        accept={{ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }}
        maxFiles={1}
        value={files}
        onChange={handleFiles}
        onRemove={() => handleFiles([])}
        label={t("cards.excelFile")}
        description={t("cards.excelFileHint")}
      />
      {sheets.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            name="sheet"
            label={t("cards.sheet")}
            value={sheetName}
            onChange={(value) => {
              setSheetName(String(value));
              setColumn(undefined);
              onRead([]);
            }}
            options={sheets.map((item) => ({ value: item.sheet, name: item.sheet }))}
            valueKey="value"
            labelKey="name"
            searchable
            size="md"
          />
          <Select
            name="column"
            label={t("cards.serialColumn")}
            value={column ?? ""}
            onChange={(value) => {
              const index = value === "" ? undefined : Number(value);
              setColumn(index);
              readColumn(sheet, index);
            }}
            options={headerOptions}
            valueKey="value"
            labelKey="name"
            disabled={!sheet}
            searchable
            size="md"
          />
        </div>
      )}
    </div>
  );
};

export default CardsExcelInput;
