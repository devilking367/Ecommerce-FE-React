// Định nghĩa type ApiResponse dùng chung cho toàn bộ API
export interface ApiResponse<T> {
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
