import * as yup from "yup";
import { reportDateRangeSchema } from "./ReportDateRange.validation";

export const accountStatementReportSchema = reportDateRangeSchema.shape({
  customerId: yup.number().required("errors.Report.CustomerRequired"),
});

export type AccountStatementReportValues = yup.InferType<typeof accountStatementReportSchema>;
