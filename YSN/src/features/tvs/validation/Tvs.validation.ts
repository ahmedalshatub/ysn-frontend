import * as yup from "yup";
import { TV_NICKNAME_MAX_LENGTH, TV_NUMBER_PATTERN } from "../types/Tvs.types";
import {
  ActivateTvMode,
  TV_CARD_CODE_MAX_LENGTH,
  TV_CARD_CODE_MIN_LENGTH,
  TV_RESOLVE_NOTE_MAX_LENGTH,
  resolveTvActivationStatuses,
} from "../types/TvActivations.types";

const nickname = yup.string().trim().max(TV_NICKNAME_MAX_LENGTH, "errors.Tv.NicknameTooLong").default("");

export const addCustomerTvSchema = yup.object({
  userId: yup
    .number()
    .nullable()
    .default(null)
    .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value))
    .required("errors.Tv.CustomerRequired")
    .min(1, "errors.Tv.CustomerRequired"),
  tvNumber: yup
    .string()
    .trim()
    .required("errors.Tv.NumberRequired")
    .matches(TV_NUMBER_PATTERN, "errors.Tv.NumberInvalid"),
  nickname,
});

export type AddCustomerTvFormValues = yup.InferType<typeof addCustomerTvSchema>;

export const updateCustomerTvSchema = yup.object({
  nickname,
});

export type UpdateCustomerTvFormValues = yup.InferType<typeof updateCustomerTvSchema>;

export const activateTvSchema = yup.object({
  mode: yup.string().oneOf([ActivateTvMode.Card, ActivateTvMode.Code]).required(),
  cardId: yup
    .string()
    .default("")
    .when("mode", { is: ActivateTvMode.Card, then: (schema) => schema.required("errors.Tv.CardRequired") }),
  cardCode: yup
    .string()
    .trim()
    .default("")
    .when("mode", {
      is: ActivateTvMode.Code,
      then: (schema) =>
        schema
          .required("errors.Tv.CardRequired")
          .min(TV_CARD_CODE_MIN_LENGTH, "errors.Tv.CardCodeInvalid")
          .max(TV_CARD_CODE_MAX_LENGTH, "errors.Tv.CardCodeInvalid"),
    }),
  isRenewal: yup
    .string()
    .default("")
    .when("mode", { is: ActivateTvMode.Code, then: (schema) => schema.required("errors.Tv.RenewalRequired") }),
});

export type ActivateTvFormValues = yup.InferType<typeof activateTvSchema>;

export const resolveTvActivationSchema = yup.object({
  status: yup
    .string()
    .required("errors.Tv.ResolveStatusInvalid")
    .oneOf(resolveTvActivationStatuses.map(String), "errors.Tv.ResolveStatusInvalid"),
  note: yup.string().trim().max(TV_RESOLVE_NOTE_MAX_LENGTH, "errors.Tv.NoteTooLong").default(""),
});

export type ResolveTvActivationFormValues = yup.InferType<typeof resolveTvActivationSchema>;
