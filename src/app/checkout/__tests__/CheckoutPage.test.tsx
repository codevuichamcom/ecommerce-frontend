import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CheckoutPage from '../page';
import { useCartStore } from '@/stores/cart-store';
import { useCreateOrder } from '@/hooks/use-orders';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mocks
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/stores/cart-store', () => ({
    useCartStore: jest.fn(),
}));

jest.mock('@/hooks/use-orders', () => ({
    useCreateOrder: jest.fn(),
}));

jest.mock('@/components/features/checkout', () => ({
    CheckoutLayout: ({ children, summary }: { children: React.ReactNode, summary: React.ReactNode }) => (
        <div data-testid="checkout-layout">
            <div data-testid="checkout-summary">{summary}</div>
            {children}
        </div>
    ),
    CheckoutSummary: () => <div>Summary Content</div>,
    CustomerInfoForm: ({ onSubmit }: { onSubmit: any }) => (
        <button data-testid="submit-order" onClick={() => onSubmit({ customerId: 'cust-1' })}>
            Place Order
        </button>
    )
}));

jest.mock('@/lib/utils', () => ({
    generateIdempotencyKey: () => 'mock-idempotency-key'
}));

describe('CheckoutPage', () => {
    const mockRouter = { push: jest.fn() };
    const mockClearCart = jest.fn();
    const mockMutateAsync = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [{ productId: '1', quantity: 1 }],
            totalItems: 1,
            clearCart: mockClearCart
        });

        (useCreateOrder as jest.Mock).mockReturnValue({
            mutateAsync: mockMutateAsync,
            isPending: false
        });

        // Mock setTimeout to run immediately if possible? 
        // No, with real timers, we just wait.

        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    it('renders hydration loading state initially', () => {
        render(<CheckoutPage />);
        expect(screen.getByText('Loading checkout...')).toBeInTheDocument();
    });

    it('renders checkout form after hydration', async () => {
        render(<CheckoutPage />);
        // Wait for hydration (100ms)
        await waitFor(() => expect(screen.getByTestId('checkout-layout')).toBeInTheDocument());
    });

    it('redirects to cart if empty', async () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [],
            totalItems: 0,
            clearCart: mockClearCart
        });

        render(<CheckoutPage />);
        // Wait for hydration then redirect
        await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/cart'));
    });

    it('handles successful order creation', async () => {
        const mockOrder = { id: 'order-123' };
        mockMutateAsync.mockResolvedValue(mockOrder);

        render(<CheckoutPage />);

        // Wait for form
        await waitFor(() => screen.getByTestId('submit-order'));
        const btn = screen.getByTestId('submit-order');

        fireEvent.click(btn);

        await waitFor(() => expect(mockMutateAsync).toHaveBeenCalledWith(expect.objectContaining({
            command: expect.objectContaining({ customerId: 'cust-1' })
        })));
        await waitFor(() => expect(mockClearCart).toHaveBeenCalled());
        await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/checkout/success?orderId=order-123'));
    });

    it('handles order creation failure', async () => {
        mockMutateAsync.mockRejectedValue(new Error('API Error'));

        render(<CheckoutPage />);

        await waitFor(() => screen.getByTestId('submit-order'));
        const btn = screen.getByTestId('submit-order');

        fireEvent.click(btn);

        await waitFor(() => expect(screen.getByText('API Error')).toBeInTheDocument());
        expect(mockClearCart).not.toHaveBeenCalled();
    });
});
