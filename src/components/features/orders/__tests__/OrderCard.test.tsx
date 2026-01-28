import { render, screen } from '@testing-library/react';
import { OrderCard } from '../OrderCard';
import { OrderStatus } from '@/types/order';
import '@testing-library/jest-dom';

jest.mock('../OrderStatusBadge', () => ({
    OrderStatusBadge: ({ status }: { status: string }) => <div data-testid="status-badge">{status}</div>
}));

describe('OrderCard', () => {
    const mockOrder = {
        id: '12345678-abcd-efgh',
        customerId: 'cust-1',
        status: OrderStatus.COMPLETED,
        totalAmount: 100,
        currency: 'USD',
        totalItems: 2,
        items: [],
        createdAt: '2023-01-01T12:00:00Z',
        updatedAt: ''
    };

    it('renders order summary information', () => {
        render(<OrderCard order={mockOrder} />);

        expect(screen.getByText('#12345678...')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
        expect(screen.getByText('2 items')).toBeInTheDocument();
        expect(screen.getByTestId('status-badge')).toHaveTextContent(OrderStatus.COMPLETED);
    });

    it('links to order detail', () => {
        render(<OrderCard order={mockOrder} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/orders/12345678-abcd-efgh');
    });
});
