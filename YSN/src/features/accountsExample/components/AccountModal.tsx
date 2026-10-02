import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormNumberInput from "../../../shared/components/inputs/FormNumberInput";
import Badge from "../../../shared/components/badges/Badge";
import LayersIcon from "../../../assets/icons/LayersIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import { ACCOUNT_TYPES, ACCOUNT_NATURES, defaultNature, getAncestors } from "../types/accountsData";
import type { Account, AccountInput, AccountType, AccountNature } from "../types/accountsData";

interface AccountModalProps {
  open: boolean;
  editingAccount: Account | null;
  parentAccount: Account | null;
  accounts: Account[];
  onClose: () => void;
  onSubmit: (values: AccountInput) => void;
}

const AccountModal = ({
  open,
  editingAccount,
  parentAccount,
  accounts,
  onClose,
  onSubmit,
}: AccountModalProps) => {
  const { t, i18n } = useTranslation();
  const isEdit = editingAccount !== null;
  const isArabic = i18n.language.startsWith("ar");

  const label = (account: Account) => (isArabic ? account.nameAr : account.name);

  const schema = useMemo(
    () =>
      yup.object().shape({
        code: yup
          .string()
          .required(t("common.requiredField"))
          .matches(/^[0-9]+$/, t("accountsExample.codeDigitsOnly"))
          .min(3, t("common.requiredField"))
          .max(10, t("common.requiredField")),
        name: yup.string().required(t("common.requiredField")).max(100, t("common.requiredField")),
        nameAr: yup.string().required(t("common.requiredField")).max(100, t("common.requiredField")),
        type: yup.string().required(t("common.requiredField")),
        nature: yup.string().required(t("common.requiredField")),
        balance: yup
          .number()
          .typeError(t("common.requiredField"))
          .min(0, t("accountsExample.balanceNotNegative"))
          .required(t("common.requiredField")),
        currency: yup.string().required(t("common.requiredField")),
      }),
    [t],
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AccountInput>({
    resolver: yupResolver(schema) as unknown as Resolver<AccountInput>,
    mode: "onTouched",
    defaultValues: {
      code: "",
      name: "",
      nameAr: "",
      type: "asset",
      nature: "debit",
      balance: 0,
      currency: "IQD",
    },
  });

  const selectedType = useWatch({ control, name: "type" });

  useEffect(() => {
    if (!open) return;

    if (isEdit && editingAccount) {
      reset({
        code: editingAccount.code,
        name: editingAccount.name,
        nameAr: editingAccount.nameAr,
        type: editingAccount.type,
        nature: editingAccount.nature,
        balance: editingAccount.balance,
        currency: editingAccount.currency,
      });
      return;
    }

    reset({
      code: "",
      name: "",
      nameAr: "",
      type: parentAccount?.type ?? "asset",
      nature: parentAccount?.nature ?? "debit",
      balance: 0,
      currency: parentAccount?.currency ?? "IQD",
    });
  }, [open, isEdit, editingAccount, parentAccount, reset]);

  useEffect(() => {
    if (!open || isEdit || !selectedType) return;
    setValue("nature", defaultNature(selectedType as AccountType));
  }, [open, isEdit, selectedType, setValue]);

  const typeOptions = ACCOUNT_TYPES.map((type) => ({
    name: t(`accountsExample.types.${type}`),
    value: type,
  }));

  const natureOptions = ACCOUNT_NATURES.map((nature: AccountNature) => ({
    name: t(`accountsExample.natures.${nature}`),
    value: nature,
  }));

  const parentPath = useMemo(() => {
    if (!open) return [];
    const target = isEdit ? editingAccount : parentAccount;
    if (!target) return [];
    const ancestors = getAncestors(accounts, target.id);
    return isEdit ? ancestors : [...ancestors, target];
  }, [open, isEdit, editingAccount, parentAccount, accounts]);

  const title = isEdit
    ? t("accountsExample.editAccount")
    : parentAccount
      ? t("accountsExample.addChildAccount")
      : t("accountsExample.addRootAccount");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      size="lg"
      icon={<LayersIcon className="w-5 h-5" />}
      submitText={isEdit ? t("common.edit") : t("common.save")}
      cancelText={t("common.cancel")}
    >
      <div className="ce-panel rounded-xl border ce-divider px-4 py-3 mb-5">
        <span className="ce-muted block text-xs mb-2">{t("accountsExample.parentAccount")}</span>
        {parentPath.length === 0 ? (
          <Badge variant="info" size="sm" pill label={t("accountsExample.rootLevel")} />
        ) : (
          <div className="flex items-center flex-wrap gap-1.5">
            {parentPath.map((account, index) => (
              <span key={account.id} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRightIcon className="w-3 h-3 ce-muted rtl:rotate-180" />}
                <Badge
                  variant="secondary"
                  size="sm"
                  pill
                  label={`${account.code} - ${label(account)}`}
                />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="code"
          name="code"
          control={control}
          label={t("accountsExample.code")}
          placeholder={t("accountsExample.codePlaceholder")}
          error={!!errors.code}
          errorMessage={errors.code?.message}
        />
        <FormInput
          id="currency"
          name="currency"
          control={control}
          label={t("accountsExample.currency")}
          placeholder="IQD"
          error={!!errors.currency}
          errorMessage={errors.currency?.message}
        />
        <FormInput
          id="name"
          name="name"
          control={control}
          label={t("accountsExample.name")}
          placeholder={t("accountsExample.name")}
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <FormInput
          id="nameAr"
          name="nameAr"
          control={control}
          label={t("accountsExample.nameAr")}
          placeholder={t("accountsExample.nameAr")}
          error={!!errors.nameAr}
          errorMessage={errors.nameAr?.message}
        />
        <FormSelect
          id="type"
          name="type"
          control={control}
          label={t("accountsExample.type")}
          options={typeOptions}
          labelKey="name"
          valueKey="value"
          error={!!errors.type}
          errorMessage={errors.type?.message}
        />
        <FormSelect
          id="nature"
          name="nature"
          control={control}
          label={t("accountsExample.nature")}
          options={natureOptions}
          labelKey="name"
          valueKey="value"
          error={!!errors.nature}
          errorMessage={errors.nature?.message}
        />
        <FormNumberInput
          id="balance"
          name="balance"
          control={control}
          label={t("accountsExample.openingBalance")}
          min={0}
          step={1000}
          error={!!errors.balance}
          errorMessage={errors.balance?.message}
        />
      </div>
    </FormModal>
  );
};

export default AccountModal;
