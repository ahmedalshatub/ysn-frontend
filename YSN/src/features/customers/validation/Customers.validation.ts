import * as yup from "yup";

const optionalNumber = () =>
  yup
    .number()
    .nullable()
    .default(null)
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value));

const requiredId = (message: string) =>
  yup
    .number()
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? 0 : value))
    .min(1, message)
    .required(message);

const nameField = (field: "FirstName" | "LastName") =>
  yup
    .string()
    .trim()
    .required(`errors.Customer.${field}Required`)
    .min(2, `errors.Customer.${field}InvalidLength`)
    .max(100, `errors.Customer.${field}InvalidLength`);

export const passwordField = () =>
  yup
    .string()
    .required("errors.Customer.PasswordRequired")
    .min(6, "errors.Customer.PasswordWeak")
    .matches(/[A-Z]/, "errors.Customer.PasswordWeak")
    .matches(/[a-z]/, "errors.Customer.PasswordWeak")
    .matches(/[0-9]/, "errors.Customer.PasswordWeak")
    .matches(/[^A-Za-z0-9]/, "errors.Customer.PasswordWeak");

const confirmField = (reference: string) =>
  yup
    .string()
    .required("errors.Customer.PasswordsDoNotMatch")
    .oneOf([yup.ref(reference)], "errors.Customer.PasswordsDoNotMatch");

const maxTvCountField = () =>
  optionalNumber()
    .min(1, "errors.Customer.MaxTvCountInvalid")
    .when("isUnlimitedTvs", {
      is: false,
      then: (schema) => schema.required("errors.Customer.MaxTvCountRequired"),
    });

export const customerSchema = (isEdit: boolean) =>
  yup.object({
    userType: yup.number().required(),
    firstName: nameField("FirstName"),
    lastName: nameField("LastName"),
    countryId: requiredId("errors.Customer.CountryRequired"),
    phoneNumber: yup
      .string()
      .trim()
      .required("errors.Customer.PhoneNumberRequired")
      .matches(/^\+?[0-9 ]{4,20}$/, "errors.Customer.PhoneNumberInvalid"),
    email: yup.string().trim().default("").email("errors.Customer.EmailInvalid").max(255, "errors.Customer.EmailInvalid"),
    cityId: requiredId("errors.Customer.CityRequired"),
    parentAgentId: optionalNumber().when("userType", {
      is: 3,
      then: (schema) => schema.required("errors.Customer.ParentAgentRequired").min(1, "errors.Customer.ParentAgentRequired"),
    }),
    password: isEdit ? yup.string().default("") : passwordField(),
    confirmPassword: isEdit ? yup.string().default("") : confirmField("password"),
    isUnlimitedTvs: yup.boolean().required(),
    maxTvCount: maxTvCountField(),
    isActive: yup.boolean().required(),
  });

export type CustomerFormValues = yup.InferType<ReturnType<typeof customerSchema>>;

export const setPasswordSchema = yup.object({
  newPassword: passwordField(),
  confirmPassword: confirmField("newPassword"),
});

export type SetPasswordFormValues = yup.InferType<typeof setPasswordSchema>;

