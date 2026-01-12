export interface ErrorDetail {
    code: string;
    message: string;
    details?: unknown;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: ErrorDetail | null;
    timestamp: string;
}

export interface PageResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}
