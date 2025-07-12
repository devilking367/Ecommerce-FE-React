// ============================================================================
// CATEGORY DOMAIN TYPES
// ============================================================================

import type { BaseEntity, EntityStatus, FilterParams } from './base';

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  parentId?: number;
  parent?: Category;
  children?: Category[];
  image?: string;
  status: EntityStatus;
}

// Category form types
export interface CreateCategoryForm {
  name: string;
  description?: string;
  parentId?: number;
  image?: string;
}

export interface UpdateCategoryForm {
  name?: string;
  description?: string;
  parentId?: number;
  status?: EntityStatus;
  image?: string;
}

// Category-specific filters
export interface CategoryFilters extends FilterParams {
  parentId?: number;
  status?: EntityStatus;
  hasChildren?: boolean;
} 