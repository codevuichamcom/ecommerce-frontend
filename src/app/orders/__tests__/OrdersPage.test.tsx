import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import OrdersPage from '../page';
import { useOrders } from '@/hooks/use-orders';
import '@testing-library/jest-dom';

// Mocks
jest.mock('@/hooks/use-orders', () => ({
    useOrders: jest.fn(),
}));

jest.mock('@/lib/customer', () => ({
    customerUtils: {
        getCustomerId: jest.fn(),
        setCustomerId: jest.fn()
    }
}));

jest.mock('@/components/features/orders', () => ({
    OrderList: ({ orders }: { orders: any[] }) => <div data-testid="order-list">Orders: {orders.length}</div>,
    CustomerIdInput: ({ onSettled }: { onSettled: any }) => (
        <button data-testid="set-id" onClick={() => onSettled()}>Set ID</button>
    )
}));

import { customerUtils } from '@/lib/customer';

describe('OrdersPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useOrders as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            error: null,
            refetch: jest.fn()
        });
    });

    it('renders customer id input if not settled', () => {
        (customerUtils.getCustomerId as jest.Mock).mockReturnValue(null);

        render(<OrdersPage />);
        expect(screen.getByText('My Orders')).toBeInTheDocument();
        expect(screen.getByTestId('set-id')).toBeInTheDocument();
        expect(screen.queryByTestId('order-list')).not.toBeInTheDocument();
    });

    it('renders order list if id is settled', async () => {
        (customerUtils.getCustomerId as jest.Mock).mockReturnValue('cust-1');
        (useOrders as jest.Mock).mockReturnValue({
            data: [{ id: '1' }],
            isLoading: false,
            refetch: jest.fn()
        });

        // Initial render checks useEffect?
        // In page:
        // useEffect(() => { const id = getCustomerId(); setCustomerId(id); setIsIdSettled(!!id); }, [])
        // This runs on mount.

        render(<OrdersPage />);

        await waitFor(() => expect(screen.getByTestId('order-list')).toHaveTextContent('Orders: 1'));
    });

    it('handles customer id input settled', async () => {
        (customerUtils.getCustomerId as jest.Mock).mockReturnValue(null);
        render(<OrdersPage />);

        const btn = screen.getByTestId('set-id');

        // Simulating the callback that happens after successful ID input
        // The mock CustomerIdInput implementation calls onSettled
        // Note: The page implementation calls setCustomerId inside onSettled?
        // Page: onSettled={() => { const id = customerUtils.getCustomerId(); setCustomerId(id); setIsIdSettled(true); }}
        // So we need to mock getCustomerId to return value when we click?
        (customerUtils.getCustomerId as jest.Mock).mockReturnValue('new-cust');

        fireEvent.click(btn);

        await waitFor(() => expect(screen.getByText('Viewing history for')).toBeInTheDocument());
        expect(screen.getByText('new-cust')).toBeInTheDocument();
    });
});
