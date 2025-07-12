import { httpClient } from './httpClient';
import { API_ENDPOINTS, API_CONFIG } from '../constants/api';
import type { 
  User, 
  CreateUserForm, 
  UpdateUserForm,
  UserFilters 
} from '../types';

// Type cho response từ API thực tế
interface ApiUserResponse {
  success: boolean;
  data: User[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errorCode: string | null;
  errorMessage: string | null;
}

interface ApiSingleUserResponse {
  success: boolean;
  data: User;
  errorCode: string | null;
  errorMessage: string | null;
}

export class UserService {
  // Get all users with pagination and filters
  static async getUsers(params?: UserFilters): Promise<User[]> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);

    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.LIST}?${queryParams.toString()}`;
    const response = await httpClient.get<ApiUserResponse>(url);
    
    // Kiểm tra response format
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.errorMessage || 'Failed to fetch users');
    }
  }

  // Get user by ID
  static async getUserById(id: number): Promise<User> {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.DETAIL(id)}`;
    const response = await httpClient.get<ApiSingleUserResponse>(url);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.errorMessage || `Failed to fetch user ${id}`);
    }
  }

  // Create new user
  static async createUser(userData: CreateUserForm): Promise<User> {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.CREATE}`;
    const response = await httpClient.post<ApiSingleUserResponse>(url, userData);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.errorMessage || 'Failed to create user');
    }
  }

  // Update user
  static async updateUser(id: number, userData: UpdateUserForm): Promise<User> {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.UPDATE(id)}`;
    const response = await httpClient.put<ApiSingleUserResponse>(url, userData);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.errorMessage || `Failed to update user ${id}`);
    }
  }

  // Delete user
  static async deleteUser(id: number): Promise<{ message: string }> {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.DELETE(id)}`;
    const response = await httpClient.delete<{ success: boolean; message: string }>(url);
    
    if (response.success) {
      return { message: response.message };
    } else {
      throw new Error('Failed to delete user');
    }
  }

  // Get user statistics
  static async getUserStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
  }> {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USERS.LIST}/stats`;
    const response = await httpClient.get<{
      success: boolean;
      data: {
        total: number;
        active: number;
        inactive: number;
        newThisMonth: number;
      };
    }>(url);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user stats');
    }
  }
}

// Legacy function for backward compatibility
export const fetchUsers = async (): Promise<User[]> => {
  try {
    return await UserService.getUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
