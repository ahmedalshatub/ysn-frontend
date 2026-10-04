import { Permission, type PermissionCode } from "../../../shared/types/Permissions.types";

export const ReportCode = {
  AccountStatement: "AccountStatement",
  CustomerBalances: "CustomerBalances",
  DailyFinance: "DailyFinance",
  EPayments: "EPayments",
  SalesByCardType: "SalesByCardType",
  SalesByCustomer: "SalesByCustomer",
  SalesByCity: "SalesByCity",
  AgentPerformance: "AgentPerformance",
  Discounts: "Discounts",
  CardStock: "CardStock",
  Registrations: "Registrations",
  InvoiceDeletions: "InvoiceDeletions",
  TransactionReversals: "TransactionReversals",
  InactiveCustomers: "InactiveCustomers",
  CardsSold: "CardsSold",
  CardImports: "CardImports",
  SubAgentsByAgent: "SubAgentsByAgent",
  PriceList: "PriceList",
  Messages: "Messages",
} as const;

export type ReportCodeValue = typeof ReportCode[keyof typeof ReportCode];

export interface ReportConfig {
  code: ReportCodeValue;
  route: string;
  permission: PermissionCode;
  titleKey: string;
}

const config = (code: ReportCodeValue, route: string, permission: PermissionCode, titleKey: string): ReportConfig => ({
  code,
  route: `/reports/${route}`,
  permission,
  titleKey,
});

export const reportConfigs: Record<ReportCodeValue, ReportConfig> = {
  [ReportCode.AccountStatement]: config(ReportCode.AccountStatement, "account-statement", Permission.ReportsAccountStatement, "reports.accountStatement.title"),
  [ReportCode.CustomerBalances]: config(ReportCode.CustomerBalances, "customer-balances", Permission.ReportsCustomerBalances, "reports.customerBalances.title"),
  [ReportCode.DailyFinance]: config(ReportCode.DailyFinance, "daily-finance", Permission.ReportsDailyFinance, "reports.dailyFinance.title"),
  [ReportCode.EPayments]: config(ReportCode.EPayments, "e-payments", Permission.ReportsEPayments, "reports.ePayments.title"),
  [ReportCode.SalesByCardType]: config(ReportCode.SalesByCardType, "sales-by-card-type", Permission.ReportsSalesByCardType, "reports.salesByCardType.title"),
  [ReportCode.SalesByCustomer]: config(ReportCode.SalesByCustomer, "sales-by-customer", Permission.ReportsSalesByCustomer, "reports.salesByCustomer.title"),
  [ReportCode.SalesByCity]: config(ReportCode.SalesByCity, "sales-by-city", Permission.ReportsSalesByCity, "reports.salesByCity.title"),
  [ReportCode.AgentPerformance]: config(ReportCode.AgentPerformance, "agent-performance", Permission.ReportsAgentPerformance, "reports.agentPerformance.title"),
  [ReportCode.Discounts]: config(ReportCode.Discounts, "discounts", Permission.ReportsDiscounts, "reports.discounts.title"),
  [ReportCode.CardStock]: config(ReportCode.CardStock, "card-stock", Permission.ReportsCardStock, "reports.cardStock.title"),
  [ReportCode.Registrations]: config(ReportCode.Registrations, "registrations", Permission.ReportsRegistrations, "reports.registrations.title"),
  [ReportCode.InvoiceDeletions]: config(ReportCode.InvoiceDeletions, "invoice-deletions", Permission.ReportsInvoiceDeletions, "reports.invoiceDeletions.title"),
  [ReportCode.TransactionReversals]: config(ReportCode.TransactionReversals, "transaction-reversals", Permission.ReportsTransactionReversals, "reports.transactionReversals.title"),
  [ReportCode.InactiveCustomers]: config(ReportCode.InactiveCustomers, "inactive-customers", Permission.ReportsInactiveCustomers, "reports.inactiveCustomers.title"),
  [ReportCode.CardsSold]: config(ReportCode.CardsSold, "cards-sold", Permission.ReportsCardsSold, "reports.cardsSold.title"),
  [ReportCode.CardImports]: config(ReportCode.CardImports, "card-imports", Permission.ReportsCardImports, "reports.cardImports.title"),
  [ReportCode.SubAgentsByAgent]: config(ReportCode.SubAgentsByAgent, "sub-agents-by-agent", Permission.ReportsSubAgentsByAgent, "reports.subAgentsByAgent.title"),
  [ReportCode.PriceList]: config(ReportCode.PriceList, "price-list", Permission.ReportsPriceList, "reports.priceList.title"),
  [ReportCode.Messages]: config(ReportCode.Messages, "messages", Permission.ReportsMessages, "reports.messages.title"),
};

export const reportList: ReportCodeValue[] = Object.values(ReportCode);

export const customerReportList: ReportCodeValue[] = [
  ReportCode.AccountStatement,
  ReportCode.SalesByCardType,
  ReportCode.Discounts,
  ReportCode.CardsSold,
  ReportCode.InvoiceDeletions,
  ReportCode.TransactionReversals,
];

export const agentReportList: ReportCodeValue[] = [ReportCode.AgentPerformance, ReportCode.SubAgentsByAgent];
