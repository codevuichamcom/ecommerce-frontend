import { ApiResponse } from '@/types/api';

class ApiError extends Error {
    constructor(
        public code: string,
        message: string,
        public status: number,
        public details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const DEFAULT_TIMEOUT_MS = 15000;

async function request<T>(
    url: string,
    options: RequestInit & { timeout?: number } = {}
): Promise<T> {
    const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions.headers,
            },
            signal: controller.signal,
        });

        clearTimeout(id);

        if (response.status === 204) {
            return {} as T;
        }

        const result: ApiResponse<T> = await response.json();

        if (!response.ok || !result.success) {
            throw new ApiError(
                result.error?.code || 'UNKNOWN_ERROR',
                result.error?.message || 'An unexpected error occurred',
                response.status,
                result.error?.details
            );
        }

        return result.data;
    } catch (error) {
        clearTimeout(id);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError('TIMEOUT', `Request timed out after ${timeout}ms`, 408);
        }
        throw error;
    }
}

export const apiClient = {
    get: <T>(url: string, params?: Record<string, string | number>, options?: RequestInit) => {
        const query = params
            ? '?' + new URLSearchParams(params as Record<string, string>).toString()
            : '';
        return request<T>(`${url}${query}`, { ...options, method: 'GET' });
    },

    post: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T>(url: string, options?: RequestInit) =>
        request<T>(url, { ...options, method: 'DELETE' }),
};
