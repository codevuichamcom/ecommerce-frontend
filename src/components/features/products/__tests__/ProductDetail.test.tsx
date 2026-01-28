import { render, screen } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import '@testing-library/jest-dom';

jest.mock('../ProductImage', () => ({
    ProductImage: () => <div data-testid="product-image">ProductImage</div>
}));
jest.mock('../ProductPrice', () => ({
    ProductPrice: () => <div data-testid="product-price">ProductPrice</div>
}));
jest.mock('../ProductAvailability', () => ({
    ProductAvailability: () => <div data-testid="product-availability">ProductAvailability</div>
}));
jest.mock('../AddToCartButton', () => ({
    AddToCartButton: () => <button data-testid="add-to-cart">AddToCart</button>
}));
jest.mock('../QuantitySelector', () => ({
    QuantitySelector: () => <div data-testid="quantity-selector">QuantitySelector</div>
}));

describe('ProductDetail', () => {
    const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 150,
        currency: 'USD',
        status: 'ACTIVE' as any,
        available: true,
        description: 'Detail Description',
        sku: 'SKU123',
        createdAt: '',
        updatedAt: ''
    };

    it('renders product details', () => {
        render(<ProductDetail product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Detail Description')).toBeInTheDocument();
        expect(screen.getByText('SKU: SKU123')).toBeInTheDocument();

        expect(screen.getByTestId('product-image')).toBeInTheDocument();
        expect(screen.getByTestId('product-price')).toBeInTheDocument();
        expect(screen.getByTestId('product-availability')).toBeInTheDocument();
        expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
        expect(screen.getByTestId('quantity-selector')).toBeInTheDocument();
    });

    it('shows unavailable message when product is not available', () => {
        const unavailableProduct = { ...mockProduct, available: false };
        render(<ProductDetail product={unavailableProduct} />);

        expect(screen.getByText('This product is currently unavailable for purchase.')).toBeInTheDocument();
        expect(screen.queryByTestId('add-to-cart')).not.toBeInTheDocument();
    });
});
