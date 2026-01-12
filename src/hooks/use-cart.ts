import { useCartStore } from '@/stores/cart-store';

export const useCart = () => {
    const cart = useCartStore();

    return {
        items: cart.items,
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        addItem: cart.addItem,
        removeItem: cart.removeItem,
        updateQuantity: cart.updateQuantity,
        clearCart: cart.clearCart,
    };
};
