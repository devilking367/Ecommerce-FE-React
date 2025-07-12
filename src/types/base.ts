// ============================================================================
// BASE TYPES & COMMON INTERFACES
// ============================================================================

export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TimestampedEntity extends BaseEntity {
  createdAt: string;
  updatedAt: string;
}

// Common status types
export type EntityStatus = 'active' | 'inactive';
export type UserRole = 'admin' | 'user' | 'moderator';

// Common address structure
export interface GeoLocation {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

// Shipping/Billing address for orders
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiDetailResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// ============================================================================
// PAGINATION & FILTERING
// ============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchParams {
  search?: string;
}

export interface FilterParams extends PaginationParams, SortParams, SearchParams {} 