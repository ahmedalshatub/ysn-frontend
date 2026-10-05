import type { BaseListResponse } from "../../../../shared/types/base";
import { CustomerApp, type CustomerAppValue } from "../../../customers/types/Customers.types";

export const registrationAppKeys: Record<CustomerAppValue, string> = {
  [CustomerApp.YanabeeSumer]: "customerApps.yanabeeSumer",
  [CustomerApp.YanabeeSumerCards]: "customerApps.yanabeeSumerCards",
};

export interface RegistrationsReportFilter {
  customerRoleId?: number;
  cityId?: number;
  registrationApp?: number;
  registeredFromApp?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface RegistrationsReportRequest extends RegistrationsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface RegistrationsReportRowDto {
  day: string;
  customerRoleId: number;
  cityId: number;
  cityName: string | null;
  registrationApp: number | null;
  registrationsCount: number;
}

export interface RegistrationsReportSummaryDto {
  registrationsCount: number;
  agentsCount: number;
  subAgentsCount: number;
  clientsCount: number;
  fromAppsCount: number;
  fromDashboardCount: number;
}

export interface RegistrationsReportDto {
  summary: RegistrationsReportSummaryDto;
  rows: BaseListResponse<RegistrationsReportRowDto>;
}
