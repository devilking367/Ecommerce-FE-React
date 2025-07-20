import type { ApiResponse } from '../constants/apiResponse';
import { httpClient } from './httpClient';
import { API_CONFIG } from '../constants/api';

// Simple mock auth service, replace with real API if needed
export async function login(email: string, password: string) {
  try {
    const url = `${API_CONFIG.BASE_URL}/api/login`;
    const response = await httpClient.post<ApiResponse<string>>(url, { email, password });

    if (response.success && response.data) {
      localStorage.setItem('token', response.data);
      return response.data;
    } else {
      throw new Error(response.errorMessage || 'Invalid credentials');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
}

export async function register({ email, password, name }: { email: string; password: string; name: string }) {
  try {
    const url = `${API_CONFIG.BASE_URL}/api/register`;
    const response = await httpClient.post<ApiResponse<string>>(url, { email, password, name });
    if (response.success) {
      return true;
    } else {
      throw new Error(response.errorMessage || 'Register failed');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Register failed');
  }
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
