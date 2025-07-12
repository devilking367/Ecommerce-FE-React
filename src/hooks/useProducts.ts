import { useState, useEffect, useRef } from 'react';
import { ProductService } from '../services/productService';
import type { Product } from '../types/product';

export function useProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  status?: Product['status'];
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(false);

  const fetchProducts = async () => {
    if (!mountedRef.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await ProductService.getProducts(params);
      if (mountedRef.current) {
        setProducts(data.data);
      }
    } catch (err) {
      if (mountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
        setError(errorMessage);
        console.error('Error fetching products:', err);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchProducts();
    
    return () => {
      mountedRef.current = false;
    };
  }, [params?.page, params?.limit, params?.search, params?.categoryId, params?.status, params?.sort, params?.order]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
} 