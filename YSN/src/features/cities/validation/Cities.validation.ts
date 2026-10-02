import * as yup from "yup";

const translationSchema = yup.object({
  languageCode: yup.string().required("errors.City.LanguageRequired"),
  name: yup
    .string()
    .trim()
    .required("errors.City.NameRequired")
    .min(2, "errors.City.NameInvalidLength")
    .max(255, "errors.City.NameInvalidLength"),
});

export const addCitySchema = yup.object({
  sortOrder: yup
    .number()
    .typeError("errors.City.SortOrderInvalid")
    .required("errors.City.SortOrderInvalid")
    .min(0, "errors.City.SortOrderInvalid"),
  isActive: yup.boolean().required(),
  translations: yup.array().of(translationSchema).length(2, "errors.City.TwoTranslationsAreRequired").required(),
});

export const updateCitySchema = addCitySchema;

export type CityFormValues = yup.InferType<typeof addCitySchema>;
