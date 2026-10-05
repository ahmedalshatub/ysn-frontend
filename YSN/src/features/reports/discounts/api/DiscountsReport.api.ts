import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportDiscountsReport: builder.mutation<null, DiscountsReportFilter>({
      query: (params) => ({
        url: "Reports/discounts/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Discounts"),
      }),
    }),
  }),
});

export const { useGetDiscountsReportQuery, useExportDiscountsReportMutation } = discountsReportApi;
