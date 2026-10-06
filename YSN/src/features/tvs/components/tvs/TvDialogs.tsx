import type { CustomerTvListDto, TvActionName } from "../../types/Tvs.types";
import TvDetailsModal from "./TvDetailsModal";
import EditCustomerTvModal from "./EditCustomerTvModal";
import RemoveCustomerTvAlert from "./RemoveCustomerTvAlert";
import ActivateTvModal from "../tvActivations/ActivateTvModal";

interface TvDialogsProps {
  dialog: TvActionName | null;
  tv: CustomerTvListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const TvDialogs = ({ dialog, tv, onClose, onSuccess }: TvDialogsProps) => {
  if (!tv) return null;

  switch (dialog) {
    case "view":
      return <TvDetailsModal open customerTvId={tv.id} onClose={onClose} />;
    case "activate":
      return <ActivateTvModal open tv={tv} onClose={onClose} onSuccess={onSuccess} />;
    case "edit":
      return <EditCustomerTvModal open tv={tv} onClose={onClose} onSuccess={onSuccess} />;
    case "remove":
      return <RemoveCustomerTvAlert open tv={tv} onClose={onClose} onSuccess={onSuccess} />;
    default:
      return null;
  }
};

export default TvDialogs;
