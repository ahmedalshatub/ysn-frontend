import type { CustomerListDto } from "../../customers/types/Customers.types";
import MessagesList from "./MessagesList";

interface MessagesTabProps {
  customer: CustomerListDto;
}

const MessagesTab = ({ customer }: MessagesTabProps) => <MessagesList recipient={customer} />;

export default MessagesTab;
