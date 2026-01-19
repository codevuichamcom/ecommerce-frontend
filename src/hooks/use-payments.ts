import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/lib/api/payments';

export const usePaymentByOrder = (orderId: string) => {
    return useQuery({
        queryKey: ['payments', { orderId }],
        queryFn: () => paymentService.getPaymentByOrderId(orderId),
        enabled: !!orderId,
    });
};

export const usePayments = (customerId: string) => {
    return useQuery({
        queryKey: ['payments', { customerId }],
        queryFn: () => paymentService.getPaymentsByCustomer(customerId),
        enabled: !!customerId,
    });
};
