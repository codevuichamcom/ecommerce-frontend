import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, CartItem } from '@/types/cart';
import { Product } from '@/types/product';

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalAmount: 0,

            addItem: (product: Product, quantity = 1) => {
                const { items } = get();
                const existingItem = items.find((item) => item.productId === product.id);

                let newItems: CartItem[];
                if (existingItem) {
                    newItems = items.map((item) =>
                        item.productId === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    newItems = [...items, { productId: product.id, product, quantity }];
                }

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    totalAmount: newItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    ),
                });
            },

            removeItem: (productId: string) => {
                const { items } = get();
                const newItems = items.filter((item) => item.productId !== productId);

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    totalAmount: newItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    ),
                });
            },

            updateQuantity: (productId: string, quantity: number) => {
                const { items } = get();
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                const newItems = items.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                );

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    totalAmount: newItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    ),
                });
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalAmount: 0 });
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
