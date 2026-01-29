import { apiClient } from './client';
import { Product, CreateProductCommand, UpdateProductCommand } from '@/types/product';

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const productService = {
    getAllProducts: (params?: Record<string, string | number>) =>
        apiClient.get<Product[]>(`${BASE_URL}/api/products`, params),

    getProduct: (id: string) =>
        apiClient.get<Product>(`${BASE_URL}/api/products/${id}`),

    createProduct: (command: CreateProductCommand) =>
        apiClient.post<Product>(`${BASE_URL}/api/products`, command),

    updateProduct: (id: string, command: UpdateProductCommand) =>
        apiClient.put<Product>(`${BASE_URL}/api/products/${id}`, command),

    deleteProduct: (id: string) =>
        apiClient.delete<void>(`${BASE_URL}/api/products/${id}`),
};
