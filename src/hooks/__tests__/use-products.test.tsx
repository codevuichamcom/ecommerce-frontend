import { renderHook, waitFor } from '@testing-library/react';
import { useProducts, useProduct } from '../use-products';
import { productService } from '@/lib/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Mock the product service
jest.mock('@/lib/api', () => ({
    productService: {
        getAllProducts: jest.fn(),
        getProduct: jest.fn(),
        createProduct: jest.fn(),
        updateProduct: jest.fn(),
        deleteProduct: jest.fn()
    }
}));

// Setup QueryClient wrapper
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useProducts Hooks', () => {
    const mockProducts = [
        { id: '1', name: 'Product 1', price: 100 },
        { id: '2', name: 'Product 2', price: 200 }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('useProducts', () => {
        it('fetches and returns products', async () => {
            (productService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

            const { result } = renderHook(() => useProducts(), {
                wrapper: createWrapper(),
            });

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockProducts);
            expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
        });

        it('handles fetching error', async () => {
            const error = new Error('Failed to fetch');
            (productService.getAllProducts as jest.Mock).mockRejectedValue(error);

            const { result } = renderHook(() => useProducts(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.isError).toBe(true));

            expect(result.current.error).toBeDefined();
        });
    });

    describe('useProduct', () => {
        const mockProduct = { id: '1', name: 'Product 1', price: 100 };

        it('fetches a single product by id', async () => {
            (productService.getProduct as jest.Mock).mockResolvedValue(mockProduct);

            const { result } = renderHook(() => useProduct('1'), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockProduct);
            expect(productService.getProduct).toHaveBeenCalledWith('1');
        });

        it('does not fetch if id is missing', () => {
            const { result } = renderHook(() => useProduct(''), {
                wrapper: createWrapper(),
            });

            expect(result.current.isLoading).toBe(false); // Should be 'pending' but fetch doesn't start usually if enabled: false
            expect(productService.getProduct).not.toHaveBeenCalled();
            // With enabled: false, status is usually 'pending' and fetchStatus is 'idle'
            expect(result.current.fetchStatus).toBe('idle');
        });
    });
});
