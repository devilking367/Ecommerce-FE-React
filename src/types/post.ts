import type { BaseEntity, FilterParams } from './base';

export interface Post extends BaseEntity {
  body: string;
  title: string;
  userId: number;
}

export interface CreatePostForm {
  body: string;
  title: string;
  userId: number;
}

export interface PostFilters extends FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  userId?: number;
} 