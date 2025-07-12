export const API_CONFIG = {
  //BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

const PREFIX = '/api';

export const API_ENDPOINTS = {
  // User endpoints
  USERS: {
    LIST: `${PREFIX}/users`,
    DETAIL: (id: string | number) => `${PREFIX}/users/${id}`,
    CREATE: `${PREFIX}/users`,
    UPDATE: (id: string | number) => `${PREFIX}/users/${id}`,
    DELETE: (id: string | number) => `${PREFIX}/users/${id}`,
  },

  // Product endpoints
  PRODUCTS: {
    LIST: `${PREFIX}/products`,
    DETAIL: (id: string | number) => `${PREFIX}/products/${id}`,
    CREATE: `${PREFIX}/products`,
    UPDATE: (id: string | number) => `${PREFIX}/products/${id}`,
    DELETE: (id: string | number) => `${PREFIX}/products/${id}`,
  },

  // Category endpoints
  CATEGORIES: {
    LIST: `${PREFIX}/categories`,
    DETAIL: (id: string | number) => `${PREFIX}/categories/${id}`,
    CREATE: `${PREFIX}/categories`,
    UPDATE: (id: string | number) => `${PREFIX}/categories/${id}`,
    DELETE: (id: string | number) => `${PREFIX}/categories/${id}`,
  },

  // Order endpoints
  ORDERS: {
    LIST: `${PREFIX}/orders`,
    DETAIL: (id: string | number) => `${PREFIX}/orders/${id}`,
    CREATE: `${PREFIX}/orders`,
    UPDATE: (id: string | number) => `${PREFIX}/orders/${id}`,
    DELETE: (id: string | number) => `${PREFIX}/orders/${id}`,
  },

  // Post endpoints
  POSTS: {
    LIST: `${PREFIX}/posts`,
    DETAIL: (id: string | number) => `${PREFIX}/posts/${id}`,
    CREATE: `${PREFIX}/posts`,
    UPDATE: (id: string | number) => `${PREFIX}/posts/${id}`,
    DELETE: (id: string | number) => `${PREFIX}/posts/${id}`,
  },
} as const;

// Type cho API response dựa trên response thực tế
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errorCode: string | null;
  errorMessage: string | null;
}

// Type cho pagination
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 