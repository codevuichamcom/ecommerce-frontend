import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: (failureCount, error: any) => {
                if (failureCount > 3) return false;
                // Don't retry on 4xx errors except 408 (Timeout) and 429 (Too Many Requests)
                if (error?.status >= 400 && error?.status < 500) {
                    return error?.status === 408 || error?.status === 429;
                }
                return true;
            },
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    },
});
