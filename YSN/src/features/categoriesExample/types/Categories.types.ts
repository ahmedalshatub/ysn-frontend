import type { BaseDto, BaseRequest } from '../../../shared/types/base';

export interface CategoryFilter {
  name?: string;
  isDeleted?: boolean;
  createdBy?: number;
}

export interface CategoryRequest extends BaseRequest, CategoryFilter {}

export interface CategoryDto extends BaseDto {
  name: string;
  imageUrl?: string;
  imageType?: string;
}

export interface AddCategoryDto {
  name: string;
  image: File;
}

export interface UpdateCategoryDto {
  name: string;
  image?: File;
}
