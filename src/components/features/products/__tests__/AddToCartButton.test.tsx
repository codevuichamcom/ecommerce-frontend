import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddToCartButton } from '../AddToCartButton';
import { useCartStore } from '@/stores/cart-store';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

// Mock zustand
jest.mock('@/stores/cart-store', () => ({
    useCartStore: jest.fn(),
}));

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
    useToast: jest.fn(),
}));

jest.mock('lucide-react', () => ({
    ShoppingCart: () => <span>CartIcon</span>,
    Check: () => <span>CheckIcon</span>,
}));

describe('AddToCartButton', () => {
    const mockAddItem = jest.fn();
    const mockToast = jest.fn();

    const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        currency: 'USD',
        status: 'ACTIVE' as any,
        available: true,
        description: '',
        sku: '',
        createdAt: '',
        updatedAt: ''
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
            // Mock selector behavior if needed, or just return mockAddItem if it expects state access
            // In AddToCartButton: const addItem = useCartStore((state) => state.addItem)
            // simplified: we'll return a mock function if the component calls useCartStore(selector)
            // But hooks returning specific selectors need careful mocking.

            // If we assume default generic mock:
            return mockAddItem;
        });
        (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    });

    it('renders "Add to Cart" button', () => {
        render(<AddToCartButton product={mockProduct} />);
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    it('calls addItem and shows success state on click', async () => {
        render(<AddToCartButton product={mockProduct} quantity={2} />);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 2);
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: "Added to cart",
            variant: "success"
        }));

        await waitFor(() => expect(screen.getByText('Added')).toBeInTheDocument());
    });

    it('is disabled when disabled prop is true', () => {
        render(<AddToCartButton product={mockProduct} disabled />);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
