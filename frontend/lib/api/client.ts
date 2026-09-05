import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  statusCode: number;
  errors?: { field: string; message: string }[];

  constructor(message: string, statusCode: number, errors?: { field: string; message: string }[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { token, headers = {}, ...restOptions } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  // Attach token if explicitly provided or stored in client localStorage
  const storedToken =
    token !== undefined
      ? token
      : typeof window !== 'undefined'
      ? localStorage.getItem('flowmetrics_token')
      : null;

  if (storedToken) {
    customHeaders['Authorization'] = `Bearer ${storedToken}`;
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: customHeaders,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data?.errors);
    }

    return data as ApiResponse<T>;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error.message || 'Network error: could not connect to server',
      0
    );
  }
}
