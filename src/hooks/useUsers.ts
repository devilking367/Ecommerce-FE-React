import { useState, useEffect, useRef } from 'react';
import { UserService } from '../services/userService';
import type { User, UserFilters } from '../types';

export function useUsers(filters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(false);

  const fetchUsers = async () => {
    if (!mountedRef.current) return; // Prevent calling if component unmounted
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await UserService.getUsers(filters);
      if (mountedRef.current) { // Check if still mounted before setting state
        setUsers(data);
      }
    } catch (err) {
      if (mountedRef.current) { // Check if still mounted before setting state
        const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
        setError(errorMessage);
        console.error('Error fetching users:', err);
      }
    } finally {
      if (mountedRef.current) { // Check if still mounted before setting state
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchUsers();
    
    return () => {
      mountedRef.current = false;
    };
  }, [filters?.page, filters?.limit, filters?.search, filters?.sort, filters?.order, filters?.role, filters?.status]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
} 