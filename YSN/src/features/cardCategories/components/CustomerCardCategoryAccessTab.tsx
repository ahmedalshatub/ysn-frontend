import { useState } from "react";
import { useTranslation } from "react-i18next";
import Switch from "../../../shared/components/buttons/Switch";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import useCustomerPermission from "../../customers/hooks/useCustomerPermission";
import type { CustomerDto } from "../../customers/types/Customers.types";
import { useSetCustomerViewAllCategoriesMutation } from "../api/CardCategories.api";
import CardCategoryAccessTable from "./CardCategoryAccessTable";

interface CustomerCardCategoryAccessTabProps {
  customer: CustomerDto;
  onChanged: () => void;
}

const CustomerCardCategoryAccessTab = ({ customer, onChanged }: CustomerCardCategoryAccessTabProps) => {
  const { t } = useTranslation();
  const canCustomer = useCustomerPermission();
  const canChange = canCustomer(customer.roleId, "ChangeCategoryAccess") && !customer.isDeleted;
  const [refreshKey, setRefreshKey] = useState(0);
  const [setViewAll, { isLoading }] = useSetCustomerViewAllCategoriesMutation();

  const handleViewAll = async (checked: boolean) => {
    try {
      await setViewAll({ id: customer.id, canViewAllCardCategories: checked }).unwrap();
      showSuccess(t("cardCategories.successAccess"));
      setRefreshKey((value) => value + 1);
      onChanged();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-4">
      <div className="profile-surface rounded-lg border p-4">
        <Switch
          checked={customer.canViewAllCardCategories}
          disabled={!canChange || isLoading}
          onChange={handleViewAll}
          label={t("cardCategories.viewAllCities")}
        />
        <p className="form-hint mt-2">{t("cardCategories.viewAllCitiesHint")}</p>
      </div>
      <CardCategoryAccessTable customer={customer} canChange={canChange} refreshKey={refreshKey} />
    </div>
  );
};

export default CustomerCardCategoryAccessTab;
