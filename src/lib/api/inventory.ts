import { apiClient } from './client';
import { Inventory } from '@/types/inventory';

const BASE_URL = process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL;

export const inventoryService = {
    getInventoryByProductId: (productId: string) =>
        apiClient.get<Inventory>(`${BASE_URL}/api/inventory/product/${productId}`),

    addStock: (productId: string, quantity: number) =>
        apiClient.post<Inventory>(`${BASE_URL}/api/inventory/product/${productId}/add?quantity=${quantity}`),
};
