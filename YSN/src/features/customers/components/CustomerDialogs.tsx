import type { CustomerDialogName } from "../hooks/useCustomerActions";
import { customerFullName, type CustomerListDto, type CustomerRoleValue } from "../types/Customers.types";
import CustomerModal from "./CustomerModal";
import ChangeCustomerStatusAlert from "./ChangeCustomerStatusAlert";
import SetCustomerPasswordModal from "./SetCustomerPasswordModal";
import DeleteCustomerAlert from "./DeleteCustomerAlert";
import RestoreCustomerAlert from "./RestoreCustomerAlert";
import MessagesModal from "../../messages/components/MessagesModal";
import SendMessageModal from "../../messages/components/SendMessageModal";
import CustomerTransactionsModal from "../../transactions/components/CustomerTransactionsModal";
import BalanceChangeModal from "../../transactions/components/BalanceChangeModal";
import { TransactionType } from "../../transactions/types/Transactions.types";
import CardsModal from "../../cards/components/CardsModal";
import CustomerInvoicesModal from "../../invoices/components/CustomerInvoicesModal";
import CustomerDiscountsModal from "../../cardTypeDiscounts/components/CustomerDiscountsModal";
import CustomerTvsModal from "../../tvs/components/tvs/CustomerTvsModal";

interface CustomerDialogsProps {
  dialog: CustomerDialogName | null;
  customer: CustomerListDto | null;
  createType: CustomerRoleValue;
  onClose: () => void;
  onSuccess: () => void;
  onTypeChanged?: (newType: CustomerRoleValue) => void;
}

const CustomerDialogs = ({ dialog, customer, createType, onClose, onSuccess, onTypeChanged }: CustomerDialogsProps) => {
  if (dialog === "form") {
    return (
      <CustomerModal
        open
        customerType={customer?.roleId ?? createType}
        customerId={customer?.id ?? null}
        onClose={onClose}
        onSuccess={onSuccess}
        onTypeChanged={onTypeChanged}
      />
    );
  }

  if (!customer) return null;

  switch (dialog) {
    case "status":
      return <ChangeCustomerStatusAlert open customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "password":
      return <SetCustomerPasswordModal open customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "delete":
      return <DeleteCustomerAlert open customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "messages":
      return <MessagesModal open customer={customer} onClose={onClose} />;
    case "sendMessage":
      return <SendMessageModal open customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "transactions":
      return <CustomerTransactionsModal open customer={customer} onClose={onClose} onChanged={onSuccess} />;
    case "deposit":
      return <BalanceChangeModal open initialType={TransactionType.Deposit} customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "withdraw":
      return <BalanceChangeModal open initialType={TransactionType.Withdraw} customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    case "discounts":
      return <CustomerDiscountsModal open customer={customer} onClose={onClose} />;
    case "invoices":
      return <CustomerInvoicesModal open customer={customer} onClose={onClose} onChanged={onSuccess} />;
    case "cards":
      return <CardsModal open title={customerFullName(customer)} fixedFilter={{ takenBy: customer.id }} onClose={onClose} />;
    case "tvs":
      return <CustomerTvsModal open customer={customer} onClose={onClose} />;
    case "restore":
      return <RestoreCustomerAlert open customer={customer} onClose={onClose} onSuccess={onSuccess} />;
    default:
      return null;
  }
};

export default CustomerDialogs;
