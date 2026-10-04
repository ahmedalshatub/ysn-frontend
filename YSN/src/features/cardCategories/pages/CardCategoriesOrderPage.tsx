import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import useMyCities from "../../../shared/hooks/useMyCities";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Select from "../../../shared/components/inputs/Select";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import FileImage from "../../../shared/components/media/FileImage";
import SortableEditor from "../../../shared/components/display/SortableEditor";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import LayersIcon from "../../../assets/icons/LayersIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import { useGetCardCategoriesQuery, useReorderCardCategoriesMutation } from "../api/CardCategories.api";

const CardCategoriesOrderPage = () => {
  const { t } = useTranslation();
  useTitle(t("cardCategories.orderTitle"));
  const [searchParams] = useSearchParams();
  const { cities, singleCityId } = useMyCities();
  const [cityId, setCityId] = useState<number | undefined>(() => Number(searchParams.get("cityId")) || singleCityId || undefined);
  const selectedCityId = cityId ?? singleCityId ?? cities[0]?.id;

  const { data, isFetching, refetch } = useGetCardCategoriesQuery(
    { cityId: selectedCityId, isDeleted: false, sortBy: "SortOrder", isAscending: true, pageNumber: 1, pageSize: 100 },
    { skip: !selectedCityId, refetchOnMountOrArgChange: true }
  );
  const [reorder, { isLoading: saving }] = useReorderCardCategoriesMutation();
  const items = data?.items ?? [];

  const save = async (ids: number[]) => {
    if (!selectedCityId) return;
    try {
      await reorder({ cityId: selectedCityId, ids }).unwrap();
      showSuccess(t("cardCategories.successReorder"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("cardCategories.orderTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.cards") }, { label: t("cardCategories.pageTitle") }, { label: t("common.order") }]}
        variant="gradient"
        icon={<LayersIcon />}
        animated
      />
      <Card variant="elevated" padding="md">
        <div className="max-w-sm">
          <Select
            name="cityId"
            label={t("cardCategories.city")}
            value={selectedCityId ?? ""}
            onChange={(value) => setCityId(Number(value) || undefined)}
            options={cities.map((city) => ({ value: city.id, name: city.name }))}
            valueKey="value"
            labelKey="name"
            searchable
            size="md"
          />
        </div>
      </Card>
      <Card variant="elevated" padding="md">
        <p className="mb-4 text-sm ce-muted">{t("common.dragToReorderHint")}</p>
        {isFetching ? (
          <div className="flex justify-center py-12">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <SortableEditor
            key={`${selectedCityId}-${items.map((item) => item.id).join(",")}`}
            initialItems={items}
            rowKey={(category) => category.id}
            saving={saving}
            onSave={save}
            renderItem={(category) => (
              <div className="flex items-center gap-3">
                <span className="table-thumbnail">
                  <FileImage path={category.imageUrl} alt={category.name} className="h-full w-full object-contain" fallback={<ImageIcon className="h-5 w-5" />} />
                </span>
                <span className="font-medium">{category.name}</span>
                {!category.isActive && <Badge label={t("common.inactive")} variant="secondary" size="sm" />}
              </div>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default CardCategoriesOrderPage;
