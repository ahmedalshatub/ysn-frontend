import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import WalletIcon from "../../../assets/icons/WalletIcon";
import CustomerSearchSelect from "../../customers/components/CustomerSearchSelect";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import { useAddTransactionMutation } from "../api/Transactions.api";
import { balanceChangeSchema, type BalanceChangeFormValues } from "../validation/Transactions.validation";
import { TransactionType } from "../types/Transactions.types";
import FormSection from "../../../shared/components/forms/FormSection";
import UserIcon from "../../../assets/icons/UserIcon";
import ArrowUpDownIcon from "../../../assets/icons/ArrowUpDownIcon";
import Select from "../../../shared/components/inputs/Select";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";

type BalanceChangeType = typeof TransactionType.Deposit | typeof TransactionType.Withdraw;

interface BalanceChangeModalProps {
  open: boolean;
  initialType?: BalanceChangeType;
  customer?: CustomerListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const BalanceChangeModal = ({ open, initialType, customer, onClose, onSuccess }: BalanceChangeModalProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const typeOptions = [
    ...(can(Permission.TransactionsDeposit) ? [{ value: TransactionType.Deposit, name: t("transactionTypes.deposit") }] : []),
    ...(can(Permission.TransactionsWithdraw) ? [{ value: TransactionType.Withdraw, name: t("transactionTypes.withdraw") }] : []),
  ];
  const [type, setType] = useState<BalanceChangeType>(initialType ?? (typeOptions[0]?.value as BalanceChangeType) ?? TransactionType.Deposit);
  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const isWithdraw = type === TransactionType.Withdraw;
  const maxAmount = isWithdraw && customer ? customer.balance : undefined;

  const schema = useMemo(() => balanceChangeSchema(maxAmount), [maxAmount]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BalanceChangeFormValues>({
    resolver: yupResolver(schema) as never,
    mode: "onBlur",
    defaultValues: { customerId: customer?.id ?? 0, amount: undefined, description: "" },
  });

  const onSubmit = async (values: BalanceChangeFormValues) => {
    try {
      await addTransaction({
        type,
        customerId: Number(values.customerId),
        amount: Number(values.amount),
        description: values.description?.trim() ?? "",
      }).unwrap();
      showSuccess(t(isWithdraw ? "transactions.successWithdraw" : "transactions.successDeposit"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("transactions.addTransaction")}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<WalletIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<ArrowUpDownIcon />} title={t("transactions.type")}>
          <Select
            name="type"
            label={`${t("transactions.type")} *`}
            value={type}
            onChange={(value) => setType(Number(value) as BalanceChangeType)}
            options={typeOptions}
            valueKey="value"
            labelKey="name"
            size="md"
          />
        </FormSection>
        <FormSection icon={<UserIcon />} title={t("transactions.customer")}>
          <CustomerSearchSelect<BalanceChangeFormValues>
            name="customerId"
            control={control}
            label={`${t("transactions.customer")} *`}
            initialCustomer={customer}
            error={!!errors.customerId}
            errorMessage={fieldError(errors.customerId?.message)}
          />
          {customer && (
            <Message variant="info">
              {t(isWithdraw ? "transactions.maxWithdraw" : "transactions.currentBalanceIs", { amount: formatCurrency(customer.balance) })}
            </Message>
          )}
        </FormSection>
        <FormSection icon={<WalletIcon />} title={t("transactions.amount")}>
          <FormInput<BalanceChangeFormValues>
            name="amount"
            type="number"
            control={control}
            label={`${t("transactions.amount")} *`}
            error={!!errors.amount}
            errorMessage={fieldError(errors.amount?.message)}
          />
          <FormTextArea<BalanceChangeFormValues>
            name="description"
            control={control}
            label={t("transactions.description")}
            rows={3}
            error={!!errors.description}
            errorMessage={fieldError(errors.description?.message)}
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default BalanceChangeModal;
