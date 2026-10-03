import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const CustomerType = {
  Agent: 2,
  SubAgent: 3,
  Client: 4,
} as const;

export type CustomerTypeValue = typeof CustomerType[keyof typeof CustomerType];

export const CustomerApp = {
  YanabeeSumer: 1,
  YanabeeSumerCards: 2,
} as const;

export type CustomerAppValue = typeof CustomerApp[keyof typeof CustomerApp];

export interface CustomerTypeConfig {
  type: CustomerTypeValue;
  module: "Agents" | "SubAgents" | "Clients";
  route: string;
  labelKey: string;
  pluralKey: string;
}

export const customerTypeConfigs: Record<CustomerTypeValue, CustomerTypeConfig> = {
  [CustomerType.Agent]: {
    type: CustomerType.Agent,
    module: "Agents",
    route: "/customers/agents",
    labelKey: "customerTypes.agent",
    pluralKey: "customerTypes.agents",
  },
  [CustomerType.SubAgent]: {
    type: CustomerType.SubAgent,
    module: "SubAgents",
    route: "/customers/sub-agents",
    labelKey: "customerTypes.subAgent",
    pluralKey: "customerTypes.subAgents",
  },
  [CustomerType.Client]: {
    type: CustomerType.Client,
    module: "Clients",
    route: "/customers/clients",
    labelKey: "customerTypes.client",
    pluralKey: "customerTypes.clients",
  },
};

export const customerTypeList: CustomerTypeValue[] = [CustomerType.Agent, CustomerType.SubAgent, CustomerType.Client];

export const isCustomerType = (value: number): value is CustomerTypeValue =>
  customerTypeList.includes(value as CustomerTypeValue);

export interface CustomerFilter {
  name?: string;
  phoneNumber?: string;
  countryId?: number;
  email?: string;
  userType?: number;
  cityId?: number;
  parentAgentId?: number;
  parentAgentIsActive?: boolean;
  registrationApp?: number;
  registeredFromApp?: boolean;
  isUnlimitedTvs?: boolean;
  maxTvCountFrom?: number;
  maxTvCountTo?: number;
  balanceFrom?: number;
  balanceTo?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
  lastLoginFrom?: string;
  lastLoginTo?: string;
}

export interface CustomerRequest extends BaseRequest, CustomerFilter {}

export interface CustomerListDto extends BaseDto {
  userType: CustomerTypeValue;
  userName: string;
  firstName: string;
  lastName: string;
  email: string | null;
  countryId: number | null;
  phoneCode: string | null;
  phoneNumber: string | null;
  cityId: number;
  cityName: string | null;
  parentAgentId: number | null;
  parentAgentName: string | null;
  parentAgentIsActive: boolean;
  subAgentsCount: number;
  maxTvCount: number | null;
  isUnlimitedTvs: boolean;
  balance: number;
  discountType: number;
  discountValue: number;
  cardTypeDiscountsCount: number;
  isActive: boolean;
  registrationApp: CustomerAppValue | null;
  lastLoginAt: string | null;
  profileImageId: string | null;
  profileImage: string | null;
}

export interface CustomerDto extends CustomerListDto {
  canViewAllCardCategories: boolean;
}

export interface AddCustomerDto {
  firstName: string;
  lastName: string;
  countryId: number;
  phoneNumber: string;
  email: string | null;
  cityId: number;
  parentAgentId: number | null;
  password: string;
  confirmPassword: string;
  isUnlimitedTvs: boolean | null;
  maxTvCount: number | null;
  isActive: boolean;
}

export interface UpdateCustomerDto {
  firstName: string;
  lastName: string;
  countryId: number;
  phoneNumber: string;
  email: string | null;
  cityId: number;
  userType?: CustomerTypeValue;
  parentAgentId?: number | null;
  isUnlimitedTvs?: boolean;
  maxTvCount?: number | null;
  discountType?: number;
  discountValue?: number;
}

export interface ChangeCustomerTypeDto {
  userType: CustomerTypeValue;
  parentAgentId: number | null;
}

export interface ChangeSubAgentAgentDto {
  parentAgentId: number;
  enableAccount: boolean;
}

export interface ChangeCustomerMaxTvsDto {
  isUnlimitedTvs: boolean;
  maxTvCount: number | null;
}

export interface SetCustomerPasswordDto {
  newPassword: string;
  confirmPassword: string;
}

export const customerFullName = (customer: Pick<CustomerListDto, "firstName" | "lastName">) =>
  [customer.firstName, customer.lastName].filter(Boolean).join(" ").trim();

export const customerPhone = (customer: Pick<CustomerListDto, "phoneCode" | "phoneNumber">) =>
  customer.phoneNumber ? `${customer.phoneCode ?? ""} ${customer.phoneNumber}`.trim() : "";
