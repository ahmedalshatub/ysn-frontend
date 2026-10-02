import { useTranslation } from "react-i18next";
import Button from "./Button";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import { showError } from "../feedback/Toast";
import { getErrorMessage } from "../../utils/errorHandler";

interface ExportButtonProps {
  onExport: () => Promise<unknown>;
  loading?: boolean;
  label?: string;
}

const ExportButton = ({ onExport, loading = false, label }: ExportButtonProps) => {
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      await onExport();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      label={label ?? t("common.export")}
      onClick={handleClick}
      loading={loading}
      icon={<DownloadIcon className="w-4 h-4" />}
      iconPosition="left"
    />
  );
};

export default ExportButton;
