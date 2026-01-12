import { Product } from './product';

export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
}

export interface CartStore {
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}
