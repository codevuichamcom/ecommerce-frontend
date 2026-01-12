import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/lib/api';
import { CreateProductCommand, UpdateProductCommand } from '@/types/product';

export const useProducts = (params?: Record<string, string | number>) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productService.getAllProducts(params),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => productService.getProduct(id),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (command: CreateProductCommand) => productService.createProduct(command),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, command }: { id: string; command: UpdateProductCommand }) =>
            productService.updateProduct(id, command),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['products', id] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
