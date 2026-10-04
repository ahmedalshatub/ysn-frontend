import type { ReactNode } from "react";

interface DetailItemProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="detail-item">
    <span className="detail-item-icon">{icon}</span>
    <div className="min-w-0 flex-1">
      <span className="detail-item-label">{label}</span>
      <div className="detail-item-value">{value}</div>
    </div>
  </div>
);

export default DetailItem;
