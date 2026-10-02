import { useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "../../../shared/components/media/Avatar";
import Button from "../../../shared/components/buttons/Button";
import TextArea from "../../../shared/components/inputs/TextArea";
import ImageViewer from "../../../shared/components/media/ImageViewer";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import type { TicketComment } from "../types/ticketData";
import { formatDateTime } from "../types/ticketUtils";

interface CommentsTabProps {
  comments: TicketComment[];
}

const CommentsTab = ({ comments }: CommentsTabProps) => {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      showError(t("ticketExample.emptyComment"));
      return;
    }
    showSuccess(t("ticketExample.commentAdded"));
    setNewComment("");
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="ce-muted text-sm">{t("ticketExample.noComments")}</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="ce-panel rounded-xl border ce-divider p-4 flex items-start gap-3"
            >
              <Avatar
                src={comment.userAvatar}
                name={comment.userName}
                size="sm"
                variant="primary"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="ce-panel-heading text-sm font-semibold">
                    {comment.userName}
                  </span>
                  <span className="ce-muted text-xs">{formatDateTime(comment.createdAt)}</span>
                </div>
                <p className="ce-panel-text text-sm mt-1 break-words">{comment.content}</p>
                {comment.imageUrl && (
                  <div className="mt-3 max-w-sm">
                    <ImageViewer src={comment.imageUrl} alt={comment.userName} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pt-4 border-t ce-divider space-y-3">
        <TextArea
          label={t("ticketExample.addComment")}
          placeholder={t("ticketExample.commentPlaceholder")}
          rows={3}
          resize="none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            label={t("common.send")}
            onClick={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;
