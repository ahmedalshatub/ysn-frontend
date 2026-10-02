import * as yup from "yup";

const translationSchema = yup.object({
  languageCode: yup.string().required("errors.Role.LanguageRequired"),
  name: yup
    .string()
    .trim()
    .required("errors.Role.NameRequired")
    .min(2, "errors.Role.NameInvalidLength")
    .max(100, "errors.Role.NameInvalidLength"),
  description: yup.string().trim().max(500, "errors.Role.DescriptionTooLong").default(""),
});

export const roleSchema = yup.object({
  isActive: yup.boolean().required(),
  translations: yup.array().of(translationSchema).length(2, "errors.Role.TwoTranslationsAreRequired").required(),
  permissionIds: yup.array().of(yup.number().required()).min(1, "errors.Role.PermissionsRequired").required(),
});

export type RoleFormValues = yup.InferType<typeof roleSchema>;
