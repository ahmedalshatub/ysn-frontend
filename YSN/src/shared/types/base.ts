export interface BaseDto {
  id: number;
  createdAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdBy: number | null;
  creator: string;
}

export interface BaseRequest {
  sortBy: string;
  isAscending: boolean;
  pageNumber?: number | null;
  pageSize?: number | null;
}

export interface BaseListResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
