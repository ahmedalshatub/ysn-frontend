import * as yup from "yup";

export const balanceChangeSchema = (maxAmount?: number) =>
  yup.object({
    customerId: yup
      .number()
      .nullable()
      .default(null)
      .transform((value, original) => (original === "" || original === null || Number.isNaN(value) ? null : value))
      .required("errors.Transaction.CustomerRequired")
      .min(1, "errors.Transaction.CustomerRequired"),
    amount: yup
      .number()
      .transform((value, original) => (original === "" || Number.isNaN(value) ? undefined : value))
      .required("errors.Transaction.AmountRequired")
      .moreThan(0, "errors.Transaction.AmountInvalid")
      .test("max-balance", "errors.Transactions.InsufficientBalance", (value) =>
        maxAmount === undefined || value === undefined || value <= maxAmount
      ),
    description: yup
      .string()
      .trim()
      .max(500, "errors.Transaction.DescriptionInvalidLength")
      .default(""),
  });

export type BalanceChangeFormValues = yup.InferType<ReturnType<typeof balanceChangeSchema>>;
