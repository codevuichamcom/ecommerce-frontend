import { apiClient } from './client';
import { Payment } from '@/types/payment';

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const paymentService = {
    getPayment: (id: string) =>
        apiClient.get<Payment>(`${BASE_URL}/api/payments/${id}`),

    getPaymentByOrderId: (orderId: string) =>
        apiClient.get<Payment>(`${BASE_URL}/api/payments/order/${orderId}`),

    getPaymentsByCustomer: (customerId: string) =>
        apiClient.get<Payment[]>(`${BASE_URL}/api/payments?customerId=${customerId}`),
};
