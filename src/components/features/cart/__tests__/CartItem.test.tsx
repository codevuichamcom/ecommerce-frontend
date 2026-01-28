import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from '../CartItem';
import { useCartStore } from '@/stores/cart-store';
import '@testing-library/jest-dom';

// Mock zustand store
jest.mock('@/stores/cart-store', () => ({
    useCartStore: jest.fn(),
}));

jest.mock('lucide-react', () => ({
    Minus: () => <span>-</span>,
    Plus: () => <span>+</span>,
    Trash2: () => <span>Trash</span>,
}));

describe('CartItem', () => {
    const mockUpdateQuantity = jest.fn();
    const mockRemoveItem = jest.fn();

    const mockItem = {
        productId: 'prod-1',
        product: {
            id: 'prod-1',
            name: 'Test Product',
            price: 100,
            currency: 'USD',
            description: '',
            sku: '',
            status: 'ACTIVE' as any,
            available: true,
            createdAt: '',
            updatedAt: ''
        },
        quantity: 2
    };

    beforeEach(() => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            updateQuantity: mockUpdateQuantity,
            removeItem: mockRemoveItem
        });
        jest.clearAllMocks();
    });

    it('renders item details correctly', () => {
        render(<CartItem item={mockItem} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$200.00')).toBeInTheDocument(); // 2 * 100
        expect(screen.getByText('$100.00 each')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // quantity display
    });

    it('calls updateQuantity when quantity buttons are clicked', () => {
        render(<CartItem item={mockItem} />);

        const decreaseBtn = screen.getByText('-');
        fireEvent.click(decreaseBtn);
        expect(mockUpdateQuantity).toHaveBeenCalledWith('prod-1', 1);

        const increaseBtn = screen.getByText('+');
        fireEvent.click(increaseBtn);
        expect(mockUpdateQuantity).toHaveBeenCalledWith('prod-1', 3);
    });

    it('calls removeItem when trash button is clicked', () => {
        render(<CartItem item={mockItem} />);

        const trashBtn = screen.getByText('Trash');
        fireEvent.click(trashBtn);
        expect(mockRemoveItem).toHaveBeenCalledWith('prod-1');
    });
});
