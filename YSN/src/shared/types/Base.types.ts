// Re-export the template's base types under the names feature code uses, so a
// feature written against the RAS dashboard conventions compiles here unchanged.
//
// This file only adds aliases. `BaseDto` keeps the template's numeric `id` - a
// project on a GUID backend edits ./base.ts, not this file.
export type { BaseDto, BaseRequest, BaseListResponse } from "./base";

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type PaginatedResponse<T> = PaginatedList<T>;

// Every list request filter extends this: `sortBy`/`isAscending` drive the
// DataTable's server-side sort, and pagination is omitted entirely when the
// same endpoint feeds a dropdown.
export interface BaseListRequest {
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number | null;
  pageSize?: number | null;
}

export interface CreatorDto {
  id: number;
  userName?: string;
}
