import { useState, useCallback, useMemo } from 'react';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

interface ApiValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
  input: unknown;
  ctx?: Record<string, unknown>;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, unknown> | { detail: ApiValidationError[] };
  detail?: ApiValidationError[];
}

interface UseApiReturn<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, options?: ApiOptions) => Promise<ApiResponse<T>>;
  reset: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export function useApi<T = unknown>(): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (url: string, options: ApiOptions = {}): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);

      const {
        method = 'GET',
        headers = { 'Content-Type': 'application/json' },
        body
      } = options;

      const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
      
      const config: RequestInit = {
        method,
        headers,
      };

      if (body && method !== 'GET') {
        config.body = typeof body === 'string' ? body : JSON.stringify(body);
      }

      const response = await fetch(fullUrl, config);
      const result = await response.json();

      if (!response.ok) {
        const apiResponse: ApiResponse<T> = {
          success: false,
          message: result.message || `HTTP error! status: ${response.status}`,
          errors: result.errors || result.detail || result,
        };
        return apiResponse;
      }

      setData(result.data || result);
      return {
        success: true,
        data: result.data || result,
        message: result.message,
      };

    } catch (err) {
      console.error("API request failed:", err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return useMemo(() => ({
    data,
    loading,
    error,
    execute,
    reset,
  }), [data, loading, error, execute, reset]);
}


