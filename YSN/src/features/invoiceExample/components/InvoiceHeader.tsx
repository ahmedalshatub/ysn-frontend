import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import Button from "../../../shared/components/buttons/Button";
import UsersIcon from "../../../assets/icons/UsersIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import RefreshCcwIcon from "../../../assets/icons/RefreshCcwIcon";
import type { Client } from "../types/invoiceData";

interface InvoiceHeaderProps {
  clients: Client[];
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  paymentType: string;
  invoiceDate: string;
  onClientNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPaymentTypeChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSave: () => void;
  onSaveAndPrint: () => void;
  onClear: () => void;
}

const InvoiceHeader = ({
  clients,
  clientName,
  clientPhone,
  clientAddress,
  paymentType,
  invoiceDate,
  onClientNameChange,
  onPhoneChange,
  onAddressChange,
  onPaymentTypeChange,
  onDateChange,
  onSave,
  onSaveAndPrint,
  onClear,
}: InvoiceHeaderProps) => {
  const { t } = useTranslation();

  const paymentOptions = [
    { name: t("invoiceExample.cash"), value: "cash" },
    { name: t("invoiceExample.credit"), value: "credit" },
  ];

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("invoiceExample.pageTitle")}
      icon={<UsersIcon className="w-4 h-4" />}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            label={t("invoiceExample.save")}
            icon={<CheckIcon className="w-4 h-4" />}
            iconPosition="left"
            onClick={onSave}
          />
          <Button
            variant="success"
            size="sm"
            label={t("invoiceExample.saveAndPrint")}
            icon={<ClipboardIcon className="w-4 h-4" />}
            iconPosition="left"
            onClick={onSaveAndPrint}
          />
          <Button
            variant="danger"
            outline
            size="sm"
            label={t("common.clear")}
            icon={<RefreshCcwIcon className="w-4 h-4" />}
            iconPosition="left"
            onClick={onClear}
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Input
          id="client-name"
          label={t("invoiceExample.clientName")}
          placeholder={t("invoiceExample.searchOrAddClient")}
          value={clientName}
          dataList={clients.map((client) => client.name)}
          onChange={(e) => onClientNameChange(e.target.value)}
        />
        <Input
          label={t("common.phone")}
          placeholder={t("common.phone")}
          value={clientPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
        <Input
          label={t("common.address")}
          placeholder={t("common.address")}
          value={clientAddress}
          onChange={(e) => onAddressChange(e.target.value)}
        />
        <Select
          label={t("invoiceExample.paymentType")}
          placeholder={t("invoiceExample.paymentType")}
          options={paymentOptions}
          labelKey="name"
          valueKey="value"
          value={paymentType}
          onChange={(value) => onPaymentTypeChange(String(value))}
        />
        <DatePicker
          label={t("invoiceExample.invoiceDate")}
          value={invoiceDate}
          onChange={onDateChange}
        />
      </div>
    </Card>
  );
};

export default InvoiceHeader;
