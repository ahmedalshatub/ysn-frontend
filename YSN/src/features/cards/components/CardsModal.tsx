import Modal from "../../../shared/components/modals/Modal";
import CardsView from "./CardsView";
import type { CardFilter } from "../types/Cards.types";

interface CardsModalProps {
  open: boolean;
  title: string;
  fixedFilter: CardFilter;
  onClose: () => void;
}

const CardsModal = ({ open, title, fixedFilter, onClose }: CardsModalProps) => (
  <Modal open={open} onClose={onClose} size="full">
    <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
      <h3 className="form-modal-title text-lg">{title}</h3>
      <CardsView fixedFilter={fixedFilter} />
    </div>
  </Modal>
);

export default CardsModal;
