import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Select from "../../../shared/components/inputs/Select";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import FileImage from "../../../shared/components/media/FileImage";
import SortableEditor from "../../../shared/components/display/SortableEditor";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import PackageIcon from "../../../assets/icons/PackageIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import { useGetCardCategoriesQuery } from "../../cardCategories/api/CardCategories.api";
import { useGetCardTypesQuery, useReorderCardTypesMutation } from "../api/CardTypes.api";

const CardTypesOrderPage = () => {
  const { t } = useTranslation();
  useTitle(t("cardTypes.orderTitle"));
  const [searchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState<number | undefined>(() => Number(searchParams.get("cardCategoryId")) || undefined);

  const { data: categories } = useGetCardCategoriesQuery(
    { isDeleted: false, sortBy: "SortOrder", isAscending: true, pageNumber: 1, pageSize: 100 },
    { refetchOnMountOrArgChange: true }
  );
  const categoryOptions = useMemo(
    () => (categories?.items ?? []).map((category) => ({ value: category.id, name: `${category.name} - ${category.cityName ?? ""}` })),
    [categories]
  );
  const selectedCategoryId = categoryId ?? categories?.items[0]?.id;

  const { data, isFetching, refetch } = useGetCardTypesQuery(
    { cardCategoryId: selectedCategoryId, isDeleted: false, sortBy: "SortOrder", isAscending: true, pageNumber: 1, pageSize: 100 },
    { skip: !selectedCategoryId, refetchOnMountOrArgChange: true }
  );
  const [reorder, { isLoading: saving }] = useReorderCardTypesMutation();
  const items = data?.items ?? [];

  const save = async (ids: number[]) => {
    if (!selectedCategoryId) return;
    try {
      await reorder({ cardCategoryId: selectedCategoryId, ids }).unwrap();
      showSuccess(t("cardTypes.successReorder"));
      refetch();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("cardTypes.orderTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.cards") }, { label: t("cardTypes.pageTitle") }, { label: t("common.order") }]}
        variant="gradient"
        icon={<PackageIcon />}
        animated
      />
      <Card variant="elevated" padding="md">
        <div className="max-w-md">
          <Select
            name="cardCategoryId"
            label={t("cardTypes.category")}
            value={selectedCategoryId ?? ""}
            onChange={(value) => setCategoryId(Number(value) || undefined)}
            options={categoryOptions}
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
            key={`${selectedCategoryId}-${items.map((item) => item.id).join(",")}`}
            initialItems={items}
            rowKey={(cardType) => cardType.id}
            saving={saving}
            onSave={save}
            renderItem={(cardType) => (
              <div className="flex items-center gap-3">
                <span className="table-thumbnail">
                  <FileImage path={cardType.imageUrl} alt={cardType.name} className="h-full w-full object-contain" fallback={<ImageIcon className="h-5 w-5" />} />
                </span>
                <span className="font-medium">{cardType.name}</span>
                {!cardType.isActive && <Badge label={t("common.inactive")} variant="secondary" size="sm" />}
              </div>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default CardTypesOrderPage;
