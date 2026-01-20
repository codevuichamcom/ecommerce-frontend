import { useCartStore } from '../cart-store';

describe('cart-store', () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    });

    const mockProduct = {
        id: 'prod-1',
        name: 'Test Product',
        description: 'Test Description',
        sku: 'TEST-SKU',
        price: 100,
        currency: 'USD',
        status: 'ACTIVE' as any,
        available: true,
        createdAt: '',
        updatedAt: ''
    };

    it('starts with an empty cart', () => {
        const state = useCartStore.getState();
        expect(state.items).toEqual([]);
        expect(state.totalItems).toBe(0);
        expect(state.totalAmount).toBe(0);
    });

    it('adds an item to the cart', () => {
        useCartStore.getState().addItem(mockProduct, 2);
        const state = useCartStore.getState();

        expect(state.items).toHaveLength(1);
        expect(state.items[0].productId).toBe('prod-1');
        expect(state.items[0].quantity).toBe(2);
        expect(state.totalItems).toBe(2);
        expect(state.totalAmount).toBe(200);
    });

    it('increments quantity when adding same product', () => {
        useCartStore.getState().addItem(mockProduct, 1);
        useCartStore.getState().addItem(mockProduct, 2);
        const state = useCartStore.getState();

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(3);
        expect(state.totalAmount).toBe(300);
    });

    it('removes an item from the cart', () => {
        useCartStore.getState().addItem(mockProduct, 1);
        useCartStore.getState().removeItem('prod-1');
        const state = useCartStore.getState();

        expect(state.items).toHaveLength(0);
        expect(state.totalItems).toBe(0);
        expect(state.totalAmount).toBe(0);
    });

    it('updates item quantity', () => {
        useCartStore.getState().addItem(mockProduct, 1);
        useCartStore.getState().updateQuantity('prod-1', 5);
        const state = useCartStore.getState();

        expect(state.items[0].quantity).toBe(5);
        expect(state.totalAmount).toBe(500);
    });

    it('clears the cart', () => {
        useCartStore.getState().addItem(mockProduct, 1);
        useCartStore.getState().clearCart();
        const state = useCartStore.getState();

        expect(state.items).toHaveLength(0);
        expect(state.totalItems).toBe(0);
    });
});
