import * as yup from "yup";

export const userSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("errors.User.FirstNameRequired")
    .min(2, "errors.User.FirstNameInvalidLength")
    .max(100, "errors.User.FirstNameInvalidLength"),
  lastName: yup
    .string()
    .trim()
    .required("errors.User.LastNameRequired")
    .min(2, "errors.User.LastNameInvalidLength")
    .max(100, "errors.User.LastNameInvalidLength"),
  email: yup
    .string()
    .trim()
    .required("errors.User.EmailRequired")
    .email("errors.User.EmailInvalid")
    .max(255, "errors.User.EmailInvalid"),
  phoneNumber: yup
    .string()
    .trim()
    .default("")
    .matches(/^[0-9]{4,15}$/, { message: "errors.User.PhoneNumberInvalid", excludeEmptyString: true }),
  countryId: yup
    .number()
    .nullable()
    .default(null)
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value))
    .when("phoneNumber", {
      is: (phoneNumber: string) => !!phoneNumber,
      then: (schema) => schema.required("errors.User.CountryRequired"),
    }),
  roleId: yup
    .number()
    .transform((value, original) => (original === "" || Number.isNaN(value) ? 0 : value))
    .min(1, "errors.User.RoleRequired")
    .required("errors.User.RoleRequired"),
  hasAllCities: yup.boolean().required(),
  cityIds: yup
    .array()
    .of(yup.number().required())
    .default([])
    .when("hasAllCities", {
      is: false,
      then: (schema) => schema.min(1, "errors.User.CitiesRequired"),
    }),
  isActive: yup.boolean().required(),
});

export type UserFormValues = yup.InferType<typeof userSchema>;

export const profileSchema = yup.object({
  firstName: userSchema.fields.firstName,
  lastName: userSchema.fields.lastName,
  phoneNumber: userSchema.fields.phoneNumber,
  countryId: userSchema.fields.countryId,
});

export type ProfileFormValues = yup.InferType<typeof profileSchema>;
