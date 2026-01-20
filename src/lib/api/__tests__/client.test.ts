import { apiClient } from '../client';

// Mock global fetch
global.fetch = jest.fn();

describe('apiClient', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('performs a successful GET request', async () => {
        const mockData = { id: 1, name: 'Test Product' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ success: true, data: mockData }),
        });

        const result = await apiClient.get('/test');
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/test'),
            expect.objectContaining({ method: 'GET' })
        );
    });

    it('throws ApiError on failed response', async () => {
        const errorResponse = {
            success: false,
            error: { code: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => errorResponse,
        });

        await expect(apiClient.get('/products/999')).rejects.toThrow('Product not found');
    });

    it('handles network timeout', async () => {
        // Mock AbortError
        const abortError = new Error('The user aborted a request.');
        abortError.name = 'AbortError';

        (global.fetch as jest.Mock).mockRejectedValueOnce(abortError);

        await expect(apiClient.get('/timeout', {}, { timeout: 100 } as any)).rejects.toThrow('Request timed out');
    });
});
