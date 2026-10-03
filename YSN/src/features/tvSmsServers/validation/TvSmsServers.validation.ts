import * as yup from "yup";

const isBase64 = (value?: string) => {
  const text = (value ?? "").replace(/\s/g, "");
  return text.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(text);
};

const defaultValue = yup
  .number()
  .typeError("errors.TvSmsServer.DefaultValueInvalid")
  .required("errors.TvSmsServer.DefaultValueInvalid")
  .integer("errors.TvSmsServer.DefaultValueInvalid")
  .min(0, "errors.TvSmsServer.DefaultValueInvalid");

const secret = (isEdit: boolean, requiredKey: string, max: number, tooLongKey: string) => {
  const schema = yup.string().trim().max(max, tooLongKey);
  return isEdit ? schema.optional() : schema.required(requiredKey);
};

export const tvSmsServerSchema = (isEdit: boolean) =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required("errors.TvSmsServer.NameRequired")
      .min(2, "errors.TvSmsServer.NameInvalidLength")
      .max(100, "errors.TvSmsServer.NameInvalidLength"),
    baseUrl: yup
      .string()
      .trim()
      .required("errors.TvSmsServer.BaseUrlRequired")
      .max(500, "errors.TvSmsServer.BaseUrlInvalid")
      .matches(/^https:\/\/[^\s]+$/i, "errors.TvSmsServer.BaseUrlInvalid"),
    smsUserId: yup.string().trim().required("errors.TvSmsServer.SmsUserIdRequired").max(100, "errors.TvSmsServer.SmsUserIdTooLong"),
    password: secret(isEdit, "errors.TvSmsServer.PasswordRequired", 200, "errors.TvSmsServer.PasswordTooLong"),
    authKey: secret(isEdit, "errors.TvSmsServer.AuthKeyRequired", 400, "errors.TvSmsServer.AuthKeyTooLong"),
    publicKey: secret(isEdit, "errors.TvSmsServer.PublicKeyRequired", 4000, "errors.TvSmsServer.PublicKeyTooLong").test(
      "base64",
      "errors.TvSmsServer.PublicKeyInvalid",
      (value) => !value || isBase64(value)
    ),
    defaultLanguage: defaultValue,
    defaultDepartmentId: defaultValue,
    defaultRegionId: defaultValue,
    defaultCustomerTypeId: defaultValue,
    isActive: yup.boolean().required(),
  });

export type TvSmsServerFormValues = yup.InferType<ReturnType<typeof tvSmsServerSchema>>;
