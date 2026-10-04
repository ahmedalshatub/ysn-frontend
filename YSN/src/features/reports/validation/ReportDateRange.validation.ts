import * as yup from "yup";

export const reportDateRangeSchema = yup.object({
  fromDate: yup.string().required("errors.Report.DateRangeRequired"),
  toDate: yup
    .string()
    .required("errors.Report.DateRangeRequired")
    .test("not-before-from", "errors.Report.DateRangeInvalid", function (value) {
      const { fromDate } = this.parent as { fromDate?: string };
      return !value || !fromDate || value >= fromDate;
    }),
});

export type ReportDateRangeValues = yup.InferType<typeof reportDateRangeSchema>;
