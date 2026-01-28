import { render, screen, waitFor } from '@testing-library/react';
import OrderIdPage from '../page';
import { useOrder } from '@/hooks/use-orders';
import '@testing-library/jest-dom';

// Mocks
jest.mock('@/hooks/use-orders', () => ({
    useOrder: jest.fn(),
}));

jest.mock('@/components/features/orders', () => ({
    OrderDetail: ({ order }: { order: any }) => <div data-testid="order-detail">Detail: {order.id}</div>
}));

// We don't need to mock 'react' use, we just wrap component in Suspense if needed, 
// but OrderIdPage calls 'use(params)' inside.
// JSDOM/React 18+ tests support 'use' if configured, but 'use' is experimental in some versions.
// However Next.js 15+ environment should handle it.
// If 'use' fails in Jest, we might need to await the promise before render or use Suspense.
// Let's try passing the promise.

describe('OrderDetailPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockParams = Promise.resolve({ id: 'order-1' });

    it('renders loading state', async () => {
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: true,
            data: null
        });

        render(<OrderIdPage params={mockParams} />);

        expect(screen.getByText('Fetching order details...')).toBeInTheDocument();
    });

    it('renders error state', async () => {
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            error: new Error('Failed'),
            data: null
        });

        // We need to wait for 'use(params)' to resolve? 
        // Rendering component with use(promise) usually suspends.
        // We might need Suspense wrapper in test.
        // Or waitFor?

        // render with Suspense fallback to catch suspension
        const { getByText } = render(
            <React.Suspense fallback="Loading params...">
                <OrderIdPage params={mockParams} />
            </React.Suspense>
        );

        await waitFor(() => expect(screen.getByText('Order Not Found')).toBeInTheDocument());
    });

    it('renders order detail', async () => {
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            data: { id: 'order-1' }
        });

        render(
            <React.Suspense fallback="Loading params...">
                <OrderIdPage params={mockParams} />
            </React.Suspense>
        );

        await waitFor(() => expect(screen.getByTestId('order-detail')).toHaveTextContent('Detail: order-1'));
    });
});

import React from 'react';
