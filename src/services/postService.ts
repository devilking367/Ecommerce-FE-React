import { httpClient } from './httpClient';
import { API_ENDPOINTS, API_CONFIG } from '../constants/api';
import type { Post, CreatePostForm, PostFilters } from '../types/post';

// Type cho response từ API thực tế
interface ApiPostResponse {
  success: boolean;
  data: Post[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errorCode: string | null;
  errorMessage: string | null;
}

interface ApiSinglePostResponse {
  success: boolean;
  data: Post;
  errorCode: string | null;
  errorMessage: string | null;
}

export class PostService {
    // Get all posts with pagination and filters
    static async getPosts(params?: PostFilters): Promise<Post[]> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.userId) queryParams.append('userId', params.userId.toString());

        const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS.LIST}?${queryParams.toString()}`;
        const response = await httpClient.get<ApiPostResponse>(url);
        
        // Kiểm tra response format
        if (response.success && response.data) {
            return response.data;
        } else {
            throw new Error(response.errorMessage || 'Failed to fetch posts');
        }
    }

    // Get post by ID
    static async getPostById(id: number): Promise<Post> {
        const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS.DETAIL(id)}`;
        const response = await httpClient.get<ApiSinglePostResponse>(url);
        
        if (response.success && response.data) {
            return response.data;
        } else {
            throw new Error(response.errorMessage || `Failed to fetch post ${id}`);
        }
    }

    // Create new post
    static async createPost(postData: CreatePostForm): Promise<Post> {
        const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS.CREATE}`;
        const response = await httpClient.post<ApiSinglePostResponse>(url, postData);
        
        if (response.success && response.data) {
            return response.data;
        } else {
            throw new Error(response.errorMessage || 'Failed to create post');
        }
    }

    // Update post
    static async updatePost(id: number, postData: any): Promise<Post> {
        const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS.UPDATE(id)}`;
        const response = await httpClient.put<ApiSinglePostResponse>(url, postData);
        
        if (response.success && response.data) {
            return response.data;
        } else {
            throw new Error(response.errorMessage || `Failed to update post ${id}`);
        }
    }

    // Delete post
    static async deletePost(id: number): Promise<{ message: string }> {
        const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS.DELETE(id)}`;
        const response = await httpClient.delete<{ success: boolean; message: string }>(url);
        
        if (response.success) {
            return { message: response.message };
        } else {
            throw new Error('Failed to delete post');
        }
    }
}