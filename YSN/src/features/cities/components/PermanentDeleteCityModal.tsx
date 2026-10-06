import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormSection from "../../../shared/components/forms/FormSection";
import Select from "../../../shared/components/inputs/Select";
import Message from "../../../shared/components/feedback/Message";
import Loader from "../../../shared/components/feedback/Loader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import TrashIcon from "../../../assets/icons/TrashIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import { useGetCitiesQuery, useGetCityLinksQuery, usePermanentDeleteCityMutation } from "../api/Cities.api";
import CityLinkActionField from "./CityLinkActionField";
import { CityLinkAction, type CityLinkActionValue, type CityListDto } from "../types/Cities.types";

interface PermanentDeleteCityModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  city: CityListDto;
}

const PermanentDeleteCityModal = ({ open, onClose, onSuccess, city }: PermanentDeleteCityModalProps) => {
  const { t } = useTranslation();
  const { data: links, isLoading: loadingLinks } = useGetCityLinksQuery(city.id, { refetchOnMountOrArgChange: true });
  const { data: cities } = useGetCitiesQuery({ isDeleted: false, sortBy: "sortOrder", isAscending: true, pageNumber: 1, pageSize: 100 });
  const [permanentDelete, { isLoading }] = usePermanentDeleteCityMutation();
  const [targetCityId, setTargetCityId] = useState<number | undefined>(undefined);
  const [customersAction, setCustomersAction] = useState<CityLinkActionValue>(CityLinkAction.Move);
  const [cardCategoriesAction, setCardCategoriesAction] = useState<CityLinkActionValue>(CityLinkAction.Move);
  const [employeesAction, setEmployeesAction] = useState<CityLinkActionValue>(CityLinkAction.Move);
  const [targetError, setTargetError] = useState("");

  const targetOptions = useMemo(
    () => (cities?.items ?? []).filter((item) => item.id !== city.id).map((item) => ({ value: item.id, name: item.name })),
    [cities, city.id]
  );

  const hasCustomers = (links?.customersCount ?? 0) + (links?.deletedCustomersCount ?? 0) > 0;
  const hasCategories = (links?.cardCategoriesCount ?? 0) + (links?.deletedCardCategoriesCount ?? 0) > 0;
  const hasEmployees = (links?.employeesCount ?? 0) > 0;
  const needsTarget = hasCustomers || hasCategories || (hasEmployees && employeesAction === CityLinkAction.Move);
  const deletesCustomersWithBalance = customersAction === CityLinkAction.Delete && (links?.customersWithBalanceCount ?? 0) > 0;

  const handleSubmit = async () => {
    if (needsTarget && !targetCityId) {
      setTargetError(t("errors.Cities.TargetRequired"));
      return;
    }
    try {
      const result = await permanentDelete({
        id: city.id,
        targetCityId: needsTarget ? targetCityId : undefined,
        customersAction,
        cardCategoriesAction,
        employeesAction,
      }).unwrap();
      showSuccess(
        t("cities.successPermanentDelete", {
          name: city.name,
          customers: result.customersMoved + result.customersDeleted,
          categories: result.cardCategoriesMoved + result.cardCategoriesDeleted,
          employees: result.employeesMoved + result.employeesRemoved,
        })
      );
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("cities.permanentDeleteTitle", { name: city.name })}
      submitText={t("cities.permanentDelete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<TrashIcon className="h-6 w-6" />}
    >
      {loadingLinks || !links ? (
        <div className="flex justify-center py-10">
          <Loader variant="spinner" size="lg" />
        </div>
      ) : (
        <div className="space-y-8">
          <Message variant="warning">{t("cities.permanentDeleteWarning", { name: city.name })}</Message>
          {(links.tvsCount ?? 0) > 0 && <Message variant="danger">{t("cities.hasTvs", { count: links.tvsCount })}</Message>}
          {needsTarget && (
            <FormSection icon={<MapPinIcon />} title={t("cities.targetCity")}>
              <Select
                name="targetCityId"
                label={`${t("cities.targetCity")} *`}
                value={targetCityId ?? ""}
                onChange={(value) => {
                  setTargetCityId(value === "" ? undefined : Number(value));
                  setTargetError("");
                }}
                options={targetOptions}
                valueKey="value"
                labelKey="name"
                placeholder={t("cities.chooseTargetCity")}
                searchable
                error={!!targetError}
                errorMessage={targetError}
                size="md"
              />
            </FormSection>
          )}
          {hasCustomers && (
            <FormSection icon={<UsersIcon />} title={t("cities.linkedCustomers", { count: links.customersCount, deleted: links.deletedCustomersCount })}>
              <CityLinkActionField
                name="customersAction"
                value={customersAction}
                onChange={setCustomersAction}
                moveDescription={t("cities.customersMoveHint")}
                deleteDescription={t("cities.customersDeleteHint")}
              />
              {deletesCustomersWithBalance && (
                <Message variant="danger">{t("cities.customersHaveBalance", { count: links.customersWithBalanceCount })}</Message>
              )}
            </FormSection>
          )}
          {hasCategories && (
            <FormSection
              icon={<LayersIcon />}
              title={t("cities.linkedCardCategories", { count: links.cardCategoriesCount, types: links.cardTypesCount, deleted: links.deletedCardCategoriesCount })}
            >
              <CityLinkActionField
                name="cardCategoriesAction"
                value={cardCategoriesAction}
                onChange={setCardCategoriesAction}
                moveDescription={t("cities.cardCategoriesMoveHint")}
                deleteDescription={t("cities.cardCategoriesDeleteHint")}
              />
            </FormSection>
          )}
          {hasEmployees && (
            <FormSection icon={<UserIcon />} title={t("cities.linkedEmployees", { count: links.employeesCount })}>
              <CityLinkActionField
                name="employeesAction"
                value={employeesAction}
                onChange={setEmployeesAction}
                moveDescription={t("cities.employeesMoveHint")}
                deleteDescription={t("cities.employeesDeleteHint")}
              />
            </FormSection>
          )}
          {!hasCustomers && !hasCategories && !hasEmployees && <Message variant="info">{t("cities.nothingLinked")}</Message>}
        </div>
      )}
    </FormModal>
  );
};

export default PermanentDeleteCityModal;
