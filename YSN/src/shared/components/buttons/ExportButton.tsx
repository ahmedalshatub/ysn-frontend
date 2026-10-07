import { useTranslation } from "react-i18next";
import Button from "./Button";
import Dropdown from "../navigation/Dropdown";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SpreadsheetIcon from "../../../assets/icons/SpreadsheetIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import { showError } from "../feedback/Toast";
import { getErrorMessage } from "../../utils/errorHandler";
import { ExportFormat, type ExportFormatType } from "../../types/ExportFormat.types";

interface ExportButtonProps {
  onExport: (format: ExportFormatType) => Promise<unknown>;
  loading?: boolean;
  label?: string;
}

const ExportButton = ({ onExport, loading = false, label }: ExportButtonProps) => {
  const { t } = useTranslation();

  const handleSelect = async (key: string) => {
    try {
      await onExport(key as ExportFormatType);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <Dropdown
      placement="bottom-end"
      trigger={
        <Button
          variant="secondary"
          size="md"
          label={label ?? t("common.export")}
          loading={loading}
          icon={<ChevronDownIcon className="w-4 h-4" />}
          iconPosition="right"
        />
      }
      items={[
        { key: ExportFormat.Excel, label: t("common.exportExcel"), icon: <SpreadsheetIcon /> },
        { key: ExportFormat.Pdf, label: t("common.exportPdf"), icon: <FileTextIcon /> },
        { key: ExportFormat.Print, label: t("common.print"), icon: <PrinterIcon /> },
      ]}
      onSelect={handleSelect}
    />
  );
};

export default ExportButton;
