import { useTranslation } from "react-i18next";
import Modal from "../../../../shared/components/modals/Modal";
import Loader from "../../../../shared/components/feedback/Loader";
import { useGetTvQuery } from "../../api/Tvs.api";
import TvDetailsInfo from "./TvDetailsInfo";
import TvOtherCustomers from "./TvOtherCustomers";
import TvActivationsView from "../tvActivations/TvActivationsView";

interface TvDetailsModalProps {
  open: boolean;
  customerTvId: number;
  onClose: () => void;
}

const TvDetailsModal = ({ open, customerTvId, onClose }: TvDetailsModalProps) => {
  const { t } = useTranslation();
  const { data: tv, isLoading } = useGetTvQuery(customerTvId, { refetchOnMountOrArgChange: true });

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{tv ? t("tvs.tvTitle", { number: tv.tvNumber }) : t("tvs.tv")}</h3>
        {isLoading || !tv ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            <TvDetailsInfo tv={tv} />
            <TvOtherCustomers customers={tv.otherCustomers} />
            <div className="space-y-3">
              <h4 className="list-header-title">{t("tvActivations.pageTitle")}</h4>
              <TvActivationsView fixedFilter={{ tvId: tv.tvId }} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TvDetailsModal;
