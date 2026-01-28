import { render, screen } from '@testing-library/react';
import { CartSummary } from '../CartSummary';
import { useCartStore } from '@/stores/cart-store';
import '@testing-library/jest-dom';

// Mock zustand store
jest.mock('@/stores/cart-store', () => ({
    useCartStore: jest.fn(),
}));

// Mock SheetClose since it is used in CartSummary
jest.mock('@/components/ui/sheet', () => ({
    SheetClose: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('CartSummary', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders null when cart is empty', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            totalItems: 0,
            totalAmount: 0
        });

        const { container } = render(<CartSummary />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders summary when there are items', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            totalItems: 2,
            totalAmount: 250
        });

        render(<CartSummary />);

        expect(screen.getByText('Subtotal')).toBeInTheDocument();
        // Use regular expression to match $250.00 to account for potentially diverse formatting but 'formatCurrency' is standard.
        // Assuming en-US USD.
        expect(screen.getAllByText('$250.00')).toHaveLength(2); // Subtotal and Total
        expect(screen.getByText('Free')).toBeInTheDocument();
        expect(screen.getByText('Checkout')).toBeInTheDocument();
        expect(screen.getByText('View Cart')).toBeInTheDocument();
    });
});
