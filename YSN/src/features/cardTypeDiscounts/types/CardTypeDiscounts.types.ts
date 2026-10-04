import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { CustomerFilter } from "../../customers/types/Customers.types";

export const DiscountType = { None: 0, Percent: 1, Fixed: 2 } as const;
export type DiscountTypeValue = typeof DiscountType[keyof typeof DiscountType];

export const discountTypeKeys: Record<DiscountTypeValue, string> = {
  [DiscountType.None]: "discountTypes.none",
  [DiscountType.Percent]: "discountTypes.percent",
  [DiscountType.Fixed]: "discountTypes.fixed",
};

export const discountText = (type: number, value: number, format: (amount: number) => string) =>
  type === DiscountType.Percent ? `${value}%` : type === DiscountType.Fixed ? format(value) : "-";

export interface CardTypeDiscountFilter {
  userId?: number;
  customerName?: string;
  customerPhone?: string;
  customerRoleId?: number;
  cityId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  discountType?: number;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface CardTypeDiscountRequest extends BaseRequest, CardTypeDiscountFilter {}

export interface CardTypeDiscountListDto extends BaseDto {
  userId: number;
  customerName: string | null;
  customerRoleId: number;
  customerPhone: string | null;
  customerCityName: string | null;
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryName: string | null;
  discountType: DiscountTypeValue;
  discountValue: number;
  agentPrice: number | null;
  clientPrice: number | null;
  priceAfterDiscount: number | null;
  deletedByName: string | null;
}

export interface AddCardTypeDiscountsDto {
  cardTypeIds: number[];
  userIds?: number[];
  customerFilter?: CustomerFilter & { customersOnly?: boolean };
  discountType: DiscountTypeValue;
  discountValue: number;
}

export interface CardTypeDiscountsResultDto {
  customersCount: number;
  cardTypesCount: number;
  addedCount: number;
  replacedCount: number;
}

export interface DeleteCardTypeDiscountsDto {
  ids?: number[];
  filter?: CardTypeDiscountFilter;
}
