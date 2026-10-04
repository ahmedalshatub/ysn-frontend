import * as yup from "yup";

const translationSchema = yup.object({
  languageCode: yup.string().required(),
  name: yup
    .string()
    .trim()
    .required("errors.CardCategory.NameRequired")
    .min(2, "errors.CardCategory.NameInvalidLength")
    .max(255, "errors.CardCategory.NameInvalidLength"),
});

export const cardCategorySchema = yup.object({
  cityId: yup
    .number()
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? 0 : value))
    .min(1, "errors.CardCategory.CityRequired")
    .required("errors.CardCategory.CityRequired"),
  sortOrder: yup
    .number()
    .transform((value, original) => (original === "" || Number.isNaN(value) ? 0 : value))
    .min(1, "errors.CardCategory.SortOrderInvalid")
    .required(),
  isActive: yup.boolean().required(),
  translations: yup.array().of(translationSchema).length(2, "errors.CardCategory.TwoTranslationsAreRequired").required(),
});

export type CardCategoryFormValues = yup.InferType<typeof cardCategorySchema>;
