import { renderHook, waitFor } from '@testing-library/react';
import { useInventory } from '../use-inventory';
import { inventoryService } from '@/lib/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

jest.mock('@/lib/api', () => ({
    inventoryService: {
        getInventoryByProductId: jest.fn(),
    },
}));

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

describe('useInventory Hooks', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches inventory by product id', async () => {
        const mockInventory = { productId: 'prod-1', quantity: 50 };
        (inventoryService.getInventoryByProductId as jest.Mock).mockResolvedValue(mockInventory);

        const { result } = renderHook(() => useInventory('prod-1'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockInventory);
        expect(inventoryService.getInventoryByProductId).toHaveBeenCalledWith('prod-1');
    });

    it('does not fetch if product id is missing', () => {
        const { result } = renderHook(() => useInventory(''), {
            wrapper: createWrapper(),
        });

        expect(result.current.fetchStatus).toBe('idle');
        expect(inventoryService.getInventoryByProductId).not.toHaveBeenCalled();
    });
});
