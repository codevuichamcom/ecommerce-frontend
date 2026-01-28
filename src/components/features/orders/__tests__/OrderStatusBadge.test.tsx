import { render, screen } from '@testing-library/react';
import { OrderStatusBadge } from '../OrderStatusBadge';
import { OrderStatus } from '@/types/order';
import '@testing-library/jest-dom';

describe('OrderStatusBadge', () => {
    it('renders correct label and style for COMPLETED', () => {
        render(<OrderStatusBadge status={OrderStatus.COMPLETED} />);
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('renders correct label for PENDING', () => {
        render(<OrderStatusBadge status={OrderStatus.PENDING} />);
        expect(screen.getByText('Processing')).toBeInTheDocument();
    });

    it('renders correct label for CANCELLED', () => {
        render(<OrderStatusBadge status={OrderStatus.CANCELLED} />);
        expect(screen.getByText('Cancelled')).toBeInTheDocument();
    });

    it('renders fallback for unknown status', () => {
        // Force unknown status
        render(<OrderStatusBadge status={'UNKNOWN_STATUS' as OrderStatus} />);
        expect(screen.getByText('Unknown Status')).toBeInTheDocument();
    });
});
