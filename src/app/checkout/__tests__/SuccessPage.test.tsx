import { render, screen } from '@testing-library/react';
import CheckoutSuccessPage from '../success/page';
import { useOrder } from '@/hooks/use-orders';
import { useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom';

// Mocks
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

jest.mock('@/hooks/use-orders', () => ({
    useOrder: jest.fn(),
}));

jest.mock('@/components/features/checkout', () => ({
    OrderConfirmation: ({ order }: { order: any }) => <div data-testid="order-confirmation">Order: {order.id}</div>,
    OrderSuccessSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

// Mock Suspense since we are testing the component which uses Suspense?
// Actually we are testing the page which HAS Suspense. Testing library handles Suspense if we verify content.
// But we might need to await.
// Alternatively, we can test CheckoutSuccessContent if exported, but default export is the Page.

describe('CheckoutSuccessPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders skeleton when loading', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue('123')
        });
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: true,
            data: null
        });

        render(<CheckoutSuccessPage />);
        // useOrder loading -> CheckoutSuccessContent returns OrderSuccessSkeleton, 
        // OR the Suspense fallback shows it.
        // If we are inside Suspense, the component renders. 
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('renders no order found when no id provided', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue(null) // No orderId
        });
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            data: null
        });

        render(<CheckoutSuccessPage />);
        expect(screen.getByText('No Order Found')).toBeInTheDocument();
        expect(screen.getByText('Browse Products')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue('123')
        });
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            error: new Error('Failed'),
            data: null
        });

        render(<CheckoutSuccessPage />);
        expect(screen.getByText('Order Not Found')).toBeInTheDocument(); // Default error message logic
    });

    it('renders network error state', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue('123')
        });
        const networkError = new Error('Network error');
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            error: networkError,
            data: null
        });

        render(<CheckoutSuccessPage />);
        expect(screen.getByText('Connection Error')).toBeInTheDocument();
    });

    it('renders order confirmation when success', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue('123')
        });
        (useOrder as jest.Mock).mockReturnValue({
            isLoading: false,
            data: { id: '123' }
        });

        render(<CheckoutSuccessPage />);
        expect(screen.getByTestId('order-confirmation')).toHaveTextContent('Order: 123');
    });
});
