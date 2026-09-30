import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/inputs/Input";
import TextArea from "../../../shared/components/inputs/TextArea";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import StepHeading from "./StepHeading";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import type { CustomerNote } from "../types/Stepper.types";

interface CustomerNotesStepProps {
  notes: CustomerNote[];
  onNotesChange: (notes: CustomerNote[]) => void;
}

const CustomerNotesStep = ({ notes, onNotesChange }: CustomerNotesStepProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) {
      showError(t("stepperExample.fillNoteFields"));
      return;
    }

    onNotesChange([...notes, { id: Date.now(), title: title.trim(), content: content.trim() }]);
    setTitle("");
    setContent("");
    showSuccess(t("stepperExample.noteAdded"));
  };

  const handleDeleteNote = (id: number) => {
    onNotesChange(notes.filter((note) => note.id !== id));
    showSuccess(t("stepperExample.noteRemoved"));
  };

  return (
    <div>
      <StepHeading
        title={t("stepperExample.step3Title")}
        description={t("stepperExample.step3Description")}
        icon={<FileTextIcon className="w-5 h-5" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Input
            label={t("stepperExample.noteName")}
            placeholder={t("stepperExample.noteName")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            label={t("stepperExample.noteContent")}
            placeholder={t("stepperExample.noteContent")}
            rows={5}
            resize="none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="primary"
            size="md"
            block
            label={t("stepperExample.addNote")}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            onClick={handleAddNote}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <span className="ce-heading text-sm font-medium">{t("stepperExample.notesList")}</span>
            <Badge
              variant={notes.length ? "primary" : "secondary"}
              size="sm"
              pill
              label={String(notes.length)}
            />
          </div>

          {notes.length === 0 ? (
            <div className="ce-panel rounded-xl border ce-divider px-4 py-10 text-center">
              <FileTextIcon className="w-8 h-8 mx-auto mb-2 ce-muted" />
              <p className="ce-muted text-sm">{t("stepperExample.noNotes")}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="ce-panel rounded-xl border ce-divider p-4 flex items-start gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="ce-panel-heading text-sm font-semibold break-words">{note.title}</p>
                    <p className="ce-panel-text text-sm mt-1 whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    outline
                    size="sm"
                    iconOnly
                    icon={<TrashIcon className="w-4 h-4" />}
                    tooltip={t("common.delete")}
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerNotesStep;
