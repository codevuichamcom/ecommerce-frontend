import { render, screen } from '@testing-library/react';
import ProductsPage from '../page';
import { useProducts } from '@/hooks/use-products';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('@/hooks/use-products');
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));
jest.mock('@/components/animations/AnimatedCard', () => ({
    AnimatedCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ProductsPage Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue(''),
        });
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
            push: jest.fn(),
        });
        (usePathname as jest.Mock).mockReturnValue('/products');
    });

    it('renders products correctly', () => {
        const mockProducts = [
            { id: '1', name: 'Product 1', price: 100, description: 'Desc 1', status: 'ACTIVE', sku: 'SKU1', currency: 'USD', available: true, createdAt: '', updatedAt: '' },
            { id: '2', name: 'Product 2', price: 200, description: 'Desc 2', status: 'ACTIVE', sku: 'SKU2', currency: 'USD', available: true, createdAt: '', updatedAt: '' },
        ];
        
        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
        });

        render(<ProductsPage />);

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Showing 2 products')).toBeInTheDocument();
    });

    it('shows empty state when no products found', () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });

        render(<ProductsPage />);

        expect(screen.getByText('Showing 0 products')).toBeInTheDocument();
    });
});
