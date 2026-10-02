import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "../../../assets/icons/EditIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import MailIcon from "../../../assets/icons/MailIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import TrendUpIcon from "../../../assets/icons/TrendUpIcon";
import TrendDownIcon from "../../../assets/icons/TrendDownIcon";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import useCustomerPermission from "./useCustomerPermission";
import type { CustomerListDto } from "../types/Customers.types";

export type CustomerDialogName =
  | "form"
  | "status"
  | "password"
  | "delete"
  | "restore"
  | "messages"
  | "sendMessage"
  | "transactions"
  | "deposit"
  | "withdraw";

interface CustomerActionOptions {
  onOpen?: (customer: CustomerListDto) => void;
  onDialog: (name: CustomerDialogName, customer: CustomerListDto) => void;
}

const useCustomerActions = ({ onOpen, onDialog }: CustomerActionOptions) => {
  const { t } = useTranslation();
  const canCustomer = useCustomerPermission();
  const { can: canPermission } = usePermission();

  return useCallback(
    (customer: CustomerListDto): ActionItem[] => {
      const type = customer.userType;
      const can = (action: Parameters<typeof canCustomer>[1]) => canCustomer(type, action);

      if (customer.isDeleted) {
        return can("Restore")
          ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onDialog("restore", customer) }]
          : [];
      }

      return [
        ...(onOpen ? [{ label: t("customers.openDetails"), icon: <EyeIcon />, onClick: () => onOpen(customer) }] : []),
        ...(can("Update") ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onDialog("form", customer) }] : []),
        ...(canPermission(Permission.MessagesView)
          ? [{ label: t("messages.messages"), icon: <MailIcon />, onClick: () => onDialog("messages", customer) }]
          : []),
        ...(canPermission(Permission.MessagesSendToCustomer) && customer.isActive
          ? [{ label: t("messages.sendMessage"), icon: <MailIcon />, onClick: () => onDialog("sendMessage", customer) }]
          : []),
        ...(canPermission(Permission.TransactionsView)
          ? [{ label: t("transactions.pageTitle"), icon: <WalletIcon />, onClick: () => onDialog("transactions", customer) }]
          : []),
        ...(canPermission(Permission.TransactionsDeposit)
          ? [{ label: t("transactionTypes.deposit"), icon: <TrendUpIcon />, onClick: () => onDialog("deposit", customer) }]
          : []),
        ...(canPermission(Permission.TransactionsWithdraw) && customer.balance > 0
          ? [{ label: t("transactionTypes.withdraw"), icon: <TrendDownIcon />, onClick: () => onDialog("withdraw", customer) }]
          : []),
        ...(can("ChangeStatus")
          ? [{
              label: customer.isActive ? t("customers.disable") : t("customers.enable"),
              icon: <RefreshCwIcon />,
              onClick: () => onDialog("status", customer),
            }]
          : []),
        ...(can("ResetPassword")
          ? [{ label: t("customers.setPassword"), icon: <KeyIcon />, onClick: () => onDialog("password", customer) }]
          : []),
        ...(can("Delete") && customer.balance === 0
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDialog("delete", customer) }]
          : []),
      ];
    },
    [t, canCustomer, canPermission, onOpen, onDialog]
  );
};

export default useCustomerActions;
