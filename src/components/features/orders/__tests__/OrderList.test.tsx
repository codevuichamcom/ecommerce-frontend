import { render, screen } from '@testing-library/react';
import { OrderList } from '../OrderList';
import { OrderStatus } from '@/types/order';
import '@testing-library/jest-dom';

jest.mock('../OrderCard', () => ({
    OrderCard: ({ order }: { order: any }) => <div data-testid="order-card">{order.id}</div>
}));

describe('OrderList', () => {
    it('renders empty state when no orders', () => {
        render(<OrderList orders={[]} />);
        expect(screen.getByText('No orders found.')).toBeInTheDocument();
    });

    it('renders list of order cards', () => {
        const orders = [
            { id: '1', status: OrderStatus.CREATED } as any,
            { id: '2', status: OrderStatus.COMPLETED } as any
        ];

        render(<OrderList orders={orders} />);

        expect(screen.getAllByTestId('order-card')).toHaveLength(2);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
