import { httpClient } from './httpClient';
import { API_ENDPOINTS } from '../constants/api';
import type { Product, ApiListResponse, ApiDetailResponse, CreateProductForm, UpdateProductForm } from '../types/entities';

export class ProductService {
  // Get all products with pagination and filters
  static async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    status?: Product['status'];
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<ApiListResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);

    const url = `${API_ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`;
    return httpClient.get<ApiListResponse<Product>>(url);
  }

  // Get product by ID
  static async getProductById(id: number): Promise<ApiDetailResponse<Product>> {
    const url = API_ENDPOINTS.PRODUCTS.DETAIL(id);
    return httpClient.get<ApiDetailResponse<Product>>(url);
  }

  // Create new product
  static async createProduct(productData: CreateProductForm): Promise<ApiDetailResponse<Product>> {
    const url = API_ENDPOINTS.PRODUCTS.CREATE;
    return httpClient.post<ApiDetailResponse<Product>>(url, productData);
  }

  // Update product
  static async updateProduct(id: number, productData: UpdateProductForm): Promise<ApiDetailResponse<Product>> {
    const url = API_ENDPOINTS.PRODUCTS.UPDATE(id);
    return httpClient.put<ApiDetailResponse<Product>>(url, productData);
  }

  // Delete product
  static async deleteProduct(id: number): Promise<{ message: string }> {
    const url = API_ENDPOINTS.PRODUCTS.DELETE(id);
    return httpClient.delete<{ message: string }>(url);
  }

  // Get product statistics
  static async getProductStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    outOfStock: number;
    totalValue: number;
  }> {
    const url = `${API_ENDPOINTS.PRODUCTS.LIST}/stats`;
    return httpClient.get(url);
  }

  // Upload product images
  static async uploadProductImages(productId: number, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const url = `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/images`;
    return httpClient.post<{ images: string[] }>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Update product stock
  static async updateProductStock(productId: number, stock: number): Promise<ApiDetailResponse<Product>> {
    const url = `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/stock`;
    return httpClient.patch<ApiDetailResponse<Product>>(url, { stock });
  }
} 