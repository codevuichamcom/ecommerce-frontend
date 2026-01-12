import { useQuery } from '@tanstack/react-query';
import { inventoryService } from '@/lib/api';

export const useInventory = (productId: string) => {
    return useQuery({
        queryKey: ['inventory', productId],
        queryFn: () => inventoryService.getInventoryByProductId(productId),
        enabled: !!productId,
    });
};
