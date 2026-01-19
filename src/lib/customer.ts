const CUSTOMER_ID_KEY = 'ecommerce_customer_id';

/**
 * Utility for managing customer ID in demo mode.
 * Stores and retrieves customer ID from localStorage.
 */
export const customerUtils = {
    /**
     * Get the current customer ID from localStorage.
     */
    getCustomerId: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(CUSTOMER_ID_KEY);
    },

    /**
     * Store the customer ID in localStorage.
     */
    setCustomerId: (id: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(CUSTOMER_ID_KEY, id);
    },

    /**
     * Remove the customer ID from localStorage.
     */
    clearCustomerId: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(CUSTOMER_ID_KEY);
    },
};
