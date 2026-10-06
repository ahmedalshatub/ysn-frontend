import type { CustomerListDto } from "../../../customers/types/Customers.types";
import TvsView from "./TvsView";

interface CustomerTvsTabProps {
  customer: CustomerListDto;
}

const CustomerTvsTab = ({ customer }: CustomerTvsTabProps) => <TvsView customer={customer} />;

export default CustomerTvsTab;
