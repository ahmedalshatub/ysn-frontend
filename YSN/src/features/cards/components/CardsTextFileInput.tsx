import { useState } from "react";
import { useTranslation } from "react-i18next";
import FileUpload from "../../../shared/components/inputs/FileUpload";

interface CardsTextFileInputProps {
  onRead: (serials: string[]) => void;
}

const CardsTextFileInput = ({ onRead }: CardsTextFileInputProps) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = async (selected: File[]) => {
    setFiles(selected);
    const file = selected[0];
    onRead(file ? (await file.text()).split(/\r?\n/) : []);
  };

  return (
    <FileUpload
      accept={{ "text/plain": [".txt"] }}
      maxFiles={1}
      value={files}
      onChange={handleChange}
      onRemove={() => handleChange([])}
      label={t("cards.textFile")}
      description={t("cards.textFileHint")}
    />
  );
};

export default CardsTextFileInput;
