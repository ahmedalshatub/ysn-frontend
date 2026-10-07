import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  DiscountsReportDto,
  DiscountsReportFilter,
  DiscountsReportRequest,
} from "../types/DiscountsReport.types";

export const discountsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscountsReport: builder.query<DiscountsReportDto, DiscountsReportRequest>({
      query: (params) => ({
        url: "Reports/discounts",
        params,
      }),
    }),
    exportDiscountsReport: builder.mutation<null, DiscountsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/discounts/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("Discounts", params.format),
      }),
    }),
  }),
});

export const { useGetDiscountsReportQuery, useExportDiscountsReportMutation } = discountsReportApi;
