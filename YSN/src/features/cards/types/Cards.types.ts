import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const CardStatus = { Available: 1, Taken: 2, Disabled: 3 } as const;
export type CardStatusValue = typeof CardStatus[keyof typeof CardStatus];

export const CardSource = { Single: 1, Bulk: 2, SupplierApi: 3 } as const;
export type CardSourceValue = typeof CardSource[keyof typeof CardSource];

export const BulkCardAction = { ChangeCardType: 1, Disable: 2, Enable: 3, Delete: 4 } as const;
export type BulkCardActionValue = typeof BulkCardAction[keyof typeof BulkCardAction];

export const cardStatusKeys: Record<CardStatusValue, string> = {
  [CardStatus.Available]: "cardStatuses.available",
  [CardStatus.Taken]: "cardStatuses.taken",
  [CardStatus.Disabled]: "cardStatuses.disabled",
};

export const cardStatusVariants: Record<CardStatusValue, "success" | "info" | "warning"> = {
  [CardStatus.Available]: "success",
  [CardStatus.Taken]: "info",
  [CardStatus.Disabled]: "warning",
};

export const cardSourceKeys: Record<CardSourceValue, string> = {
  [CardSource.Single]: "cardSources.single",
  [CardSource.Bulk]: "cardSources.bulk",
  [CardSource.SupplierApi]: "cardSources.supplierApi",
};

export const bulkCardActionKeys: Record<BulkCardActionValue, string> = {
  [BulkCardAction.ChangeCardType]: "bulkCardActions.changeCardType",
  [BulkCardAction.Disable]: "bulkCardActions.disable",
  [BulkCardAction.Enable]: "bulkCardActions.enable",
  [BulkCardAction.Delete]: "bulkCardActions.delete",
};

export const bulkCardProblemKeys: Record<number, string> = {
  1: "bulkCardProblems.empty",
  2: "bulkCardProblems.tooLong",
  3: "bulkCardProblems.duplicateInList",
  4: "bulkCardProblems.alreadyExists",
};

export const bulkCardActionProblemKeys: Record<number, string> = {
  1: "bulkCardActionProblems.taken",
  2: "bulkCardActionProblems.deleted",
  3: "bulkCardActionProblems.unchanged",
  4: "bulkCardActionProblems.serialExistsInTarget",
  5: "bulkCardActionProblems.duplicateInSelection",
};

export interface CardFilter {
  serialNumber?: string;
  cardTypeId?: number;
  cardCategoryId?: number;
  cityId?: number;
  status?: number;
  takenBy?: number;
  source?: number;
  importBatchId?: string;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface CardRequest extends BaseRequest, CardFilter {}

export interface CardListDto extends BaseDto {
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryId: number;
  cardCategoryName: string | null;
  cityId: number;
  cityName: string | null;
  serialNumber: string;
  status: CardStatusValue;
  source: CardSourceValue;
  importBatchId: string | null;
  isTaken: boolean;
  takenBy: number | null;
  takenByName: string | null;
  takenByUserType: number | null;
  takenAt: string | null;
  isDisabled: boolean;
  disabledAt: string | null;
  disabledByName: string | null;
}

export type CardDto = CardListDto;

export interface CardStatsDto {
  totalCount: number;
  availableCount: number;
  takenCount: number;
  disabledCount: number;
  deletedCount: number;
}

export interface AddCardsDto {
  cardTypeId: number;
  serialNumbers: string[];
  addValidOnly: boolean;
}

export interface CardProblemDto {
  index?: number;
  cardId?: number;
  serialNumber: string;
  problem: number;
}

export interface AddCardsResultDto {
  saved: boolean;
  importBatchId: string | null;
  totalCount: number;
  validCount: number;
  invalidCount: number;
  addedCount: number;
  problems: CardProblemDto[];
}

export interface UpdateCardDto {
  cardTypeId?: number;
  serialNumber?: string;
  isDisabled?: boolean;
}

export interface CardsBulkActionDto {
  action: BulkCardActionValue;
  cardIds?: number[];
  filter?: CardFilter;
  targetCardTypeId?: number;
  applyValidOnly: boolean;
}

export interface CardsBulkActionResultDto {
  applied: boolean;
  totalCount: number;
  validCount: number;
  invalidCount: number;
  appliedCount: number;
  problems: CardProblemDto[];
}

export type CardSelection =
  | { mode: "ids"; ids: Set<string | number> }
  | { mode: "filter"; filter: CardFilter; count: number };
