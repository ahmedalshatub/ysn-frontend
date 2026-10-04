import * as yup from "yup";
import { MessageTarget } from "../types/Messages.types";

const toNullableNumber = (value: number, original: unknown) =>
  original === "" || original === null || Number.isNaN(value) ? null : value;

const requiredFor = (targets: number[], message: string) =>
  yup
    .number()
    .nullable()
    .default(null)
    .transform(toNullableNumber)
    .test("required-for-target", message, function (value) {
      return !targets.includes(Number(this.parent.target)) || (value !== null && value !== undefined && value > 0);
    });

export const sendMessageSchema = yup.object({
  target: yup.number().required(),
  userId: requiredFor([MessageTarget.Customer], "errors.Message.CustomerRequired"),
  cityId: requiredFor([MessageTarget.City, MessageTarget.RoleInCity], "errors.Message.CityRequired"),
  roleId: requiredFor([MessageTarget.Role, MessageTarget.RoleInCity], "errors.Message.RoleInvalid"),
  subject: yup
    .string()
    .trim()
    .required("errors.Message.SubjectRequired")
    .min(2, "errors.Message.SubjectInvalidLength")
    .max(255, "errors.Message.SubjectInvalidLength"),
  content: yup.string().trim().required("errors.Message.ContentRequired").max(4000, "errors.Message.ContentTooLong"),
});

export type SendMessageFormValues = yup.InferType<typeof sendMessageSchema>;
