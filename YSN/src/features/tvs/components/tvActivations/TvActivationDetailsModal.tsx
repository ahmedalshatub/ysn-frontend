import { useTranslation } from "react-i18next";
import Modal from "../../../../shared/components/modals/Modal";
import Loader from "../../../../shared/components/feedback/Loader";
import DetailItem from "../../../../shared/components/cards/DetailItem";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import UserIcon from "../../../../assets/icons/UserIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import ServerIcon from "../../../../assets/icons/ServerIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import FileTextIcon from "../../../../assets/icons/FileTextIcon";
import { tvActivationChannelKeys } from "../../types/TvActivations.types";
import { useGetTvActivationQuery } from "../../api/TvActivations.api";
import TvActivationSummary from "./TvActivationSummary";

interface TvActivationDetailsModalProps {
  open: boolean;
  activationId: number;
  onClose: () => void;
}

const TvActivationDetailsModal = ({ open, activationId, onClose }: TvActivationDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: activation, isLoading } = useGetTvActivationQuery(activationId, { refetchOnMountOrArgChange: true });

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("tvActivations.activationTitle", { id: activationId })}</h3>
        {isLoading || !activation ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <TvActivationSummary activation={activation} />
            <div className="detail-grid detail-grid-compact">
              <DetailItem icon={<UserIcon />} label={t("tvActivations.creator")} value={activation.creator || "-"} />
              <DetailItem
                icon={<InfoIcon />}
                label={t("tvActivations.channel")}
                value={t(tvActivationChannelKeys[activation.channel] ?? "")}
              />
              <DetailItem icon={<ServerIcon />} label={t("tvActivations.providerStatusCode")} value={activation.providerStatusCode ?? "-"} />
              {activation.resolvedBy && (
                <>
                  <DetailItem icon={<CheckCircleIcon />} label={t("tvActivations.resolvedBy")} value={activation.resolvedByName || "-"} />
                  <DetailItem icon={<FileTextIcon />} label={t("tvActivations.resolveNote")} value={activation.resolveNote || "-"} />
                </>
              )}
              {activation.completedAt && (
                <DetailItem
                  icon={<CheckCircleIcon />}
                  label={t("tvActivations.completedAt")}
                  value={formatDate(activation.completedAt, { locale: i18n.language, includeTime: true })}
                />
              )}
            </div>
            <div className="space-y-2">
              <h4 className="list-header-title">{t("tvActivations.providerResponse")}</h4>
              <p dir="ltr" className="whitespace-pre-wrap break-all font-mono text-xs ce-muted">
                {activation.providerResponse || "-"}
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TvActivationDetailsModal;
