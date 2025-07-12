import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> & {
  execute: () => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Memoize the API call to prevent infinite loops
  const memoizedApiCall = useMemo(() => apiCall, []);

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await memoizedApiCall();
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      setState({ data: null, loading: false, error: errorMessage });
      options.onError?.(errorMessage);
    }
  }, [memoizedApiCall, options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook cho API calls với parameters
export function useApiWithParams<T, P>(
  apiCall: (params: P) => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> & {
  execute: (params: P) => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall(params);
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      setState({ data: null, loading: false, error: errorMessage });
      options.onError?.(errorMessage);
    }
  }, [apiCall, options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
} 