import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import '@testing-library/jest-dom';

jest.mock('../AddToCartButton', () => ({
    AddToCartButton: () => <button>AddToCartStub</button>
}));

jest.mock('@/components/animations/AnimatedCard', () => ({
    AnimatedCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Link if needed, usually simple usage works in test env if not accessing router context deeply.
// If error, will mock next/link.

describe('ProductCard', () => {
    const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 150,
        currency: 'USD',
        status: 'ACTIVE' as any,
        available: true,
        description: 'Test Description',
        sku: 'SKU1',
        createdAt: '',
        updatedAt: ''
    };

    it('renders product information', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('$150.00')).toBeInTheDocument();
        expect(screen.getByText('ACTIVE')).toBeInTheDocument();
        expect(screen.getByText('AddToCartStub')).toBeInTheDocument();
    });

    it('links to product detail page', () => {
        render(<ProductCard product={mockProduct} />);

        // Find links by role link
        const links = screen.getAllByRole('link');
        // Both image and title link to product page
        expect(links[0]).toHaveAttribute('href', '/products/1');
    });
});
