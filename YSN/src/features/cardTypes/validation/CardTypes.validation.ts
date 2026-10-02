import * as yup from "yup";
import { isTvKind } from "../types/CardTypes.types";

const nullableNumber = () =>
  yup
    .number()
    .nullable()
    .default(null)
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value));

const translationSchema = yup.object({
  languageCode: yup.string().required(),
  name: yup
    .string()
    .trim()
    .required("errors.CardType.NameRequired")
    .min(2, "errors.CardType.NameInvalidLength")
    .max(255, "errors.CardType.NameInvalidLength"),
  description: yup.string().trim().nullable().default("").max(1000, "errors.CardType.DescriptionTooLong"),
});

export const cardTypeSchema = yup.object({
  cardCategoryId: yup
    .number()
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? 0 : value))
    .min(1, "errors.CardType.CategoryRequired")
    .required("errors.CardType.CategoryRequired"),
  kind: yup.number().required("errors.CardType.KindInvalid"),
  durationMonths: nullableNumber().test("duration", "errors.CardType.DurationRequired", function (value) {
    if (!isTvKind(Number(this.parent.kind))) return true;
    if (value === null || value === undefined) return false;
    return value >= 1 && value <= 120 ? true : this.createError({ message: "errors.CardType.DurationInvalid" });
  }),
  targetUserTypes: yup.array().of(yup.number().required()).min(1, "errors.CardType.TargetsRequired").required(),
  agentPrice: nullableNumber().test("agent-price", "errors.CardType.AgentPriceRequired", function (value) {
    const targets: number[] = this.parent.targetUserTypes ?? [];
    if (!targets.some((target) => target === 2 || target === 3)) return true;
    if (value === null || value === undefined) return false;
    return value > 0 ? true : this.createError({ message: "errors.CardType.PriceInvalid" });
  }),
  clientPrice: nullableNumber().test("client-price", "errors.CardType.ClientPriceRequired", function (value) {
    const targets: number[] = this.parent.targetUserTypes ?? [];
    if (!targets.includes(4)) return true;
    if (value === null || value === undefined) return false;
    return value > 0 ? true : this.createError({ message: "errors.CardType.PriceInvalid" });
  }),
  amount: nullableNumber().required("errors.CardType.AmountRequired").moreThan(0, "errors.CardType.AmountInvalid"),
  sortOrder: yup
    .number()
    .transform((value, original) => (original === "" || Number.isNaN(value) ? 0 : value))
    .min(0, "errors.CardType.SortOrderInvalid")
    .required(),
  isActive: yup.boolean().required(),
  translations: yup.array().of(translationSchema).length(2, "errors.CardType.TwoTranslationsAreRequired").required(),
});

export type CardTypeFormValues = yup.InferType<typeof cardTypeSchema>;
