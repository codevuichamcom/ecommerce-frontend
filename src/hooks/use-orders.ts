import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/lib/api';
import { CreateOrderCommand, OrderStatus } from '@/types/order';

export const useOrders = (customerId: string) => {
    return useQuery({
        queryKey: ['orders', { customerId }],
        queryFn: () => orderService.getOrdersByCustomer(customerId),
        enabled: !!customerId,
    });
};

export const useOrder = (id: string) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: () => orderService.getOrder(id),
        enabled: !!id,
        refetchInterval: (query) => {
            // Refetch if order is in a transitional state
            const status = query.state.data?.status;
            return status === OrderStatus.PENDING || status === OrderStatus.INVENTORY_RESERVED ? 2000 : false;
        },
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ command, idempotencyKey }: { command: CreateOrderCommand; idempotencyKey?: string }) =>
            orderService.createOrder(command, idempotencyKey),
        onSuccess: (_, { command }) => {
            queryClient.invalidateQueries({ queryKey: ['orders', { customerId: command.customerId }] });
        },
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
            orderService.cancelOrder(id, reason),
        onSuccess: (order) => {
            queryClient.invalidateQueries({ queryKey: ['orders', order.id] });
            queryClient.invalidateQueries({ queryKey: ['orders', { customerId: order.customerId }] });
        },
    });
};
