import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type {
  PaymentTransaction,
  PaymentTransactionRequest,
  CreatePaymentDto,
  CreatePaymentResponseDto,
} from "../types/Payments.types";

export const paymentApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<BaseListResponse<PaymentTransaction>, PaymentTransactionRequest>({
      query: (params) => ({
        url: "Payments",
        params,
      }),
    }),
    getPaymentById: builder.query<PaymentTransaction, number>({
      query: (id) => `Payments/${id}`,
    }),
    getPaymentsCount: builder.query<number, PaymentTransactionRequest | void>({
      query: (params) => ({
        url: "Payments/count",
        params: params ?? undefined,
      }),
    }),
    createPayment: builder.mutation<CreatePaymentResponseDto, CreatePaymentDto>({
      query: (body) => ({
        url: "Payments",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentsCountQuery,
  useCreatePaymentMutation,
} = paymentApi;
