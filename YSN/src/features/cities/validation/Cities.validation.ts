import * as yup from "yup";

export interface CityStoredSecrets {
  hasTvSmsPassword: boolean;
  hasTvSmsAuthKey: boolean;
  hasTvSmsPublicKey: boolean;
}

export const noStoredSecrets: CityStoredSecrets = {
  hasTvSmsPassword: false,
  hasTvSmsAuthKey: false,
  hasTvSmsPublicKey: false,
};

const isBase64 = (value?: string) => {
  const text = (value ?? "").replace(/\s/g, "");
  return text.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(text);
};

const translationSchema = yup.object({
  languageCode: yup.string().required("errors.City.LanguageRequired"),
  name: yup
    .string()
    .trim()
    .required("errors.City.NameRequired")
    .min(2, "errors.City.NameInvalidLength")
    .max(255, "errors.City.NameInvalidLength"),
});

const whenTvSmsApi = <T extends yup.Schema>(schema: T, rules: (current: T) => T) =>
  schema.when("hasTvSmsApi", { is: true, then: (current) => rules(current as T) });

const defaultValue = yup
  .number()
  .typeError("errors.City.TvSmsDefaultValueInvalid")
  .when("hasTvSmsApi", {
    is: true,
    then: (schema) =>
      schema
        .required("errors.City.TvSmsDefaultValueInvalid")
        .integer("errors.City.TvSmsDefaultValueInvalid")
        .min(1, "errors.City.TvSmsDefaultValueInvalid"),
  });

const secret = (isStored: boolean, requiredKey: string, max: number, tooLongKey: string) =>
  whenTvSmsApi(yup.string().trim(), (schema) => {
    const limited = schema.max(max, tooLongKey);
    return isStored ? limited : limited.required(requiredKey);
  });

export const citySchema = (storedSecrets: CityStoredSecrets) =>
  yup.object({
    sortOrder: yup
      .number()
      .typeError("errors.City.SortOrderInvalid")
      .required("errors.City.SortOrderInvalid")
      .min(1, "errors.City.SortOrderInvalid"),
    isActive: yup.boolean().required(),
    hasTvSmsApi: yup.boolean().required(),
    tvSmsBaseUrl: whenTvSmsApi(yup.string().trim(), (schema) =>
      schema
        .required("errors.City.TvSmsBaseUrlRequired")
        .max(500, "errors.City.TvSmsBaseUrlInvalid")
        .matches(/^https?:\/\/[^\s]+$/i, "errors.City.TvSmsBaseUrlInvalid")
    ),
    tvSmsUserId: whenTvSmsApi(yup.string().trim(), (schema) =>
      schema.required("errors.City.TvSmsUserIdRequired").max(100, "errors.City.TvSmsUserIdTooLong")
    ),
    tvSmsPassword: secret(storedSecrets.hasTvSmsPassword, "errors.City.TvSmsPasswordRequired", 200, "errors.City.TvSmsPasswordTooLong"),
    tvSmsAuthKey: secret(storedSecrets.hasTvSmsAuthKey, "errors.City.TvSmsAuthKeyRequired", 400, "errors.City.TvSmsAuthKeyTooLong"),
    tvSmsPublicKey: secret(
      storedSecrets.hasTvSmsPublicKey,
      "errors.City.TvSmsPublicKeyRequired",
      4000,
      "errors.City.TvSmsPublicKeyTooLong"
    ).test("base64", "errors.City.TvSmsPublicKeyInvalid", (value) => !value || isBase64(value)),
    tvSmsDefaultLanguage: defaultValue,
    tvSmsDefaultDepartmentId: defaultValue,
    tvSmsDefaultRegionId: defaultValue,
    tvSmsDefaultCustomerTypeId: defaultValue,
    translations: yup.array().of(translationSchema).length(2, "errors.City.TwoTranslationsAreRequired").required(),
  });

export type CityFormValues = yup.InferType<ReturnType<typeof citySchema>>;
