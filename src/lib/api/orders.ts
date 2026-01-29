import { apiClient } from './client';
import { Order, CreateOrderCommand } from '@/types/order';

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const orderService = {
    createOrder: (command: CreateOrderCommand, idempotencyKey?: string) =>
        apiClient.post<Order>(`${BASE_URL}/api/orders`, command, {
            headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {},
        }),

    getOrder: (id: string) =>
        apiClient.get<Order>(`${BASE_URL}/api/orders/${id}`),

    getOrdersByCustomer: (customerId: string) =>
        apiClient.get<Order[]>(`${BASE_URL}/api/orders?customerId=${customerId}`),

    cancelOrder: (id: string, reason?: string) =>
        apiClient.post<Order>(`${BASE_URL}/api/orders/${id}/cancel${reason ? `?reason=${encodeURIComponent(reason)}` : ''}`),
};
