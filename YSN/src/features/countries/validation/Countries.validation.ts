import * as yup from "yup";

const translationSchema = yup.object({
  languageCode: yup.string().required("errors.Country.LanguageRequired"),
  name: yup
    .string()
    .trim()
    .required("errors.Country.NameRequired")
    .min(2, "errors.Country.NameInvalidLength")
    .max(255, "errors.Country.NameInvalidLength"),
});

export const addCountrySchema = yup.object({
  isoCode: yup
    .string()
    .trim()
    .required("errors.Country.IsoCodeRequired")
    .matches(/^[A-Za-z]{2}$/, "errors.Country.IsoCodeInvalid"),
  phoneCode: yup
    .string()
    .trim()
    .required("errors.Country.PhoneCodeRequired")
    .matches(/^\+[0-9]{1,4}$/, "errors.Country.PhoneCodeInvalid"),
  phoneNumberLength: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value))
    .min(4, "errors.Country.PhoneNumberLengthInvalid")
    .max(15, "errors.Country.PhoneNumberLengthInvalid"),
  isActive: yup.boolean().required(),
  isDefault: yup.boolean().required(),
  translations: yup.array().of(translationSchema).length(2, "errors.Country.TwoTranslationsAreRequired").required(),
});

export const updateCountrySchema = addCountrySchema;

export type CountryFormValues = yup.InferType<typeof addCountrySchema>;
