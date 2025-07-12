// ============================================================================
// USER DOMAIN TYPES
// ============================================================================

import type { BaseEntity, EntityStatus, UserRole, Address, FilterParams } from './base';

export interface Company {
  name: string;
  position: string;
}

export interface UserAddress {
  street: string;
  city: string;
  zipcode: string;
}

export interface User extends BaseEntity {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  address?: UserAddress;
  company?: Company;
  // Admin panel specific fields
  role?: UserRole;
  status?: EntityStatus;
  avatar?: string;
}

// User form types
export interface CreateUserForm {
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  role?: UserRole;
  password?: string;
  address?: UserAddress;
  company?: Company;
}

export interface UpdateUserForm {
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  website?: string;
  role?: UserRole;
  status?: EntityStatus;
  address?: UserAddress;
  company?: Company;
}

// User-specific filters
export interface UserFilters extends FilterParams {
  role?: UserRole;
  status?: EntityStatus;
} 