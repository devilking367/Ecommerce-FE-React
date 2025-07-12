// ============================================================================
// PRODUCT DOMAIN TYPES
// ============================================================================

import type { BaseEntity, EntityStatus, FilterParams } from './base';
import type { Category } from './category';

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  category?: Category;
  images?: string[];
  stock: number;
  status: ProductStatus;
  sku?: string;
  weight?: number;
  dimensions?: ProductDimensions;
}

// Product status type
export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

// Product form types
export interface CreateProductForm {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  stock: number;
  sku?: string;
  weight?: number;
}

export interface UpdateProductForm {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  stock?: number;
  status?: ProductStatus;
  sku?: string;
  weight?: number;
}

// Product-specific filters
export interface ProductFilters extends FilterParams {
  categoryId?: number;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
} 