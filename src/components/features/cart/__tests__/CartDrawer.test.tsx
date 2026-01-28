import { render, screen } from '@testing-library/react';
import { CartDrawer } from '../CartDrawer';
import { useCartStore } from '@/stores/cart-store';
import '@testing-library/jest-dom';

// Mock zustand store
jest.mock('@/stores/cart-store', () => ({
    useCartStore: jest.fn(),
}));

// Mock child components
jest.mock('../CartItem', () => ({
    CartItem: () => <div data-testid="cart-item">CartItem</div>
}));
jest.mock('../CartSummary', () => ({
    CartSummary: () => <div data-testid="cart-summary">CartSummary</div>
}));
jest.mock('../CartEmptyState', () => ({
    CartEmptyState: () => <div data-testid="cart-empty-state">CartEmptyState</div>
}));

// Mock Sheet components
jest.mock('@/components/ui/sheet', () => ({
    Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SheetHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SheetTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SheetTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

jest.mock('@/components/ui/badge', () => ({
    Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}));

jest.mock('@/components/ui/scroll-area', () => ({
    ScrollArea: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('CartDrawer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders trigger with badge count when items exist', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [{ productId: '1' }],
            totalItems: 5
        });

        render(<CartDrawer />);

        expect(screen.getByText('5')).toBeInTheDocument(); // Badge
    });

    it('renders empty state when cart is empty', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [],
            totalItems: 0
        });

        render(<CartDrawer />);

        expect(screen.getByTestId('cart-empty-state')).toBeInTheDocument();
        expect(screen.queryByTestId('cart-summary')).not.toBeInTheDocument();
        expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    });

    it('renders items and summary when cart has items', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [{ productId: '1', product: {} }, { productId: '2', product: {} }],
            totalItems: 2
        });

        render(<CartDrawer />);

        expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
        expect(screen.getByTestId('cart-summary')).toBeInTheDocument();
        expect(screen.queryByTestId('cart-empty-state')).not.toBeInTheDocument();
    });
});
